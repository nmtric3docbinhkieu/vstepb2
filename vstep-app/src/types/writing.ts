export type WritingCriterionScore = {
  criterion: "taskResponse" | "grammar" | "vocabulary" | "coherence";
  score: number;
  comment: string;
};

export type WritingEvaluationResult = {
  overallScore: number;
  estimatedLevel: "B1" | "B1+" | "B2" | "B2+";
  strengths: string[];
  weaknesses: string[];
  grammarErrors: string[];
  vocabularySuggestions: string[];
  sampleEssay: string;
  criterionScores: WritingCriterionScore[];
};

export type WritingSubmission = {
  id: string;
  prompt: string;
  essayText: string;
  result: WritingEvaluationResult;
  submittedAt: string;
};
