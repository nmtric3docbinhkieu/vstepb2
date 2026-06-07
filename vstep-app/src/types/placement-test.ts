export type PlacementSection = "vocabulary" | "grammar" | "reading";

export type PlacementQuestion = {
  id: string;
  section: PlacementSection;
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
};

export type PlacementAnswerMap = Record<string, number>;

export type PlacementScoreBreakdown = {
  section: PlacementSection;
  total: number;
  correct: number;
  percent: number;
};

export type PlacementReport = {
  estimatedLevel: "B1" | "B1+" | "B2" | "B2+";
  overallPercent: number;
  totalCorrect: number;
  totalQuestions: number;
  breakdown: PlacementScoreBreakdown[];
  strengths: string[];
  improvementAreas: string[];
  recommendation: string;
};
