import { LoginForm } from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute left-0 top-8 h-48 w-48 rounded-full bg-cyan-200/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-8 h-48 w-48 rounded-full bg-blue-200/45 blur-3xl" />

      <div className="surface-3d lift-in w-full max-w-md rounded-3xl p-8">
        <p className="text-xs font-semibold tracking-[0.22em] text-sky-700">PHASE 1 - AUTH</p>
        <h1 className="mt-2 font-mono text-3xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-700">
          Login for your personal VSTEP B2 coaching workspace.
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
