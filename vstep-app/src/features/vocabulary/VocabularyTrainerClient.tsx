"use client";

import { useEffect, useMemo, useState } from "react";

import type { VocabularyReviewItem } from "@/types/vocabulary";

type VocabularyApiResponse = {
  success: boolean;
  message: string;
  data?: {
    queue?: VocabularyReviewItem[];
    allItems?: VocabularyReviewItem[];
  };
};

const QUALITY_LABELS: Array<{ key: "again" | "hard" | "good" | "easy"; label: string }> = [
  { key: "again", label: "Again" },
  { key: "hard", label: "Hard" },
  { key: "good", label: "Good" },
  { key: "easy", label: "Easy" },
];

function masteryLabel(level: number): string {
  if (level >= 5) return "Mastered";
  if (level >= 3) return "Developing";
  if (level >= 1) return "Early";
  return "New";
}

export function VocabularyTrainerClient() {
  const [queue, setQueue] = useState<VocabularyReviewItem[]>([]);
  const [allItems, setAllItems] = useState<VocabularyReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentCard = queue[0] ?? null;

  const overallStats = useMemo(() => {
    const mastered = allItems.filter((item) => item.progress.masteryLevel >= 5).length;
    const averageMastery =
      allItems.length > 0
        ? (allItems.reduce((sum, item) => sum + item.progress.masteryLevel, 0) / allItems.length).toFixed(1)
        : "0.0";

    return {
      total: allItems.length,
      mastered,
      averageMastery,
    };
  }, [allItems]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch("/api/vocabulary/review", { method: "GET" });
        const result = (await response.json()) as VocabularyApiResponse;

        if (!response.ok || !result.success) {
          setErrorMessage(result.message || "Unable to load vocabulary queue.");
          return;
        }

        setQueue(result.data?.queue ?? []);
        setAllItems(result.data?.allItems ?? []);
      } catch {
        setErrorMessage("Unable to load vocabulary queue.");
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const reviewCurrentCard = async (quality: "again" | "hard" | "good" | "easy") => {
    if (!currentCard) {
      return;
    }

    setErrorMessage(null);

    try {
      const response = await fetch("/api/vocabulary/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wordId: currentCard.id,
          quality,
        }),
      });

      const result = (await response.json()) as VocabularyApiResponse;

      if (!response.ok || !result.success) {
        setErrorMessage(result.message || "Unable to submit review.");
        return;
      }

      const refresh = await fetch("/api/vocabulary/review", { method: "GET" });
      const refreshResult = (await refresh.json()) as VocabularyApiResponse;

      if (!refresh.ok || !refreshResult.success) {
        setErrorMessage(refreshResult.message || "Unable to refresh review queue.");
        return;
      }

      setQueue(refreshResult.data?.queue ?? []);
      setAllItems(refreshResult.data?.allItems ?? []);
    } catch {
      setErrorMessage("Unable to submit review.");
    }
  };

  return (
    <div className="space-y-6">
      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">Flashcards</h2>

        {isLoading ? <p className="mt-3 text-sm text-slate-600">Loading vocabulary...</p> : null}

        {!isLoading && currentCard ? (
          <article className="card-3d mt-4 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide text-slate-500">{currentCard.topic}</p>
            <h3 className="mt-2 text-3xl font-bold text-slate-900">{currentCard.word}</h3>
            <p className="mt-1 text-sm text-sky-700">{currentCard.ipa}</p>
            <p className="mt-3 text-sm text-slate-700">{currentCard.meaning}</p>
            <p className="mt-2 text-sm text-slate-600">Example: {currentCard.example}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {QUALITY_LABELS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => void reviewCurrentCard(item.key)}
                  className="btn-ghost-3d rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </article>
        ) : null}

        {!isLoading && !currentCard ? (
          <p className="mt-3 text-sm text-slate-600">
            No cards due now. Your review schedule is up to date.
          </p>
        ) : null}

        {errorMessage ? <p className="mt-3 text-sm text-rose-600">{errorMessage}</p> : null}
      </section>

      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">Review Scheduler</h2>
        <p className="mt-2 text-sm text-slate-700">
          Due now: {queue.length} cards | Total words: {overallStats.total}
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <article className="card-3d rounded-xl p-4">
            <p className="text-xs text-slate-500">Mastered Words</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{overallStats.mastered}</p>
          </article>
          <article className="card-3d rounded-xl p-4">
            <p className="text-xs text-slate-500">Average Mastery</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{overallStats.averageMastery}/5</p>
          </article>
          <article className="card-3d rounded-xl p-4">
            <p className="text-xs text-slate-500">Queue Size</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{queue.length}</p>
          </article>
        </div>
      </section>

      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">Mastery Tracking</h2>

        <div className="mt-4 space-y-3">
          {allItems.map((item) => (
            <article key={item.id} className="card-3d rounded-xl p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">{item.word}</p>
                <p className="text-xs text-slate-600">{masteryLabel(item.progress.masteryLevel)}</p>
              </div>

              <p className="mt-1 text-xs text-slate-500">Review count: {item.progress.reviewCount}</p>

              <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                  style={{ width: `${(item.progress.masteryLevel / 5) * 100}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
