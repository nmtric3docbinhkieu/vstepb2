import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { StudyPlanClient } from "@/features/study-plan/StudyPlanClient";
import { verifyAuthToken } from "@/lib/auth";

export default async function StudyPlanPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const payload = token ? await verifyAuthToken(token) : null;

  if (!payload) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-12 sm:px-10">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-700">PHASE 5 - STUDY PLAN</p>
          <h1 className="mt-2 font-mono text-4xl font-bold text-slate-900">90-Day Study Plan</h1>
          <p className="mt-1 text-sm text-slate-700">
            Structured roadmap for {payload.fullName} with daily tasks and progress tracking.
          </p>
        </div>
        <LogoutButton />
      </header>

      <div className="mt-6">
        <StudyPlanClient studentName={payload.fullName} />
      </div>
    </div>
  );
}
