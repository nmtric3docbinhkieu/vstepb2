export type VocabularyWord = {
  id: string;
  word: string;
  ipa: string;
  meaning: string;
  example: string;
  topic: string;
};

export type VocabularyProgress = {
  wordId: string;
  masteryLevel: number;
  reviewCount: number;
  lastReviewAt: string | null;
  nextReviewAt: string;
};

export type VocabularyReviewItem = VocabularyWord & {
  progress: VocabularyProgress;
};
