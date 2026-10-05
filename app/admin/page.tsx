import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/unauthorized");

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
        <p className="text-sm font-semibold text-indigo-300">ADMIN AREA</p>
        <h1 className="mt-2 text-4xl font-bold">Admin Dashboard</h1>
        <p className="mt-3 text-slate-300">หน้านี้สำหรับ ADMIN เท่านั้น</p>
      </div>
    </main>
  );
}
