import { WRITING_EVALUATOR_SYSTEM_PROMPT } from "@/prompts/writing-evaluator";
import { generateChatCompletion } from "@/services/ai/openai";
import type { WritingEvaluationInput } from "@/schemas/writing";
import type { WritingEvaluationResult } from "@/types/writing";

function calculateFallbackScore(essayText: string): number {
  const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;

  if (wordCount >= 220) return 6.8;
  if (wordCount >= 170) return 6.2;
  if (wordCount >= 130) return 5.8;
  return 5.2;
}

function mapLevel(score: number): WritingEvaluationResult["estimatedLevel"] {
  if (score >= 7) return "B2+";
  if (score >= 6.2) return "B2";
  if (score >= 5.6) return "B1+";
  return "B1";
}

function createFallbackEvaluation(input: WritingEvaluationInput): WritingEvaluationResult {
  const overallScore = calculateFallbackScore(input.essayText);
  const estimatedLevel = mapLevel(overallScore);

  return {
    overallScore,
    estimatedLevel,
    strengths: [
      "You addressed the main topic clearly.",
      "Your writing shows effort in organizing ideas into paragraphs.",
    ],
    weaknesses: [
      "Some sentences are repetitive and can be combined for better flow.",
      "Grammar accuracy needs improvement in tense and article usage.",
    ],
    grammarErrors: [
      "Check subject-verb agreement in long sentences.",
      "Review article usage: a/an/the before singular nouns.",
      "Avoid comma splice; use conjunctions or split into two sentences.",
    ],
    vocabularySuggestions: [
      "Replace common words like good/bad with more precise terms.",
      "Use topic-specific collocations to raise lexical range.",
      "Add two contrasting connectors: however, whereas.",
    ],
    sampleEssay:
      "In my opinion, online learning should be combined with traditional classroom study because each method offers unique benefits. On the one hand, online platforms provide flexibility for students who need to manage their time efficiently. On the other hand, face-to-face classes encourage immediate interaction and help learners stay motivated. Therefore, a blended model can improve both access and learning quality. To make this approach effective, schools should provide clear weekly plans and regular teacher feedback.",
    criterionScores: [
      {
        criterion: "taskResponse",
        score: Math.max(5, overallScore - 0.2),
        comment: "Main ideas are relevant, but development can be deeper.",
      },
      {
        criterion: "grammar",
        score: Math.max(5, overallScore - 0.4),
        comment: "Frequent minor errors affect clarity in some sentences.",
      },
      {
        criterion: "vocabulary",
        score: Math.max(5, overallScore - 0.1),
        comment: "Adequate range, but more precise word choice is needed.",
      },
      {
        criterion: "coherence",
        score: Math.max(5, overallScore - 0.2),
        comment: "Paragraph structure exists; transitions can be improved.",
      },
    ],
  };
}

function normalizeAiResult(raw: unknown): WritingEvaluationResult | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const value = raw as Partial<WritingEvaluationResult>;

  if (
    typeof value.overallScore !== "number" ||
    !Array.isArray(value.strengths) ||
    !Array.isArray(value.weaknesses) ||
    !Array.isArray(value.grammarErrors) ||
    !Array.isArray(value.vocabularySuggestions) ||
    typeof value.sampleEssay !== "string" ||
    !Array.isArray(value.criterionScores)
  ) {
    return null;
  }

  const estimatedLevel =
    value.estimatedLevel === "B1" ||
    value.estimatedLevel === "B1+" ||
    value.estimatedLevel === "B2" ||
    value.estimatedLevel === "B2+"
      ? value.estimatedLevel
      : mapLevel(value.overallScore);

  return {
    overallScore: value.overallScore,
    estimatedLevel,
    strengths: value.strengths.map(String),
    weaknesses: value.weaknesses.map(String),
    grammarErrors: value.grammarErrors.map(String),
    vocabularySuggestions: value.vocabularySuggestions.map(String),
    sampleEssay: value.sampleEssay,
    criterionScores: value.criterionScores.map((item) => ({
      criterion: (item as { criterion?: WritingEvaluationResult["criterionScores"][number]["criterion"] })
        .criterion ?? "taskResponse",
      score: Number((item as { score?: number }).score ?? 5),
      comment: String((item as { comment?: string }).comment ?? ""),
    })),
  };
}

export async function evaluateWriting(
  input: WritingEvaluationInput,
): Promise<WritingEvaluationResult> {
  try {
    const assistantContent = await generateChatCompletion({
      messages: [
        { role: "system", content: WRITING_EVALUATOR_SYSTEM_PROMPT },
        {
          role: "user",
          content: JSON.stringify({
            prompt: input.prompt,
            essayText: input.essayText,
          }),
        },
      ],
    });

    const parsed = JSON.parse(assistantContent) as unknown;
    const normalized = normalizeAiResult(parsed);

    if (!normalized) {
      throw new Error("AI response format invalid.");
    }

    return normalized;
  } catch (error) {
    console.error("Writing evaluation fallback triggered:", error);
    return createFallbackEvaluation(input);
  }
}
