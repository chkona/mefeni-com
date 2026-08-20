import Link from "next/link";
import { getPublishedWorks } from "@/lib/data/get-works";
import { isEditor } from "@/lib/auth/get-profile";

export const revalidate = 0;

export default async function WorksPage() {
  const works = await getPublishedWorks();
  const canEdit = await isEditor();

  return (
    <main className="min-h-screen bg-void px-4 py-10 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-goldBright">ნაშრომები</h1>
          {canEdit && (
            <Link href="/admin/works/new" className="rounded border border-gold/30 px-3 py-1.5 text-sm text-gold hover:bg-gold/10">
              + ახალი ნაშრომი
            </Link>
          )}
        </div>
        {works.length === 0 ? (
          <p className="text-muted mt-6">ჯერ არაფერი გამოქვეყნებულა.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {works.map((w) => (
              <Link
                key={w.slug}
                href={`/works/${w.slug}`}
                className="block border border-gold/15 rounded-lg p-4 hover:border-gold/40 transition"
              >
                <span className="text-xs text-gold uppercase tracking-wide">{w.category}</span>
                <h2 className="text-lg text-goldBright font-display mt-1">{w.title}</h2>
                <p className="text-sm text-muted mt-1">{w.author}</p>
                {w.summary && <p className="text-sm text-ink/80 mt-2 line-clamp-2">{w.summary}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
