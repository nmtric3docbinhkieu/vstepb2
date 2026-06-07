import type { WritingEvaluationResult, WritingSubmission } from "@/types/writing";

const MAX_SUBMISSIONS = 20;
const submissionStore = new Map<string, WritingSubmission[]>();

export function listWritingSubmissions(userId: string): WritingSubmission[] {
  return submissionStore.get(userId) ?? [];
}

export function addWritingSubmission(params: {
  userId: string;
  prompt: string;
  essayText: string;
  result: WritingEvaluationResult;
}): WritingSubmission {
  const history = listWritingSubmissions(params.userId);

  const nextSubmission: WritingSubmission = {
    id: crypto.randomUUID(),
    prompt: params.prompt,
    essayText: params.essayText,
    result: params.result,
    submittedAt: new Date().toISOString(),
  };

  const nextHistory = [nextSubmission, ...history].slice(0, MAX_SUBMISSIONS);
  submissionStore.set(params.userId, nextHistory);

  return nextSubmission;
}
