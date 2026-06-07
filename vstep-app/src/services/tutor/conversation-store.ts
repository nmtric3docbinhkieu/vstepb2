import type { TutorMessage, TutorRole } from "@/types/tutor";

const MAX_MESSAGES = 30;
const conversationStore = new Map<string, TutorMessage[]>();

function createMessage(role: TutorRole, content: string): TutorMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}

export function getConversationHistory(userId: string): TutorMessage[] {
  return conversationStore.get(userId) ?? [];
}

export function appendConversationMessage(
  userId: string,
  role: TutorRole,
  content: string,
): TutorMessage {
  const history = getConversationHistory(userId);
  const nextMessage = createMessage(role, content);
  const nextHistory = [...history, nextMessage].slice(-MAX_MESSAGES);

  conversationStore.set(userId, nextHistory);

  return nextMessage;
}

export function clearConversationHistory(userId: string): void {
  conversationStore.delete(userId);
}
