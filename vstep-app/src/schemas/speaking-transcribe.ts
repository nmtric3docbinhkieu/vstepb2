import { z } from "zod";

export const speakingTranscribeSchema = z.object({
  recordingId: z.string().min(1, "recordingId is required."),
});

export type SpeakingTranscribeInput = z.infer<typeof speakingTranscribeSchema>;
