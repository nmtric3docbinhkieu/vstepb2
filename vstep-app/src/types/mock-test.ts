export type MockSkill = "reading" | "listening" | "writing" | "speaking";

export type MockQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
};

export type MockQuestionPublic = Omit<MockQuestion, "correctOptionIndex">;

export type MockTestModule = {
  id: string;
  title: string;
  level: "B2";
  readingPassage: string;
  readingQuestions: MockQuestion[];
  listeningAudioUrl: string;
  listeningContext: string;
  listeningQuestions: MockQuestion[];
  writingPrompt: string;
  speakingPrompt: string;
};

export type MockTestSubmission = {
  readingAnswers: Record<string, number>;
  listeningAnswers: Record<string, number>;
  writingResponse: string;
  speakingResponse: string;
};

export type MockSkillScore = {
  skill: MockSkill;
  score: number;
  total: number;
  percent: number;
  notes: string[];
};

export type MockFinalReport = {
  estimatedLevel: "B1" | "B1+" | "B2" | "B2+";
  overallScore: number;
  overallTotal: number;
  overallPercent: number;
  breakdown: MockSkillScore[];
  strengths: string[];
  improvementAreas: string[];
  recommendation: string;
};

export type MockTestAttempt = {
  id: string;
  moduleId: string;
  submittedAt: string;
  report: MockFinalReport;
};
