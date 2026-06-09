import type { DailyTask } from "@/types/dashboard";

type TodaysTasksProps = {
  items: DailyTask[];
};

export function TodaysTasks({ items }: TodaysTasksProps) {
  const completedCount = items.filter((item) => item.completed).length;

  return (
    <section className="surface-3d mt-6 rounded-2xl p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900">Nhiem vu hom nay</h2>
        <p className="text-sm text-slate-700">
          {completedCount}/{items.length} hoan thanh
        </p>
      </div>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="card-3d flex items-center justify-between gap-3 rounded-xl px-4 py-3"
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-1 inline-block h-2.5 w-2.5 rounded-full ${
                  item.completed ? "bg-emerald-500" : "bg-sky-500"
                }`}
              />
              <div>
                <p className="text-sm font-medium text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-600">{item.estimatedMinutes} minutes</p>
              </div>
            </div>

            <span
              className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                item.completed
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-sky-100 text-sky-700"
              }`}
            >
              {item.completed ? "Xong" : "Dang hoc"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
