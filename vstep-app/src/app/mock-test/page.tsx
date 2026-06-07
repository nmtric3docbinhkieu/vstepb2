import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { MockTestClient } from "@/features/mock-test/MockTestClient";
import { verifyAuthToken } from "@/lib/auth";

export default async function MockTestPage() {
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
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-700">PHASE 13 - MOCK TEST</p>
          <h1 className="mt-2 font-mono text-4xl font-bold text-slate-900">Full VSTEP Simulation</h1>
          <p className="mt-1 text-sm text-slate-700">
            Complete reading, listening, writing, and speaking in one full test.
          </p>
        </div>
        <LogoutButton />
      </header>

      <div className="mt-6">
        <MockTestClient />
      </div>
    </div>
  );
}
