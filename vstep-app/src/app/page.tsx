import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_55%),radial-gradient(circle_at_bottom_right,_#bbf7d0,_transparent_55%)]" />
      <main className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-lg backdrop-blur sm:p-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-sky-700">AI VSTEP PERSONAL COACH</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Authentication Module Ready
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Phase 1 is now active with login, session handling, protected dashboard route, and
          logout flow. Continue implementation strictly by roadmap phase.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Current Phase</h2>
            <p className="mt-1 text-sm text-slate-600">Phase 1 - Authentication</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Stack</h2>
            <p className="mt-1 text-sm text-slate-600">
              Next.js, TypeScript, TailwindCSS, JWT, HttpOnly Cookie, Zod
            </p>
          </article>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Go to Login
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Open Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
