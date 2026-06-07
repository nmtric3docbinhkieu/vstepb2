import { SPEAKING_EVALUATOR_SYSTEM_PROMPT } from "@/prompts/speaking-evaluator";
import { generateChatCompletion } from "@/services/ai/openai";
import type { SpeakingEvaluationResult } from "@/types/speaking";

type EvaluateSpeakingInput = {
  question: string;
  transcript: string;
  durationSeconds: number;
};

function clampScore(value: number): number {
  return Math.max(0, Math.min(10, Number(value.toFixed(1))));
}

function fallbackEvaluation(input: EvaluateSpeakingInput): SpeakingEvaluationResult {
  const wordCount = input.transcript.split(/\s+/).filter(Boolean).length;
  const pace = input.durationSeconds > 0 ? wordCount / (input.durationSeconds / 60) : 90;

  const fluencyScore = clampScore(pace >= 100 ? 6.8 : pace >= 80 ? 6.2 : 5.6);
  const grammarScore = clampScore(wordCount >= 60 ? 6.3 : 5.8);
  const pronunciationScore = 6.0;
  const vocabularyScore = clampScore(wordCount >= 70 ? 6.4 : 5.9);
  const overallScore = clampScore(
    (fluencyScore + grammarScore + pronunciationScore + vocabularyScore) / 4,
  );

  return {
    fluencyScore,
    grammarScore,
    pronunciationScore,
    vocabularyScore,
    overallScore,
    strengths: [
      "You stayed on topic and responded to the prompt clearly.",
      "Your response length is suitable for short speaking practice.",
    ],
    weaknesses: [
      "Grammar accuracy still needs more consistency in complex sentences.",
      "Pronunciation and stress patterns need targeted daily drilling.",
    ],
    suggestedCorrections: [
      "Slow down slightly and use clear sentence stress on key words.",
      "Use two linking phrases such as however and for example.",
      "Re-record your response after correcting grammar in 3 key sentences.",
    ],
  };
}

function normalizeAiEvaluation(raw: unknown): SpeakingEvaluationResult | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const value = raw as Partial<SpeakingEvaluationResult>;

  if (
    typeof value.fluencyScore !== "number" ||
    typeof value.grammarScore !== "number" ||
    typeof value.pronunciationScore !== "number" ||
    typeof value.vocabularyScore !== "number" ||
    typeof value.overallScore !== "number" ||
    !Array.isArray(value.strengths) ||
    !Array.isArray(value.weaknesses) ||
    !Array.isArray(value.suggestedCorrections)
  ) {
    return null;
  }

  return {
    fluencyScore: clampScore(value.fluencyScore),
    grammarScore: clampScore(value.grammarScore),
    pronunciationScore: clampScore(value.pronunciationScore),
    vocabularyScore: clampScore(value.vocabularyScore),
    overallScore: clampScore(value.overallScore),
    strengths: value.strengths.map(String),
    weaknesses: value.weaknesses.map(String),
    suggestedCorrections: value.suggestedCorrections.map(String),
  };
}

export async function evaluateSpeaking(
  input: EvaluateSpeakingInput,
): Promise<{ result: SpeakingEvaluationResult; provider: "ai" | "fallback" }> {
  try {
    const aiContent = await generateChatCompletion({
      messages: [
        { role: "system", content: SPEAKING_EVALUATOR_SYSTEM_PROMPT },
        {
          role: "user",
          content: JSON.stringify(input),
        },
      ],
    });

    const parsed = JSON.parse(aiContent) as unknown;
    const normalized = normalizeAiEvaluation(parsed);

    if (!normalized) {
      throw new Error("Speaking evaluator response format invalid.");
    }

    return { result: normalized, provider: "ai" };
  } catch (error) {
    console.error("Speaking evaluator fallback triggered:", error);
    return {
      result: fallbackEvaluation(input),
      provider: "fallback",
    };
  }
}
