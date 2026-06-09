import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16 sm:px-10">
      <div className="pointer-events-none absolute -left-20 top-6 h-64 w-64 rounded-full bg-sky-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-emerald-200/45 blur-3xl" />
      <main className="surface-3d lift-in relative w-full max-w-5xl rounded-3xl p-8 sm:p-11">
        <p className="text-sm font-semibold tracking-[0.24em] text-sky-700">AI VSTEP PERSONAL COACH</p>
        <h1 className="mt-3 font-mono text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Website hoc VSTEP B2 ca nhan
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
          Nen tang nay giup ban hoc theo lo trinh ro rang: On tap - Luyen 4 ky nang - Thi thu.
          Neu ban moi bat dau, hay mo Huong dan su dung de di dung thu tu va tranh hoc lan man.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="card-3d rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Buoc 1</h2>
            <p className="mt-1 text-sm text-slate-700">Placement Test de xac dinh muc hien tai</p>
          </article>
          <article className="card-3d rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Buoc 2</h2>
            <p className="mt-1 text-sm text-slate-700">Hoc hang ngay voi Reading, Listening, Writing, Speaking</p>
          </article>
          <article className="card-3d rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">Buoc 3</h2>
            <p className="mt-1 text-sm text-slate-700">Lam Mock Test moi tuan de do tien bo va dieu chinh</p>
          </article>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/guide"
            className="btn-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Huong dan su dung
          </Link>
          <Link
            href="/login"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Dang nhap
          </Link>
          <Link
            href="/dashboard"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Dashboard
          </Link>
          <Link
            href="/tutor"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo AI Tutor
          </Link>
          <Link
            href="/placement-test"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Placement Test
          </Link>
          <Link
            href="/study-plan"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Study Plan
          </Link>
          <Link
            href="/writing"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Writing Trainer
          </Link>
          <Link
            href="/speaking"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Speaking Trainer
          </Link>
          <Link
            href="/vocabulary"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Vocabulary Trainer
          </Link>
          <Link
            href="/reading"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Reading Trainer
          </Link>
          <Link
            href="/listening"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Listening Trainer
          </Link>
          <Link
            href="/mock-test"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Mo Mock Test
          </Link>
          <Link
            href="/vstep-library"
            className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
          >
            Thu vien de gan day
          </Link>
        </div>
      </main>
    </div>
  );
}
