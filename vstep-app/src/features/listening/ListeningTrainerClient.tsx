"use client";

import { useEffect, useMemo, useState } from "react";

import type { ListeningAttempt, ListeningQuestionPublic } from "@/types/listening";

type ListeningModuleResponse = {
  success: boolean;
  message: string;
  data?: {
    moduleId: string;
    title: string;
    level: string;
    audioUrl: string;
    transcriptPreview: string;
    questions: ListeningQuestionPublic[];
  };
};

type ListeningSubmitResponse = {
  success: boolean;
  message: string;
  data?: {
    attempt: ListeningAttempt;
    feedback: {
      incorrect: Array<{ questionId: string; explanation: string }>;
    };
  };
};

type ListeningAttemptsResponse = {
  success: boolean;
  message: string;
  data?: {
    attempts: ListeningAttempt[];
  };
};

export function ListeningTrainerClient() {
  const [moduleId, setModuleId] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [transcriptPreview, setTranscriptPreview] = useState("");
  const [questions, setQuestions] = useState<ListeningQuestionPublic[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [attempts, setAttempts] = useState<ListeningAttempt[]>([]);
  const [feedback, setFeedback] = useState<Array<{ questionId: string; explanation: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const latestAttempt = attempts[0] ?? null;
  const unansweredCount = useMemo(
    () => questions.filter((question) => answers[question.id] === undefined).length,
    [questions, answers],
  );

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const [moduleResponse, attemptsResponse] = await Promise.all([
          fetch("/api/listening/module", { method: "GET" }),
          fetch("/api/listening/submit", { method: "GET" }),
        ]);

        const moduleResult = (await moduleResponse.json()) as ListeningModuleResponse;
        const attemptsResult = (await attemptsResponse.json()) as ListeningAttemptsResponse;

        if (!moduleResponse.ok || !moduleResult.success || !moduleResult.data) {
          setErrorMessage(moduleResult.message || "Unable to load listening module.");
          return;
        }

        setModuleId(moduleResult.data.moduleId);
        setTitle(moduleResult.data.title);
        setLevel(moduleResult.data.level);
        setAudioUrl(moduleResult.data.audioUrl);
        setTranscriptPreview(moduleResult.data.transcriptPreview);
        setQuestions(moduleResult.data.questions);

        if (attemptsResponse.ok && attemptsResult.success) {
          setAttempts(attemptsResult.data?.attempts ?? []);
        }
      } catch {
        setErrorMessage("Unable to load listening module.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, []);

  const submitAnswers = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/listening/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      const result = (await response.json()) as ListeningSubmitResponse;

      if (!response.ok || !result.success || !result.data) {
        setErrorMessage(result.message || "Unable to submit listening answers.");
        return;
      }

      setAttempts((prev) => [result.data!.attempt, ...prev]);
      setFeedback(result.data.feedback.incorrect);
    } catch {
      setErrorMessage("Unable to submit listening answers.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">Audio Player</h2>
        {isLoading ? <p className="mt-3 text-sm text-slate-600">Loading listening module...</p> : null}

        {!isLoading ? (
          <>
            <p className="mt-2 text-sm text-slate-700">{title} ({level})</p>
            <audio className="mt-4 w-full" controls src={audioUrl} preload="metadata">
              <track kind="captions" />
            </audio>
            <p className="mt-3 text-xs leading-6 text-slate-500">
              Preview note: {transcriptPreview}
            </p>
          </>
        ) : null}
      </section>

      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">Questions</h2>
        <p className="mt-2 text-sm text-slate-700">Unanswered: {unansweredCount}</p>

        <div className="mt-4 space-y-4">
          {questions.map((question, index) => (
            <article key={question.id} className="card-3d rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900">
                {index + 1}. {question.prompt}
              </p>

              <div className="mt-3 grid gap-2">
                {question.options.map((option, optionIndex) => {
                  const selected = answers[question.id] === optionIndex;

                  return (
                    <label
                      key={`${question.id}-${option}`}
                      className={`rounded-lg border px-3 py-2 text-sm ${
                        selected
                          ? "border-sky-500 bg-sky-50 text-slate-900"
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        className="mr-2"
                        checked={selected}
                        onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }))}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        {errorMessage ? <p className="mt-3 text-sm text-rose-600">{errorMessage}</p> : null}

        <button
          type="button"
          disabled={isSubmitting || questions.length === 0}
          onClick={() => void submitAnswers()}
          className="btn-3d mt-4 rounded-xl px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Scoring..." : "Submit and Score"}
        </button>
      </section>

      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">Scoring</h2>

        {latestAttempt ? (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-slate-700">
              Latest score: {latestAttempt.score}/{latestAttempt.total} ({latestAttempt.percent}%)
            </p>

            {feedback.length > 0 ? (
              <article className="card-3d rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-900">Review Notes</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                  {feedback.map((item) => (
                    <li key={item.questionId}>{item.explanation}</li>
                  ))}
                </ul>
              </article>
            ) : (
              <p className="text-sm text-emerald-700">Excellent. All answers are correct.</p>
            )}

            <article className="card-3d rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900">Recent Attempts</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {attempts.slice(0, 5).map((attempt) => (
                  <li key={attempt.id}>
                    {new Date(attempt.submittedAt).toLocaleString()} - {attempt.score}/{attempt.total} ({attempt.percent}%)
                  </li>
                ))}
              </ul>
            </article>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-600">Submit answers to view listening score.</p>
        )}
      </section>

      <p className="text-xs text-slate-500">Module ID: {moduleId}</p>
    </div>
  );
}
