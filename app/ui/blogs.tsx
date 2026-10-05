import Link from "next/link";

interface Blog {
  id: string;
  title: string;
}

const coverImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
];

function getCoverImage(index: number) {
  return coverImages[index % coverImages.length];
}

export default async function Blogs() {
  const res = await fetch("https://api.vercel.app/blog", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("ไม่สามารถโหลดบทความได้");
  }

  const blogs: Blog[] = await res.json();

  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog, index) => (
        <article
          className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07] hover:shadow-cyan-950/20"
          key={blog.id}
        >
          <Link href={`/blogs/${blog.id}`} className="block h-full">
            <div
              className="relative aspect-[16/9] overflow-hidden bg-slate-800 bg-cover bg-center"
              style={{ backgroundImage: `url(${getCoverImage(index)})` }}
              role="img"
              aria-label={`ภาพประกอบบทความ ${blog.title}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                ARTICLE #{index + 1}
              </div>
            </div>

            <div className="p-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-cyan-300">
                Technology &amp; Ideas
              </p>
              <h3 className="line-clamp-2 text-xl font-semibold leading-7 text-white transition group-hover:text-cyan-200">
                {blog.title}
              </h3>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                <span className="text-slate-500">ID: {blog.id}</span>
                <span className="font-medium text-cyan-300 transition group-hover:translate-x-1">
                  อ่านต่อ →
                </span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
