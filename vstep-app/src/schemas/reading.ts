import { z } from "zod";

export const readingSubmitSchema = z.object({
  answers: z.record(z.string(), z.number()),
});

export type ReadingSubmitInput = z.infer<typeof readingSubmitSchema>;
