export type SpeakingEvaluationResult = {
  fluencyScore: number;
  grammarScore: number;
  pronunciationScore: number;
  vocabularyScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestedCorrections: string[];
};

export type SpeakingRecordingItem = {
  id: string;
  question: string;
  audioBase64: string;
  mimeType: string;
  durationSeconds: number;
  transcript: string | null;
  transcriptProvider: "whisper" | "fallback" | null;
  evaluation: SpeakingEvaluationResult | null;
  evaluationProvider: "ai" | "fallback" | null;
  submittedAt: string;
};
