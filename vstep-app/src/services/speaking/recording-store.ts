import type { SpeakingRecordingItem } from "@/types/speaking";

const MAX_RECORDINGS = 15;
const recordingStore = new Map<string, SpeakingRecordingItem[]>();

export function listSpeakingRecordings(userId: string): SpeakingRecordingItem[] {
  return recordingStore.get(userId) ?? [];
}

export function addSpeakingRecording(params: {
  userId: string;
  question: string;
  audioBase64: string;
  mimeType: string;
  durationSeconds: number;
}): SpeakingRecordingItem {
  const history = listSpeakingRecordings(params.userId);

  const nextItem: SpeakingRecordingItem = {
    id: crypto.randomUUID(),
    question: params.question,
    audioBase64: params.audioBase64,
    mimeType: params.mimeType,
    durationSeconds: params.durationSeconds,
    submittedAt: new Date().toISOString(),
  };

  recordingStore.set(params.userId, [nextItem, ...history].slice(0, MAX_RECORDINGS));

  return nextItem;
}
