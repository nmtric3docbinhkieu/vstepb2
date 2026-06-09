import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { LearningProgress } from "@/features/dashboard/LearningProgress";
import { StatisticsCards } from "@/features/dashboard/StatisticsCards";
import { TodaysTasks } from "@/features/dashboard/TodaysTasks";
import { verifyAuthToken } from "@/lib/auth";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { getDashboardData } from "@/services/dashboard/get-dashboard-data";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const payload = token ? await verifyAuthToken(token) : null;

  if (!payload) {
    redirect("/login");
  }

  const dashboardData = getDashboardData({ fullName: payload.fullName });

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-12 sm:px-10">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-700">AI VSTEP PERSONAL COACH</p>
          <h1 className="mt-2 font-mono text-4xl font-bold text-slate-900">Bang dieu khien hoc tap</h1>
          <p className="mt-1 text-sm text-slate-700">Chao mung tro lai, {payload.fullName}.</p>
          <p className="mt-1 text-xs text-slate-600">{dashboardData.predictedScore}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/vstep-library"
            className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Thu vien de
          </Link>
          <Link
            href="/mock-test"
            className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Mock Test
          </Link>
          <Link
            href="/listening"
            className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Listening
          </Link>
          <Link
            href="/reading"
            className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Reading
          </Link>
          <Link
            href="/vocabulary"
            className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Vocabulary
          </Link>
          <Link
            href="/speaking"
            className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Speaking
          </Link>
          <Link
            href="/writing"
            className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Writing
          </Link>
          <Link
            href="/study-plan"
            className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Study Plan
          </Link>
          <Link
            href="/placement-test"
            className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Placement Test
          </Link>
          <Link
            href="/tutor"
            className="btn-3d rounded-xl px-4 py-2 text-sm font-semibold text-white"
          >
            AI Tutor
          </Link>
          <LogoutButton />
        </div>
      </header>

      <section className="surface-3d mt-6 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900">Bat dau hoc ngay</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Lam Placement Test de xac dinh trinh do.</li>
          <li>Hoc theo Study Plan va hoan thanh nhiem vu trong ngay.</li>
          <li>Luyen Reading, Listening, Writing, Speaking moi ngay.</li>
          <li>Lam Mock Test moi 7 ngay de do tien bo.</li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/guide"
            className="btn-3d rounded-xl px-4 py-2 text-sm font-semibold text-white"
          >
            Xem huong dan day du
          </Link>
          <Link
            href="/study-plan"
            className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Mo Study Plan
          </Link>
        </div>
      </section>

      <StatisticsCards items={dashboardData.stats} />
      <LearningProgress items={dashboardData.progress} />
      <TodaysTasks items={dashboardData.todaysTasks} />
    </div>
  );
}
