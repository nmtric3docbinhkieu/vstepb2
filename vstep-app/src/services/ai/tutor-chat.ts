import { TUTOR_CHAT_SYSTEM_PROMPT } from "@/prompts/tutor-chat";
import { generateChatCompletion } from "@/services/ai/openai";
import type { TutorMessage } from "@/types/tutor";

type GenerateTutorReplyParams = {
  history: TutorMessage[];
  userMessage: string;
};

function createFallbackReply(userMessage: string): string {
  return [
    "Great effort. I can help you immediately in demo mode while OpenAI is not configured.",
    `Your question: \"${userMessage}\"`,
    "Step 1: Identify the main grammar or vocabulary point in this question.",
    "Step 2: Write one short answer with clear structure.",
    "Step 3: Improve it with one advanced connector and two topic words.",
    "Try writing your draft now, and I will refine it line by line.",
  ].join("\n\n");
}

export async function generateTutorReply({
  history,
  userMessage,
}: GenerateTutorReplyParams): Promise<string> {
  try {
    const recentHistory = history.slice(-8);

    const messages = [
      { role: "system" as const, content: TUTOR_CHAT_SYSTEM_PROMPT },
      ...recentHistory.map((item) => ({
        role: item.role,
        content: item.content,
      })),
      { role: "user" as const, content: userMessage },
    ];

    return await generateChatCompletion({ messages });
  } catch (error) {
    console.error("Tutor AI fallback triggered:", error);
    return createFallbackReply(userMessage);
  }
}
