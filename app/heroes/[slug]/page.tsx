import { getHeroBySlug } from "@/lib/data/get-heroes";
import { isEditor } from "@/lib/auth/get-profile";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function HeroDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hero = await getHeroBySlug(slug);
  if (!hero) return notFound();
  const canEdit = await isEditor();

  return (
    <article>
      {hero.image && (
        <div className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden">
          <Image src={hero.image} alt={hero.name} fill priority className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-3xl mx-auto">
            <span className="font-num text-xs tracking-widest uppercase text-gold">{hero.era}</span>
            <h1 className="font-display text-4xl md:text-6xl text-goldBright mt-2 drop-shadow-lg">{hero.name}</h1>
          </div>
        </div>
      )}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-start justify-between gap-4">
          <div>
            {!hero.image && (
              <>
                <span className="font-num text-xs tracking-widest uppercase text-gold">{hero.era}</span>
                <h1 className="font-display text-4xl md:text-5xl text-goldBright mt-3">{hero.name}</h1>
              </>
            )}
          </div>
          {canEdit && (
            <Link href={`/admin/heroes/${hero.slug}/edit`} className="shrink-0 rounded border border-gold/30 px-3 py-1.5 text-sm text-gold hover:bg-gold/10">
              რედაქტირება
            </Link>
          )}
        </div>

        {hero.bio_sections && hero.bio_sections.length > 0 ? (
          <div className="mt-8 space-y-6">
            {hero.bio_sections.map((sec, i) => (
              <div key={i}>
                <h2 className="font-display text-xl text-goldBright border-b border-gold/15 pb-2 mb-3">{sec.heading}</h2>
                <p className="leading-relaxed text-ink/90 whitespace-pre-line">{sec.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 leading-relaxed text-ink/90 whitespace-pre-line">{hero.bio}</p>
        )}

        <div className="mt-10 pt-6 border-t border-gold/20">
          <h2 className="font-num text-xs tracking-widest uppercase text-gold">წყაროები</h2>
          <p className="mt-2 text-sm text-muted whitespace-pre-line">
            {hero.sources && hero.sources.trim() !== "" ? hero.sources : "წყარო მალე დაემატება."}
          </p>
        </div>
      </section>
    </article>
  );
}
