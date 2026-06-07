"use client";

import { useEffect, useMemo, useState } from "react";

import type { WritingSubmission } from "@/types/writing";

type WritingApiResponse = {
  success: boolean;
  message: string;
  data?: {
    submission?: WritingSubmission;
    submissions?: WritingSubmission[];
  };
};

const DEFAULT_PROMPT =
  "Some people think online learning is better than traditional classroom learning. Discuss both views and give your opinion.";

export function WritingTrainerClient() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [essayText, setEssayText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<WritingSubmission[]>([]);

  const latest = useMemo(() => submissions[0] ?? null, [submissions]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch("/api/writing/evaluate", { method: "GET" });
        const result = (await response.json()) as WritingApiResponse;

        if (!response.ok || !result.success) {
          return;
        }

        setSubmissions(result.data?.submissions ?? []);
      } catch {
        // Ignore history load failure in MVP mode.
      }
    };

    void loadHistory();
  }, []);

  const submitEssay = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/writing/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, essayText }),
      });

      const result = (await response.json()) as WritingApiResponse;

      if (!response.ok || !result.success || !result.data?.submission) {
        setErrorMessage(result.message || "Evaluation failed.");
        return;
      }

      setSubmissions((prev) => [result.data!.submission!, ...prev]);
    } catch {
      setErrorMessage("Evaluation failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">Essay Input</h2>

        <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="writing-prompt">
          Writing Prompt
        </label>
        <textarea
          id="writing-prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          rows={3}
          className="mt-1 w-full resize-none rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-400 focus:ring-2"
        />

        <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="essay-text">
          Your Essay
        </label>
        <textarea
          id="essay-text"
          value={essayText}
          onChange={(event) => setEssayText(event.target.value)}
          rows={10}
          placeholder="Write your essay here..."
          className="mt-1 w-full resize-none rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-400 focus:ring-2"
        />

        <div className="mt-2 text-xs text-slate-500">
          Character count: {essayText.length} (minimum 80 for evaluation)
        </div>

        {errorMessage ? <p className="mt-2 text-sm text-rose-600">{errorMessage}</p> : null}

        <button
          type="button"
          onClick={submitEssay}
          disabled={isSubmitting}
          className="btn-3d mt-4 rounded-xl px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Evaluating..." : "Evaluate Essay"}
        </button>
      </section>

      {latest ? (
        <section className="surface-3d rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900">Feedback UI</h2>
          <p className="mt-2 text-sm text-slate-700">
            Overall Score: {latest.result.overallScore} | Estimated Level: {latest.result.estimatedLevel}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {latest.result.criterionScores.map((item) => (
              <article key={item.criterion} className="card-3d rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-900">{item.criterion}</p>
                <p className="mt-1 text-sm text-slate-700">Score: {item.score}</p>
                <p className="mt-1 text-xs text-slate-600">{item.comment}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <article className="card-3d rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900">Strengths</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                {latest.result.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card-3d rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900">Weaknesses</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                {latest.result.weaknesses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <article className="card-3d rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900">Grammar Errors</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                {latest.result.grammarErrors.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card-3d rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900">Vocabulary Suggestions</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                {latest.result.vocabularySuggestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      ) : null}

      {latest ? (
        <section className="surface-3d rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900">Sample Essay</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-800">
            {latest.result.sampleEssay}
          </p>
        </section>
      ) : null}
    </div>
  );
}
