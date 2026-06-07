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
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-12 sm:px-10">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-700">AI VSTEP PERSONAL COACH</p>
          <h1 className="mt-2 font-mono text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-700">Welcome back, {payload.fullName}.</p>
        </div>
        <LogoutButton />
      </header>

      <section className="mt-8 grid gap-5 sm:grid-cols-3">
        <article className="card-3d lift-in rounded-2xl p-6">
          <p className="text-sm text-slate-500">Current Level</p>
          <p className="mt-1 text-3xl font-semibold text-slate-900">B1+</p>
        </article>
        <article className="card-3d lift-in rounded-2xl p-6 [animation-delay:90ms]">
          <p className="text-sm text-slate-500">Target</p>
          <p className="mt-1 text-3xl font-semibold text-slate-900">VSTEP B2</p>
        </article>
        <article className="card-3d lift-in rounded-2xl p-6 [animation-delay:180ms]">
          <p className="text-sm text-slate-500">Days Remaining</p>
          <p className="mt-1 text-3xl font-semibold text-slate-900">90</p>
        </article>
      </section>

      <section className="surface-3d mt-6 rounded-2xl p-6">
        <p className="text-sm font-semibold text-slate-700">Today Focus</p>
        <p className="mt-2 text-slate-800">
          Review one grammar topic, write a 150-word paragraph, and finish one short reading task.
        </p>
      </section>
    </div>
  );
}
