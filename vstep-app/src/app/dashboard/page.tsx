import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
          <h1 className="mt-2 font-mono text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-700">Welcome back, {payload.fullName}.</p>
          <p className="mt-1 text-xs text-slate-600">{dashboardData.predictedScore}</p>
        </div>
        <LogoutButton />
      </header>

      <StatisticsCards items={dashboardData.stats} />
      <LearningProgress items={dashboardData.progress} />
      <TodaysTasks items={dashboardData.todaysTasks} />
    </div>
  );
}
