"use client";

import { useMemo, useState } from "react";

import { generateStudyPlan } from "@/services/study-plan/generate-study-plan";

type StudyPlanClientProps = {
  studentName: string;
};

export function StudyPlanClient({ studentName }: StudyPlanClientProps) {
  const plan = useMemo(() => generateStudyPlan(new Date()), []);
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({});

  const totalTaskCount = plan.days.reduce((sum, day) => sum + day.tasks.length, 0);
  const completedCount = Object.values(completedTaskIds).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTaskCount) * 100);

  const upcomingDays = plan.days.slice(0, 7);

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <div className="space-y-6">
      <section className="surface-3d rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-900">90-Day Plan Overview</h2>
        <p className="mt-1 text-sm text-slate-700">
          Personalized schedule for {studentName} from {plan.startDateLabel} to {plan.endDateLabel}.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <article className="card-3d rounded-xl p-4">
            <p className="text-xs text-slate-500">Duration</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{plan.durationDays} days</p>
          </article>
          <article className="card-3d rounded-xl p-4">
            <p className="text-xs text-slate-500">Completed Tasks</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{completedCount}</p>
          </article>
          <article className="card-3d rounded-xl p-4">
            <p className="text-xs text-slate-500">Progress</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{progressPercent}%</p>
          </article>
        </div>

        <div className="mt-4 h-2.5 w-full rounded-full bg-slate-200/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </section>

      <section className="surface-3d rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900">Daily Tasks (Next 7 Days)</h3>
        <div className="mt-4 space-y-4">
          {upcomingDays.map((day) => (
            <article key={day.dayNumber} className="card-3d rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900">
                Day {day.dayNumber} - {day.dateLabel}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-sky-700">Focus: {day.focus}</p>

              <div className="mt-3 space-y-2">
                {day.tasks.map((task) => {
                  const checked = Boolean(completedTaskIds[task.id]);

                  return (
                    <label
                      key={task.id}
                      className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <span className="text-sm text-slate-800">
                        {task.title}
                        <span className="ml-2 text-xs text-slate-500">({task.estimatedMinutes} min)</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
