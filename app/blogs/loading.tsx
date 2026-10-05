export default function LoadingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 h-10 w-64 animate-pulse rounded-lg bg-white/10" />
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <div className="aspect-[16/9] animate-pulse bg-white/10" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
                <div className="h-6 w-full animate-pulse rounded bg-white/10" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
