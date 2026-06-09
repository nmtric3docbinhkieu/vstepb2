import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { verifyAuthToken } from "@/lib/auth";
import { PRACTICE_SETS, RECENT_EXAM_UPDATES } from "@/services/content/vstep-library";

export default async function VstepLibraryPage() {
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
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-700">VSTEP B2 CONTENT LIBRARY</p>
          <h1 className="mt-2 font-mono text-4xl font-bold text-slate-900">Thu vien noi dung sat de thi</h1>
          <p className="mt-1 text-sm text-slate-700">
            Xin chao {payload.fullName}. Day la khu noi dung tong hop tu thong tin cong khai va bo de
            luyen tap mo phong theo format VSTEP gan day.
          </p>
        </div>
        <LogoutButton />
      </header>

      <section className="surface-3d mt-6 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900">Cap nhat thong tin ky thi gan day (tham khao)</h2>
        <p className="mt-2 text-xs text-slate-600">
          Luu y: Day la thong tin tong hop muc dich hoc tap. Noi dung de luyen duoc viet moi de tranh sao
          chep nguyen van de thi co ban quyen.
        </p>

        <div className="mt-4 grid gap-3">
          {RECENT_EXAM_UPDATES.map((item) => (
            <article key={item.id} className="card-3d rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900">{item.school}</p>
              <p className="mt-1 text-sm text-slate-700">{item.title}</p>
              <p className="mt-1 text-xs text-slate-600">
                Giai doan: {item.period} | Format: {item.format}
              </p>
              <p className="mt-2 text-xs text-slate-700">Huong luyen: {item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-3d mt-6 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900">Bo bai luyen phong phu theo format VSTEP</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {PRACTICE_SETS.map((item) => (
            <article key={item.id} className="card-3d rounded-xl p-4">
              <p className="text-xs font-semibold tracking-[0.16em] text-sky-700">{item.skill}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-xs text-slate-600">Muc do: {item.level}</p>
              <p className="mt-2 text-xs text-slate-700">Trong tam: {item.focus}</p>
              <p className="mt-1 text-xs text-slate-700">Nhiem vu: {item.task}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-3d mt-6 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-slate-900">Hoc nhu thi that</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/reading" className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700">
            Luyen Reading
          </Link>
          <Link href="/listening" className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700">
            Luyen Listening
          </Link>
          <Link href="/writing" className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700">
            Luyen Writing
          </Link>
          <Link href="/speaking" className="btn-ghost-3d rounded-xl px-4 py-2 text-sm font-semibold text-slate-700">
            Luyen Speaking
          </Link>
          <Link href="/mock-test" className="btn-3d rounded-xl px-4 py-2 text-sm font-semibold text-white">
            Lam Mock Test
          </Link>
        </div>
      </section>
    </div>
  );
}