export type ReadingQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
};

export type ReadingQuestionPublic = Omit<ReadingQuestion, "correctOptionIndex">;

export type ReadingModule = {
  id: string;
  title: string;
  level: "B1+" | "B2";
  passage: string;
  questions: ReadingQuestion[];
};

export type ReadingAttempt = {
  id: string;
  moduleId: string;
  answers: Record<string, number>;
  score: number;
  total: number;
  percent: number;
  submittedAt: string;
};
