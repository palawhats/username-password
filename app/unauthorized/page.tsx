import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        <div className="text-6xl">🚫</div>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">ไม่มีสิทธิ์เข้าถึง</h1>
        <p className="mt-3 text-slate-500">บัญชีของคุณไม่มีสิทธิ์สำหรับหน้านี้</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-white">หน้าแรก</Link>
          <Link href="/students" className="rounded-xl border border-slate-300 px-5 py-2.5 text-slate-700">Students</Link>
        </div>
      </div>
    </main>
  );
}
