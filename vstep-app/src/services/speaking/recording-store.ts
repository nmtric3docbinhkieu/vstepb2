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
    transcript: null,
    transcriptProvider: null,
    evaluation: null,
    evaluationProvider: null,
    submittedAt: new Date().toISOString(),
  };

  recordingStore.set(params.userId, [nextItem, ...history].slice(0, MAX_RECORDINGS));

  return nextItem;
}

export function findSpeakingRecordingById(
  userId: string,
  recordingId: string,
): SpeakingRecordingItem | null {
  const history = listSpeakingRecordings(userId);
  return history.find((item) => item.id === recordingId) ?? null;
}

export function updateSpeakingRecordingTranscript(params: {
  userId: string;
  recordingId: string;
  transcript: string;
  transcriptProvider: "whisper" | "fallback";
}): SpeakingRecordingItem | null {
  const history = listSpeakingRecordings(params.userId);

  let updatedItem: SpeakingRecordingItem | null = null;

  const updatedHistory = history.map((item) => {
    if (item.id !== params.recordingId) {
      return item;
    }

    updatedItem = {
      ...item,
      transcript: params.transcript,
      transcriptProvider: params.transcriptProvider,
    };

    return updatedItem;
  });

  if (!updatedItem) {
    return null;
  }

  recordingStore.set(params.userId, updatedHistory);
  return updatedItem;
}

export function updateSpeakingRecordingEvaluation(params: {
  userId: string;
  recordingId: string;
  evaluation: SpeakingRecordingItem["evaluation"];
  evaluationProvider: "ai" | "fallback";
}): SpeakingRecordingItem | null {
  const history = listSpeakingRecordings(params.userId);

  let updatedItem: SpeakingRecordingItem | null = null;

  const updatedHistory = history.map((item) => {
    if (item.id !== params.recordingId) {
      return item;
    }

    updatedItem = {
      ...item,
      evaluation: params.evaluation,
      evaluationProvider: params.evaluationProvider,
    };

    return updatedItem;
  });

  if (!updatedItem) {
    return null;
  }

  recordingStore.set(params.userId, updatedHistory);
  return updatedItem;
}
