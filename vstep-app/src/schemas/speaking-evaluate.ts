import { z } from "zod";

export const speakingEvaluateSchema = z.object({
  recordingId: z.string().min(1, "recordingId is required."),
});

export type SpeakingEvaluateInput = z.infer<typeof speakingEvaluateSchema>;
