export type SpeakingRecordingItem = {
  id: string;
  question: string;
  audioBase64: string;
  mimeType: string;
  durationSeconds: number;
  transcript: string | null;
  transcriptProvider: "whisper" | "fallback" | null;
  submittedAt: string;
};
