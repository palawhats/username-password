"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [pending, setPending] = useState(false);
  const [githubPending, setGithubPending] = useState(false);

  // =========================
  // Email / Password Login
  // =========================
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (pending) return;

    setPending(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        setPending(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);

      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      setPending(false);
    }
  }

  // =========================
  // GitHub Login
  // =========================
  async function githubSignIn() {
    if (githubPending) return;

    setGithubPending(true);
    setError("");

    try {
      // ให้ NextAuth จัดการ OAuth Redirect เอง
      await signIn("github", {
        callbackUrl: "/admin",
      });
    } catch (error) {
      console.error("GitHub login error:", error);

      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบด้วย GitHub");
      setGithubPending(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-2xl">

        {/* Header */}
        <p className="mb-2 text-sm font-semibold text-indigo-600">
          BLOG HUB
        </p>

        <h1 className="text-3xl font-bold text-slate-900">
          เข้าสู่ระบบ
        </h1>

        {/* Register Success */}
        {params.get("registered") && (
          <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
            สร้างบัญชีสำเร็จ กรุณาเข้าสู่ระบบ
          </p>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="auth-form mt-7 space-y-4"
        >
          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-indigo-500"
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-indigo-500"
          />

          {/* Error */}
          {error && (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={pending || githubPending}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "กำลังเข้าสู่ระบบ..." : "Login"}
          </button>
        </form>

        {/* OR */}
        <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />

          <span>OR</span>

          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/* GitHub Login */}
        <button
          type="button"
          onClick={githubSignIn}
          disabled={githubPending || pending}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {/* GitHub Icon */}
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.2 4.8 18.2 5 18.2 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.4 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .7Z" />
          </svg>

          {githubPending
            ? "กำลังเชื่อมต่อ GitHub..."
            : "Continue with GitHub"}
        </button>

        {/* Signup */}
        <p className="mt-6 text-center text-sm text-slate-500">
          ยังไม่มีบัญชี?{" "}
          <Link
            href="/signup"
            className="font-semibold text-indigo-600 hover:underline"
          >
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </main>
  );
}