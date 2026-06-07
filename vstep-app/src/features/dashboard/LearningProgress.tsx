import type { LearningProgressItem } from "@/types/dashboard";

type LearningProgressProps = {
  items: LearningProgressItem[];
};

export function LearningProgress({ items }: LearningProgressProps) {
  return (
    <section className="surface-3d mt-6 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-slate-900">Learning Progress</h2>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.skill}>
            <div className="mb-1 flex items-center justify-between text-sm text-slate-700">
              <span>{item.skill}</span>
              <span>{item.completedPercent}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                style={{ width: `${item.completedPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
