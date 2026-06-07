"use client";

import { useEffect, useMemo, useState } from "react";

import type { TutorMessage } from "@/types/tutor";

type TutorApiResponse = {
  success: boolean;
  message: string;
  data?: {
    history?: TutorMessage[];
  };
};

function formatTime(value: string): string {
  return new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TutorChatPanel() {
  const [history, setHistory] = useState<TutorMessage[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emptyState = useMemo(() => history.length === 0, [history.length]);

  useEffect(() => {
    const loadHistory = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch("/api/tutor/messages", {
          method: "GET",
        });
        const result = (await response.json()) as TutorApiResponse;

        if (!response.ok || !result.success) {
          setErrorMessage(result.message || "Failed to load conversation.");
          return;
        }

        setHistory(result.data?.history ?? []);
      } catch {
        setErrorMessage("Failed to load conversation.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadHistory();
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || isSending) {
      return;
    }

    setIsSending(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/tutor/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message.trim() }),
      });

      const result = (await response.json()) as TutorApiResponse;

      if (!response.ok || !result.success) {
        setErrorMessage(result.message || "Unable to send message.");
        return;
      }

      setHistory(result.data?.history ?? []);
      setMessage("");
    } catch {
      setErrorMessage("Unable to send message.");
    } finally {
      setIsSending(false);
    }
  };

  const clearHistory = async () => {
    setErrorMessage(null);

    try {
      const response = await fetch("/api/tutor/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clearHistory: true }),
      });

      const result = (await response.json()) as TutorApiResponse;

      if (!response.ok || !result.success) {
        setErrorMessage(result.message || "Failed to clear history.");
        return;
      }

      setHistory([]);
    } catch {
      setErrorMessage("Failed to clear history.");
    }
  };

  return (
    <section className="surface-3d mt-6 rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">AI Tutor Chat</h2>
          <p className="text-sm text-slate-600">Ask grammar, writing, speaking, or study-plan questions.</p>
        </div>
        <button
          type="button"
          onClick={clearHistory}
          className="btn-ghost-3d rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700"
        >
          Clear History
        </button>
      </div>

      <div className="mt-4 h-[360px] overflow-y-auto rounded-xl border border-slate-200/80 bg-white/75 p-4">
        {isLoading ? <p className="text-sm text-slate-500">Loading conversation...</p> : null}

        {!isLoading && emptyState ? (
          <p className="text-sm text-slate-500">
            Start your first message. The tutor will guide you step by step.
          </p>
        ) : null}

        <div className="space-y-3">
          {history.map((item) => (
            <article
              key={item.id}
              className={`max-w-[88%] rounded-xl px-4 py-3 text-sm leading-6 shadow-sm ${
                item.role === "user"
                  ? "ml-auto bg-sky-600 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              <p className="whitespace-pre-wrap">{item.content}</p>
              <p
                className={`mt-1 text-[11px] ${
                  item.role === "user" ? "text-sky-100" : "text-slate-500"
                }`}
              >
                {formatTime(item.createdAt)}
              </p>
            </article>
          ))}
        </div>
      </div>

      {errorMessage ? <p className="mt-2 text-sm text-rose-600">{errorMessage}</p> : null}

      <div className="mt-4 flex gap-2">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask a VSTEP B2 question..."
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-300/80 bg-white px-3 py-2 text-slate-900 outline-none ring-sky-400 transition focus:ring-2"
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={isSending}
          className="btn-3d h-fit rounded-xl px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </section>
  );
}
