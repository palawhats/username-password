"use client";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp, type SignUpState } from "@/app/signup/actions";
const initialState: SignUpState = {};
export default function SignUpPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(signUp, initialState);
  useEffect(() => { if (state.success) router.push("/login?registered=1"); }, [state.success, router]);
  return <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-2xl"><p className="mb-2 text-sm font-semibold text-indigo-600">BLOG HUB</p><h1 className="text-3xl font-bold text-slate-900">สร้างบัญชี</h1><p className="mt-2 text-sm text-slate-500">สมัครสมาชิกเพื่อเข้าใช้งานระบบ</p><form action={formAction} className="auth-form mt-7 space-y-4"><input name="name" placeholder="ชื่อ" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-indigo-500" /><input name="email" type="email" placeholder="Email" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-indigo-500" /><input name="password" type="password" minLength={6} placeholder="Password อย่างน้อย 6 ตัว" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-indigo-500" /><input name="confirmPassword" type="password" minLength={6} placeholder="ยืนยัน Password" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-indigo-500" />{state.error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{state.error}</p>}<button disabled={pending} className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">{pending ? "กำลังสร้างบัญชี..." : "สร้างบัญชี"}</button></form><p className="mt-6 text-center text-sm text-slate-500">มีบัญชีแล้ว? <Link href="/login" className="font-semibold text-indigo-600 hover:underline">เข้าสู่ระบบ</Link></p></div></main>;
}
