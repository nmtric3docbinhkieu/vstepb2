import Link from "next/link";

export default function GuidePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-12 sm:px-10">
      <header>
        <p className="text-xs font-semibold tracking-[0.22em] text-sky-700">AI VSTEP PERSONAL COACH</p>
        <h1 className="mt-2 font-mono text-4xl font-bold text-slate-900">Huong dan su dung website hoc VSTEP</h1>
        <p className="mt-2 text-sm text-slate-700">
          Muc tieu: vao web la biet hoc gi ngay, hoc theo thu tu nao, va do tien bo bang cach nao.
        </p>
      </header>

      <section className="surface-3d mt-6 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900">Lo trinh de dung nhat</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Placement Test: lam 1 lan dau tien de xac dinh trinh do.</li>
          <li>Study Plan: lay nhiem vu hoc moi ngay.</li>
          <li>Reading + Listening: luyen 2 ky nang tiep nhan thong tin.</li>
          <li>Writing + Speaking: luyen 2 ky nang san sinh ngon ngu.</li>
          <li>Vocabulary: on tu moi cuoi buoi hoc.</li>
          <li>Mock Test: lam 1 lan moi 7 ngay de do tien bo.</li>
        </ol>
      </section>

      <section className="surface-3d mt-6 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900">Y nghia tung module</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>AI Tutor: hoi ngu phap, tu vung, va xin y tuong cho bai noi/bai viet.</li>
          <li>Reading Trainer: doc doan van, tra loi cau hoi, xem giai thich cau sai.</li>
          <li>Listening Trainer: nghe audio, lam cau hoi, xem diem va phan hoi.</li>
          <li>Writing Trainer: viet bai theo de, nhan nhan xet va sua lai.</li>
          <li>Speaking Trainer: luyen noi theo de, xem danh gia de cai thien.</li>
          <li>Vocabulary Trainer: hoc flashcard va on lai theo lich.</li>
          <li>Mock Test: thi thu du 4 ky nang va xem final report.</li>
        </ul>
      </section>

      <section className="surface-3d mt-6 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900">Ke hoach 90 phut moi ngay</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>10 phut: mo Study Plan + chon muc tieu trong ngay.</li>
          <li>25 phut: Reading hoac Listening.</li>
          <li>25 phut: Writing hoac Speaking.</li>
          <li>15 phut: Vocabulary review.</li>
          <li>15 phut: hoi AI Tutor nhung cho ban dang yeu.</li>
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/dashboard" className="btn-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-white">
          Ve Dashboard
        </Link>
        <Link
          href="/vstep-library"
          className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700"
        >
          Thu vien de gan day
        </Link>
        <Link href="/study-plan" className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700">
          Mo Study Plan
        </Link>
        <Link href="/mock-test" className="btn-ghost-3d rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700">
          Mo Mock Test
        </Link>
      </div>
    </div>
  );
}
