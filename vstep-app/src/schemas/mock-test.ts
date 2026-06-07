import { z } from "zod";

export const mockTestSubmitSchema = z.object({
  readingAnswers: z.record(z.string(), z.number()),
  listeningAnswers: z.record(z.string(), z.number()),
  writingResponse: z.string().min(20),
  speakingResponse: z.string().min(20),
});

export type MockTestSubmitInput = z.infer<typeof mockTestSubmitSchema>;
