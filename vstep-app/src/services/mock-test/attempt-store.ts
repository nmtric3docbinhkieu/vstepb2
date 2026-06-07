import type { MockFinalReport, MockTestAttempt } from "@/types/mock-test";

const MAX_ATTEMPTS = 20;
const attemptStore = new Map<string, MockTestAttempt[]>();

export function listMockTestAttempts(userId: string): MockTestAttempt[] {
  return attemptStore.get(userId) ?? [];
}

export function addMockTestAttempt(
  userId: string,
  params: { moduleId: string; report: MockFinalReport },
): MockTestAttempt {
  const history = listMockTestAttempts(userId);

  const attempt: MockTestAttempt = {
    id: crypto.randomUUID(),
    moduleId: params.moduleId,
    report: params.report,
    submittedAt: new Date().toISOString(),
  };

  attemptStore.set(userId, [attempt, ...history].slice(0, MAX_ATTEMPTS));

  return attempt;
}
