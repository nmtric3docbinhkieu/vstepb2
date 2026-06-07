import type { ListeningAttempt } from "@/types/listening";

const MAX_ATTEMPTS = 20;
const attemptStore = new Map<string, ListeningAttempt[]>();

export function listListeningAttempts(userId: string): ListeningAttempt[] {
  return attemptStore.get(userId) ?? [];
}

export function addListeningAttempt(
  userId: string,
  attempt: Omit<ListeningAttempt, "id" | "submittedAt">,
): ListeningAttempt {
  const history = listListeningAttempts(userId);

  const nextAttempt: ListeningAttempt = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    ...attempt,
  };

  attemptStore.set(userId, [nextAttempt, ...history].slice(0, MAX_ATTEMPTS));

  return nextAttempt;
}
