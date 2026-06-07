export type SpeakingRecordingItem = {
  id: string;
  question: string;
  audioBase64: string;
  mimeType: string;
  durationSeconds: number;
  submittedAt: string;
};
