import { z } from "zod";

export const listeningSubmitSchema = z.object({
  answers: z.record(z.string(), z.number()),
});

export type ListeningSubmitInput = z.infer<typeof listeningSubmitSchema>;
