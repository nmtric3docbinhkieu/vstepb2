"use client";

import { useMemo, useState } from "react";

import { evaluatePlacementTest } from "@/services/placement-test/evaluate-placement-test";
import { PLACEMENT_QUESTIONS } from "@/services/placement-test/question-bank";
import type { PlacementAnswerMap, PlacementSection } from "@/types/placement-test";

const SECTION_TITLES: Record<PlacementSection, string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  reading: "Reading",
};

export function PlacementTestClient() {
  const [answers, setAnswers] = useState<PlacementAnswerMap>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const report = useMemo(() => {
    if (!isSubmitted) {
      return null;
    }

    return evaluatePlacementTest(PLACEMENT_QUESTIONS, answers);
  }, [answers, isSubmitted]);

  const unansweredCount = PLACEMENT_QUESTIONS.filter((q) => answers[q.id] === undefined).length;

  const setAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-6">
      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">Placement Test</h2>
        <p className="mt-1 text-sm text-slate-700">
          Complete vocabulary, grammar, and reading sections to generate your level report.
        </p>

        <div className="mt-4 text-sm text-slate-700">
          <p>Total questions: {PLACEMENT_QUESTIONS.length}</p>
          <p>Unanswered: {unansweredCount}</p>
        </div>
      </section>

      {(["vocabulary", "grammar", "reading"] as PlacementSection[]).map((section) => {
        const sectionQuestions = PLACEMENT_QUESTIONS.filter((q) => q.section === section);

        return (
          <section key={section} className="surface-3d rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-900">{SECTION_TITLES[section]}</h3>

            <div className="mt-4 space-y-5">
              {sectionQuestions.map((question, index) => (
                <article key={question.id} className="card-3d rounded-xl p-4">
                  <p className="text-sm font-medium text-slate-900">
                    {index + 1}. {question.prompt}
                  </p>

                  <div className="mt-3 grid gap-2">
                    {question.options.map((option, optionIndex) => {
                      const selected = answers[question.id] === optionIndex;

                      return (
                        <label
                          key={`${question.id}-${option}`}
                          className={`rounded-lg border px-3 py-2 text-sm transition ${
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
                            onChange={() => setAnswer(question.id, optionIndex)}
                          />
                          {option}
                        </label>
                      );
                    })}
                  </div>

                  {isSubmitted ? (
                    <p className="mt-3 text-xs text-slate-600">Tip: {question.explanation}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-3d rounded-xl px-4 py-2 text-sm font-semibold text-white"
        >
          Generate Assessment Report
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Reset Test
        </button>
      </section>

      {report ? (
        <section className="surface-3d rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-900">Assessment Report</h3>
          <p className="mt-2 text-sm text-slate-700">Estimated level: {report.estimatedLevel}</p>
          <p className="text-sm text-slate-700">
            Score: {report.totalCorrect}/{report.totalQuestions} ({report.overallPercent}%)
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {report.breakdown.map((item) => (
              <article key={item.section} className="card-3d rounded-xl p-4">
                <p className="text-sm font-medium text-slate-900">{SECTION_TITLES[item.section]}</p>
                <p className="mt-1 text-sm text-slate-700">
                  {item.correct}/{item.total} correct ({item.percent}%)
                </p>
              </article>
            ))}
          </div>

          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Strengths:</span>{" "}
              {report.strengths.length > 0 ? report.strengths.join(", ") : "No strong section yet."}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Improvement Areas:</span>{" "}
              {report.improvementAreas.length > 0
                ? report.improvementAreas.join(", ")
                : "Balanced performance across sections."}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Recommendation:</span>{" "}
              {report.recommendation}
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
