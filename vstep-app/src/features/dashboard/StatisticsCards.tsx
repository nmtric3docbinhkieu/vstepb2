import type { DashboardStat } from "@/types/dashboard";

type StatisticsCardsProps = {
  items: DashboardStat[];
};

export function StatisticsCards({ items }: StatisticsCardsProps) {
  return (
    <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <article
          key={item.label}
          className="card-3d lift-in rounded-2xl p-6"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <p className="text-sm text-slate-500">{item.label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
          <p className="mt-2 text-xs text-slate-600">{item.hint}</p>
        </article>
      ))}
    </section>
  );
}
