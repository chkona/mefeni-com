"use client";

import { Church } from "@/lib/data/churches";

export default function ChurchCard({
  church,
  active,
}: {
  church: Church;
  active?: boolean;
}) {
  return (
    <div
      id={`church-${church.slug}`}
      className={`rounded-lg border p-5 bg-panel transition-colors scroll-mt-24 ${
        active ? "border-goldBright shadow-[0_0_0_1px_rgba(238,205,118,0.3)]" : "border-gold/15"
      }`}
    >
      <span className="font-num text-[11px] tracking-widest uppercase text-gold">
        {church.city} · {church.region}
      </span>
      <h3 className="font-display text-xl text-goldBright mt-1">{church.name}</h3>
      <p className="font-num text-muted text-sm mt-1">{church.founded}</p>
      {church.address && (
        <p className="text-ink/70 text-xs mt-1">{church.address}</p>
      )}
      <p className="text-ink/85 text-sm mt-3 leading-relaxed">{church.description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {church.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-0.5 border border-gold/20 rounded-full text-muted"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gold/10">
        <span className="font-num text-[10px] tracking-widest uppercase text-gold">
          წყაროები
        </span>
        <p className="text-xs text-muted mt-1">{church.sources}</p>
      </div>
    </div>
  );
}


