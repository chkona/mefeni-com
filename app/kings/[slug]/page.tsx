import { kings } from "@/lib/data/kings";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return kings.map((k) => ({ slug: k.slug }));
}

export default function KingDetailPage({ params }: { params: { slug: string } }) {
  const king = kings.find((k) => k.slug === params.slug);
  if (!king) return notFound();

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <span className="font-num text-xs tracking-widest uppercase text-gold">{king.dynasty} დინასტია</span>
      <h1 className="font-display text-4xl md:text-5xl text-goldBright mt-3">{king.name}</h1>
      <p className="font-num text-muted mt-2">{king.reign}</p>
      <p className="mt-8 leading-relaxed text-ink/90">{king.bio}</p>
      <div className="flex flex-wrap gap-2 mt-8">
        {king.tags.map((t) => (
          <span key={t} className="text-xs px-3 py-1 border border-gold/20 rounded-full text-muted">
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
