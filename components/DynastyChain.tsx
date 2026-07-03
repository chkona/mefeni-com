"use client";

import Link from "next/link";
import {
  kings,
  King,
  EraKey,
  ERA_LABELS,
  TRUNK_ERAS,
  BRANCH_ERAS,
  getKingsByEra,
} from "@/lib/data/kings";

function KingNode({ king }: { king: King }) {
  return (
    <Link
      key={king.slug}
      href={`/kings/${king.slug}`}
      className="relative group flex items-center gap-3 py-2"
    >
      <span className="absolute -left-[27px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-neutral-950 group-hover:bg-amber-300 transition-colors" />
      <span className="w-11 h-11 shrink-0 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs text-neutral-400">
        {king.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={king.image}
            alt={king.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{king.ordinal || "?"}</span>
        )}
      </span>
      <span className="min-w-0">
        <span className="block font-medium text-neutral-100 truncate group-hover:text-amber-400 transition-colors">
          {king.name}
        </span>
        {king.reign && (
          <span className="block text-xs text-neutral-500">{king.reign}</span>
        )}
      </span>
    </Link>
  );
}

function EraColumn({ era }: { era: EraKey }) {
  const items = getKingsByEra(era);
  if (items.length === 0) return null;
  return (
    <div className="min-w-[220px]">
      <h3 className="text-sm font-semibold text-amber-500 mb-3 sticky top-0 bg-neutral-950/90 backdrop-blur py-1">
        {ERA_LABELS[era]}
      </h3>
      <div className="relative pl-8">
        <div className="absolute left-[7px] top-0 bottom-0 w-px bg-neutral-700" />
        <div className="flex flex-col">
          {items.map((k) => (
            <KingNode key={k.slug} king={k} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DynastyChain() {
  return (
    <div className="text-neutral-200">
      {/* Trunk: linear succession from antiquity to unified Georgia */}
      <div className="mb-10">
        {TRUNK_ERAS.map((era) => (
          <EraColumn key={era} era={era} />
        ))}
      </div>

      {/* Branch point marker */}
      <div className="relative mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-neutral-700" />
        <span className="text-xs uppercase tracking-wide text-neutral-500">
          1466 — გაყოფა სამეფოებად
        </span>
        <div className="h-px flex-1 bg-neutral-700" />
      </div>

      {/* Branches: parallel kingdoms after the split */}
      <div className="flex flex-wrap gap-x-10 gap-y-8">
        {BRANCH_ERAS.map((era) => (
          <EraColumn key={era} era={era} />
        ))}
      </div>
    </div>
  );
}
