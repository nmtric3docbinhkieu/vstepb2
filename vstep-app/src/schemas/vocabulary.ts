import { z } from "zod";

export const vocabularyReviewSchema = z.object({
  wordId: z.string().min(1, "wordId is required."),
  quality: z.enum(["again", "hard", "good", "easy"]),
});

export type VocabularyReviewInput = z.infer<typeof vocabularyReviewSchema>;
