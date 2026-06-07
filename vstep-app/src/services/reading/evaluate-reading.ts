import type { ReadingModule, ReadingQuestionPublic } from "@/types/reading";

export function toPublicQuestions(
  questions: ReadingModule["questions"],
): ReadingQuestionPublic[] {
  return questions.map((question) => ({
    id: question.id,
    prompt: question.prompt,
    options: question.options,
    explanation: question.explanation,
  }));
}

export function evaluateReadingAnswers(params: {
  module: ReadingModule;
  answers: Record<string, number>;
}): {
  score: number;
  total: number;
  percent: number;
  incorrect: Array<{ questionId: string; explanation: string }>;
} {
  const total = params.module.questions.length;

  let score = 0;
  const incorrect: Array<{ questionId: string; explanation: string }> = [];

  for (const question of params.module.questions) {
    if (params.answers[question.id] === question.correctOptionIndex) {
      score += 1;
    } else {
      incorrect.push({
        questionId: question.id,
        explanation: question.explanation,
      });
    }
  }

  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  return {
    score,
    total,
    percent,
    incorrect,
  };
}
