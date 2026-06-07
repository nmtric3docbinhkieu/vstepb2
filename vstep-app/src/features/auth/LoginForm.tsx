"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginInput } from "@/schemas/auth";

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const result = (await response.json()) as {
      success: boolean;
      message: string;
      error?: string;
    };

    if (!response.ok || !result.success) {
      setServerError(result.message || "Login failed");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full rounded-xl border border-slate-300/80 bg-white/95 px-3.5 py-2.5 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_10px_rgba(13,37,74,0.06)] outline-none ring-sky-400 transition focus:ring-2"
          placeholder="you@example.com"
        />
        {errors.email ? <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p> : null}
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          className="w-full rounded-xl border border-slate-300/80 bg-white/95 px-3.5 py-2.5 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_10px_rgba(13,37,74,0.06)] outline-none ring-sky-400 transition focus:ring-2"
          placeholder="Enter your password"
        />
        {errors.password ? (
          <p className="mt-1 text-sm text-rose-600">{errors.password.message}</p>
        ) : null}
      </div>

      {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-3d w-full rounded-xl px-4 py-2.5 font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
