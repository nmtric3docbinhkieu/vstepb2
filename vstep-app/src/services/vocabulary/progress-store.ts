import { VOCABULARY_WORD_BANK } from "@/services/vocabulary/word-bank";
import type { VocabularyProgress, VocabularyReviewItem } from "@/types/vocabulary";

const vocabularyProgressStore = new Map<string, Map<string, VocabularyProgress>>();

function getUserMap(userId: string): Map<string, VocabularyProgress> {
  const existing = vocabularyProgressStore.get(userId);

  if (existing) {
    return existing;
  }

  const initial = new Map<string, VocabularyProgress>();

  for (const word of VOCABULARY_WORD_BANK) {
    initial.set(word.id, {
      wordId: word.id,
      masteryLevel: 0,
      reviewCount: 0,
      lastReviewAt: null,
      nextReviewAt: new Date().toISOString(),
    });
  }

  vocabularyProgressStore.set(userId, initial);
  return initial;
}

function computeNextReviewDate(masteryLevel: number): string {
  const spacingDays = [1, 1, 2, 4, 7, 14][Math.min(masteryLevel, 5)];
  const next = new Date();
  next.setDate(next.getDate() + spacingDays);
  return next.toISOString();
}

export function getVocabularyReviewQueue(userId: string): VocabularyReviewItem[] {
  const map = getUserMap(userId);
  const now = Date.now();

  return VOCABULARY_WORD_BANK.map((word) => {
    const progress = map.get(word.id)!;
    return { ...word, progress };
  })
    .filter((item) => new Date(item.progress.nextReviewAt).getTime() <= now)
    .sort((a, b) => a.progress.masteryLevel - b.progress.masteryLevel);
}

export function getAllVocabularyProgress(userId: string): VocabularyReviewItem[] {
  const map = getUserMap(userId);

  return VOCABULARY_WORD_BANK.map((word) => ({
    ...word,
    progress: map.get(word.id)!,
  }));
}

export function submitVocabularyReview(params: {
  userId: string;
  wordId: string;
  quality: "again" | "hard" | "good" | "easy";
}): VocabularyProgress | null {
  const map = getUserMap(params.userId);
  const existing = map.get(params.wordId);

  if (!existing) {
    return null;
  }

  const delta =
    params.quality === "again" ? -1 : params.quality === "hard" ? 0 : params.quality === "good" ? 1 : 2;

  const masteryLevel = Math.max(0, Math.min(5, existing.masteryLevel + delta));

  const updated: VocabularyProgress = {
    ...existing,
    masteryLevel,
    reviewCount: existing.reviewCount + 1,
    lastReviewAt: new Date().toISOString(),
    nextReviewAt: computeNextReviewDate(masteryLevel),
  };

  map.set(params.wordId, updated);
  return updated;
}
