export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_55%),radial-gradient(circle_at_bottom_right,_#bbf7d0,_transparent_55%)]" />
      <main className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-lg backdrop-blur sm:p-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-sky-700">AI VSTEP PERSONAL COACH</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Project Foundation Ready
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          This workspace is prepared for Phase 0 and aligned with the product documents.
          Next milestones include authentication, dashboard, and AI tutor modules according to
          the locked roadmap.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Current Phase</h2>
            <p className="mt-1 text-sm text-slate-600">Phase 0 - Project Foundation</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Stack</h2>
            <p className="mt-1 text-sm text-slate-600">
              Next.js, TypeScript, TailwindCSS, ESLint, Prettier, Husky
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
