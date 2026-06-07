import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { LogoutButton } from "@/features/auth/LogoutButton";
import { WritingTrainerClient } from "@/features/writing/WritingTrainerClient";
import { verifyAuthToken } from "@/lib/auth";

export default async function WritingPage() {
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
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-700">PHASE 6 - WRITING TRAINER</p>
          <h1 className="mt-2 font-mono text-4xl font-bold text-slate-900">Writing Evaluation</h1>
          <p className="mt-1 text-sm text-slate-700">
            Submit your essay and receive scoring, feedback, and a sample model answer.
          </p>
        </div>
        <LogoutButton />
      </header>

      <div className="mt-6">
        <WritingTrainerClient />
      </div>
    </div>
  );
}
