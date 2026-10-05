import Link from "next/link";
import { auth, signOut } from "@/app/auth";

export default async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-black tracking-tight">BLOG HUB</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/blogs" className="text-slate-300 hover:text-white">Blogs</Link>
          <Link href="/students" className="text-slate-300 hover:text-white">Students</Link>
          {session?.user ? (
            <>
              {session.user.role === "ADMIN" && <Link href="/admin" className="text-indigo-300 hover:text-indigo-200">Admin</Link>}
              <span className="hidden text-slate-400 sm:inline">{session.user.name ?? session.user.email}</span>
              <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
                <button className="rounded-lg border border-white/15 px-3 py-1.5 hover:bg-white/10">ออกจากระบบ</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-lg border border-white/15 px-3 py-1.5 hover:bg-white/10">Login</Link>
              <Link href="/signup" className="rounded-lg bg-indigo-600 px-3 py-1.5 font-semibold hover:bg-indigo-500">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
