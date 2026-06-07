import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16 sm:px-10">
      <div className="pointer-events-none absolute -left-20 top-6 h-64 w-64 rounded-full bg-sky-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-emerald-200/45 blur-3xl" />
      <main className="surface-3d lift-in relative w-full max-w-5xl rounded-3xl p-8 sm:p-11">
        <p className="text-sm font-semibold tracking-[0.24em] text-sky-700">AI VSTEP PERSONAL COACH</p>
        <h1 className="mt-3 font-mono text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Authentication Module Ready
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
          Phase 1 is now active with login, session handling, protected dashboard route, and
          logout flow. Continue implementation strictly by roadmap phase.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="card-3d rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Current Phase</h2>
            <p className="mt-1 text-sm text-slate-700">Phase 1 - Authentication</p>
          </article>
          <article className="card-3d rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Stack</h2>
            <p className="mt-1 text-sm text-slate-700">
              Next.js, TypeScript, TailwindCSS, JWT, HttpOnly Cookie, Zod
            </p>
          </article>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="btn-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Go to Login
          </Link>
          <Link
            href="/dashboard"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Open Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
