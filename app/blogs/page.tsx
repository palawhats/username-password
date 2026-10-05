import { Suspense } from "react";
import Blogs from "@/app/ui/blogs";
import { BlogListSkeleton } from "../ui/my-skeleton";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Tech &amp; Digital Stories
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            เรื่องราวดี ๆ สำหรับคนที่ชอบ
            <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              เทคโนโลยีและไอเดียใหม่ ๆ
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            รวมบทความและข่าวสารที่น่าสนใจ อ่านง่าย พร้อมภาพประกอบในรูปแบบที่สบายตา
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Latest articles
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">บทความล่าสุด</h2>
          </div>
          <p className="text-sm text-slate-400">อัปเดตจาก API แบบเรียลไทม์</p>
        </div>

        <Suspense fallback={<BlogListSkeleton />}>
          <Blogs />
        </Suspense>
      </section>
    </main>
  );
}
