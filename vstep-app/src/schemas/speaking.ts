import { z } from "zod";

export const speakingSubmissionSchema = z.object({
  question: z.string().min(10, "Question is required."),
  audioBase64: z.string().min(20, "Audio data is required."),
  mimeType: z.string().min(3, "Audio mime type is required."),
  durationSeconds: z.number().min(1, "Duration must be at least 1 second."),
});

export type SpeakingSubmissionInput = z.infer<typeof speakingSubmissionSchema>;
