import { z } from "zod";

export const tutorMessageSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required.")
    .max(2000, "Message must be 2000 characters or fewer."),
});

export type TutorMessageInput = z.infer<typeof tutorMessageSchema>;
