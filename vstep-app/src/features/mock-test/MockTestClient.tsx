"use client";

import { useEffect, useMemo, useState } from "react";

import type { MockFinalReport, MockQuestionPublic, MockTestAttempt } from "@/types/mock-test";

type MockModuleResponse = {
  success: boolean;
  message: string;
  data?: {
    moduleId: string;
    title: string;
    level: string;
    readingPassage: string;
    readingQuestions: MockQuestionPublic[];
    listeningAudioUrl: string;
    listeningContext: string;
    listeningQuestions: MockQuestionPublic[];
    writingPrompt: string;
    speakingPrompt: string;
  };
};

type MockSubmitResponse = {
  success: boolean;
  message: string;
  data?: {
    attempt: MockTestAttempt;
    report: MockFinalReport;
  };
};

type MockAttemptsResponse = {
  success: boolean;
  message: string;
  data?: {
    attempts: MockTestAttempt[];
  };
};

const SKILL_LABEL: Record<string, string> = {
  reading: "Reading",
  listening: "Listening",
  writing: "Writing",
  speaking: "Speaking",
};

export function MockTestClient() {
  const [moduleId, setModuleId] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [readingPassage, setReadingPassage] = useState("");
  const [readingQuestions, setReadingQuestions] = useState<MockQuestionPublic[]>([]);
  const [listeningAudioUrl, setListeningAudioUrl] = useState("");
  const [listeningContext, setListeningContext] = useState("");
  const [listeningQuestions, setListeningQuestions] = useState<MockQuestionPublic[]>([]);
  const [writingPrompt, setWritingPrompt] = useState("");
  const [speakingPrompt, setSpeakingPrompt] = useState("");

  const [readingAnswers, setReadingAnswers] = useState<Record<string, number>>({});
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, number>>({});
  const [writingResponse, setWritingResponse] = useState("");
  const [speakingResponse, setSpeakingResponse] = useState("");

  const [attempts, setAttempts] = useState<MockTestAttempt[]>([]);
  const [report, setReport] = useState<MockFinalReport | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const unansweredObjective = useMemo(() => {
    const readingLeft = readingQuestions.filter((q) => readingAnswers[q.id] === undefined).length;
    const listeningLeft = listeningQuestions.filter((q) => listeningAnswers[q.id] === undefined).length;

    return readingLeft + listeningLeft;
  }, [readingQuestions, listeningQuestions, readingAnswers, listeningAnswers]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const [moduleResponse, attemptsResponse] = await Promise.all([
          fetch("/api/mock-test/module", { method: "GET" }),
          fetch("/api/mock-test/submit", { method: "GET" }),
        ]);

        const moduleResult = (await moduleResponse.json()) as MockModuleResponse;
        const attemptsResult = (await attemptsResponse.json()) as MockAttemptsResponse;

        if (!moduleResponse.ok || !moduleResult.success || !moduleResult.data) {
          setErrorMessage(moduleResult.message || "Unable to load mock test.");
          return;
        }

        setModuleId(moduleResult.data.moduleId);
        setTitle(moduleResult.data.title);
        setLevel(moduleResult.data.level);
        setReadingPassage(moduleResult.data.readingPassage);
        setReadingQuestions(moduleResult.data.readingQuestions);
        setListeningAudioUrl(moduleResult.data.listeningAudioUrl);
        setListeningContext(moduleResult.data.listeningContext);
        setListeningQuestions(moduleResult.data.listeningQuestions);
        setWritingPrompt(moduleResult.data.writingPrompt);
        setSpeakingPrompt(moduleResult.data.speakingPrompt);

        if (attemptsResponse.ok && attemptsResult.success) {
          setAttempts(attemptsResult.data?.attempts ?? []);
          const latest = attemptsResult.data?.attempts?.[0];
          setReport(latest?.report ?? null);
        }
      } catch {
        setErrorMessage("Unable to load mock test.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, []);

  const submitMockTest = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/mock-test/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          readingAnswers,
          listeningAnswers,
          writingResponse,
          speakingResponse,
        }),
      });

      const result = (await response.json()) as MockSubmitResponse;

      if (!response.ok || !result.success || !result.data) {
        setErrorMessage(result.message || "Unable to submit mock test.");
        return;
      }

      setAttempts((prev) => [result.data!.attempt, ...prev]);
      setReport(result.data.report);
    } catch {
      setErrorMessage("Unable to submit mock test.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">Full Simulation</h2>
        {isLoading ? <p className="mt-3 text-sm text-slate-600">Loading mock test...</p> : null}

        {!isLoading ? (
          <>
            <p className="mt-2 text-sm text-slate-700">
              {title} ({level})
            </p>
            <p className="mt-1 text-sm text-slate-700">Objective unanswered: {unansweredObjective}</p>
          </>
        ) : null}
      </section>

      <section className="surface-3d rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900">Reading</h3>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-800">{readingPassage}</p>

        <div className="mt-4 space-y-4">
          {readingQuestions.map((question, index) => (
            <article key={question.id} className="card-3d rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900">
                {index + 1}. {question.prompt}
              </p>
              <div className="mt-3 grid gap-2">
                {question.options.map((option, optionIndex) => {
                  const selected = readingAnswers[question.id] === optionIndex;

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
                        onChange={() =>
                          setReadingAnswers((prev) => ({
                            ...prev,
                            [question.id]: optionIndex,
                          }))
                        }
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-3d rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900">Listening</h3>
        <audio className="mt-3 w-full" controls src={listeningAudioUrl} preload="metadata" />
        <p className="mt-2 text-xs leading-6 text-slate-500">Context: {listeningContext}</p>

        <div className="mt-4 space-y-4">
          {listeningQuestions.map((question, index) => (
            <article key={question.id} className="card-3d rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900">
                {index + 1}. {question.prompt}
              </p>
              <div className="mt-3 grid gap-2">
                {question.options.map((option, optionIndex) => {
                  const selected = listeningAnswers[question.id] === optionIndex;

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
                        onChange={() =>
                          setListeningAnswers((prev) => ({
                            ...prev,
                            [question.id]: optionIndex,
                          }))
                        }
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-3d rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900">Writing</h3>
        <p className="mt-2 text-sm text-slate-700">{writingPrompt}</p>
        <textarea
          value={writingResponse}
          onChange={(event) => setWritingResponse(event.target.value)}
          placeholder="Write your essay response here..."
          className="mt-3 min-h-40 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-sky-300 transition focus:ring"
        />
      </section>

      <section className="surface-3d rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900">Speaking</h3>
        <p className="mt-2 text-sm text-slate-700">{speakingPrompt}</p>
        <textarea
          value={speakingResponse}
          onChange={(event) => setSpeakingResponse(event.target.value)}
          placeholder="Type your speaking script or transcript here..."
          className="mt-3 min-h-32 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-sky-300 transition focus:ring"
        />
      </section>

      {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}

      <section className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={isSubmitting || isLoading}
          onClick={() => void submitMockTest()}
          className="btn-3d rounded-xl px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Submit Full Mock Test"}
        </button>
      </section>

      {report ? (
        <section className="surface-3d rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900">Final Report</h2>
          <p className="mt-2 text-sm text-slate-700">Estimated level: {report.estimatedLevel}</p>
          <p className="text-sm text-slate-700">
            Overall score: {report.overallScore}/{report.overallTotal} ({report.overallPercent}%)
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {report.breakdown.map((item) => (
              <article key={item.skill} className="card-3d rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-900">{SKILL_LABEL[item.skill]}</p>
                <p className="mt-1 text-sm text-slate-700">
                  {item.score}/{item.total} ({item.percent}%)
                </p>
                {item.notes.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-600">
                    {item.notes.slice(0, 2).map((note, idx) => (
                      <li key={`${item.skill}-note-${idx}`}>{note}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-emerald-700">Strong performance in this skill.</p>
                )}
              </article>
            ))}
          </div>

          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Strengths:</span>{" "}
              {report.strengths.length > 0 ? report.strengths.join(", ") : "No strong skill yet."}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Improvement Areas:</span>{" "}
              {report.improvementAreas.length > 0
                ? report.improvementAreas.join(", ")
                : "Balanced performance across all skills."}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Recommendation:</span> {report.recommendation}
            </p>
          </div>

          {attempts.length > 0 ? (
            <article className="mt-4 card-3d rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900">Recent Mock Attempts</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {attempts.slice(0, 5).map((attempt) => (
                  <li key={attempt.id}>
                    {new Date(attempt.submittedAt).toLocaleString()} - {attempt.report.overallScore}/
                    {attempt.report.overallTotal} ({attempt.report.overallPercent}%)
                  </li>
                ))}
              </ul>
            </article>
          ) : null}
        </section>
      ) : null}

      <p className="text-xs text-slate-500">Module ID: {moduleId}</p>
    </div>
  );
}
