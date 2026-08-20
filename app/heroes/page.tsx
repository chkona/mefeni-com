import Link from "next/link";
import { getAllHeroes } from "@/lib/data/get-heroes";
import { isEditor } from "@/lib/auth/get-profile";

export const revalidate = 0;

export default async function HeroesPage() {
  const heroes = await getAllHeroes();
  const canEdit = await isEditor();

  return (
    <main className="min-h-screen bg-void px-4 py-10 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-goldBright">გმირები</h1>
          {canEdit && (
            <Link href="/admin/heroes/new" className="rounded border border-gold/30 px-3 py-1.5 text-sm text-gold hover:bg-gold/10">
              + ახალი გმირი
            </Link>
          )}
        </div>
        {heroes.length === 0 ? (
          <p className="text-muted mt-6">გვერდი ჯერ ცარიელია — მალე დაემატება.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {heroes.map((h) => (
              <Link
                key={h.slug}
                href={`/heroes/${h.slug}`}
                className="block border border-gold/15 rounded-lg p-4 hover:border-gold/40 transition"
              >
                <h2 className="text-lg text-goldBright font-display">{h.name}</h2>
                <p className="text-sm text-muted mt-1">{h.era}</p>
                {h.summary && <p className="text-sm text-ink/80 mt-2 line-clamp-2">{h.summary}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
