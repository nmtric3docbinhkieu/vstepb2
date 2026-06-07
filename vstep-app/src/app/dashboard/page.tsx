import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import { LogoutButton } from "@/features/auth/LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const payload = token ? await verifyAuthToken(token) : null;

  if (!payload) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-12 sm:px-10">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-700">AI VSTEP PERSONAL COACH</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">Welcome back, {payload.fullName}.</p>
        </div>
        <LogoutButton />
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Current Level</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">B1+</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Target</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">VSTEP B2</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Days Remaining</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">90</p>
        </article>
      </section>
    </div>
  );
}
