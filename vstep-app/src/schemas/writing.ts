import { z } from "zod";

export const writingEvaluationSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters."),
  essayText: z
    .string()
    .min(80, "Essay must be at least 80 characters.")
    .max(6000, "Essay must be 6000 characters or fewer."),
});

export type WritingEvaluationInput = z.infer<typeof writingEvaluationSchema>;
