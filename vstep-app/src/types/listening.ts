export type ListeningQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
};

export type ListeningQuestionPublic = Omit<ListeningQuestion, "correctOptionIndex">;

export type ListeningModule = {
  id: string;
  title: string;
  level: "B1+" | "B2";
  audioUrl: string;
  transcriptPreview: string;
  questions: ListeningQuestion[];
};

export type ListeningAttempt = {
  id: string;
  moduleId: string;
  answers: Record<string, number>;
  score: number;
  total: number;
  percent: number;
  submittedAt: string;
};
