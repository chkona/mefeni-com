import { kings } from "@/lib/data/kings";
import { notFound } from "next/navigation";
import Image from "next/image";

export function generateStaticParams() {
  return kings.map((k) => ({ slug: k.slug }));
}

export default function KingDetailPage({ params }: { params: { slug: string } }) {
  const king = kings.find((k) => k.slug === params.slug);
  if (!king) return notFound();

  return (
    <article>
      {king.image && (
        <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
          <Image
            src={king.image}
            alt={king.name}
            fill
            priority
            className="object-cover object-top"
          />
          {/* ქვედა გრადიენტი, რომ სურათი ბუნებრივად გადავიდეს ბნელ ფონში */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* სათაური სურათზე, ქვედა კიდეში */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-3xl mx-auto">
            <span className="font-num text-xs tracking-widest uppercase text-gold">
              {king.dynasty} დინასტია
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-goldBright mt-2 drop-shadow-lg">
              {king.name}
            </h1>
            <p className="font-num text-muted mt-2">{king.reign}</p>
          </div>
        </div>
      )}

      <section className="max-w-3xl mx-auto px-6 py-16">
        {/* თუ სურათი არ არსებობს, სათაური აქ ჩნდება */}
        {!king.image && (
          <>
            <span className="font-num text-xs tracking-widest uppercase text-gold">
              {king.dynasty} დინასტია
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-goldBright mt-3">
              {king.name}
            </h1>
            <p className="font-num text-muted mt-2">{king.reign}</p>
          </>
        )}

        <p className="mt-8 leading-relaxed text-ink/90 whitespace-pre-line">{king.bio}</p>
        <div className="flex flex-wrap gap-2 mt-8">
          {king.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 border border-gold/20 rounded-full text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </article>
  );
}
