import type { ReadingAttempt } from "@/types/reading";

const MAX_ATTEMPTS = 20;
const attemptStore = new Map<string, ReadingAttempt[]>();

export function listReadingAttempts(userId: string): ReadingAttempt[] {
  return attemptStore.get(userId) ?? [];
}

export function addReadingAttempt(
  userId: string,
  attempt: Omit<ReadingAttempt, "id" | "submittedAt">,
): ReadingAttempt {
  const history = listReadingAttempts(userId);

  const nextAttempt: ReadingAttempt = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    ...attempt,
  };

  attemptStore.set(userId, [nextAttempt, ...history].slice(0, MAX_ATTEMPTS));

  return nextAttempt;
}
