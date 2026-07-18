import { historicalMaps } from "@/lib/data/maps";

export default function MapsPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <span className="font-num text-xs tracking-widest uppercase text-gold">
          ტერიტორიული ცვლილებები
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-goldBright mt-2">
          საქართველოს ისტორიული რუკები
        </h1>
        <p className="text-muted mt-4 max-w-xl mx-auto">
          საქართველოს ტერიტორიისა და სახელმწიფოებრიობის ცვლილება ანტიკურობიდან
          დღემდე.
        </p>
      </div>

      <div className="grid gap-5">
        {historicalMaps.map((m) => (
          <div
            key={m.slug}
            className="rounded-lg border border-gold/15 bg-panel p-6"
          >
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
              <h2 className="font-display text-xl text-goldBright">{m.era}</h2>
              <span className="font-num text-xs text-gold">{m.period}</span>
            </div>
            <p className="text-ink/85 text-sm mb-2">{m.description}</p>
            <p className="text-muted text-xs">
              <span className="text-gold">ტერიტორია: </span>
              {m.extent}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

