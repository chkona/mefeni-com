"use client";

import { useState } from "react";
import Link from "next/link";
import {
  King,
  EraKey,
  ERA_LABELS,
  TRUNK_ERAS,
  BRANCH_ERAS,
  TAIL_ERAS,
  getKingsByEra,
} from "@/lib/data/kings";

function KingNode({
  king,
  showDot,
  compact,
}: {
  king: King;
  showDot: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/kings/${king.slug}`}
      className="relative group flex items-center gap-2.5 py-2 shrink-0"
    >
      {showDot && (
        <span className="absolute -left-[27px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-neutral-950 group-hover:bg-amber-300 transition-colors" />
      )}
      <span
        className={`shrink-0 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 ${
          compact ? "w-8 h-8 text-[10px]" : "w-11 h-11 text-xs"
        }`}
      >
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
        <span
          className={`block font-medium text-neutral-100 whitespace-nowrap group-hover:text-amber-400 transition-colors ${
            compact ? "text-sm" : ""
          }`}
        >
          {king.name}
        </span>
        {king.reign && !compact && (
          <span className="block text-xs text-neutral-500">{king.reign}</span>
        )}
      </span>
    </Link>
  );
}

function AndMark() {
  return (
    <span className="font-serif italic text-amber-500/80 text-sm mx-2.5 select-none shrink-0">
      და
    </span>
  );
}

function groupByOrder(items: King[]) {
  const map = new Map<number, King[]>();
  items.forEach((k) => {
    if (!map.has(k.order)) map.set(k.order, []);
    map.get(k.order)!.push(k);
  });
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([order, kings]) => ({ order, kings }));
}

function EraColumn({ era }: { era: EraKey }) {
  const items = getKingsByEra(era);
  if (items.length === 0) return null;
  const rows = groupByOrder(items);

  return (
    <div className="min-w-[220px]">
      <h3 className="text-sm font-semibold text-amber-500 mb-3 sticky top-0 bg-neutral-950/90 backdrop-blur py-1">
        {ERA_LABELS[era]}
      </h3>
      <div className="relative pl-8">
        <div className="absolute left-[7px] top-0 bottom-0 w-px bg-neutral-700" />
        <div className="flex flex-col gap-1">
          {rows.map(({ order, kings }) => {
            const isPair = kings.length > 1;
            return (
              <div key={order} className="relative flex items-center">
                <span className="absolute -left-[27px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-neutral-950" />
                <div
                  className={
                    isPair
                      ? "flex items-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mr-4 pr-4"
                      : "flex items-center"
                  }
                >
                  {kings.map((k, i) => (
                    <div key={k.slug} className="flex items-center shrink-0">
                      {i > 0 && <AndMark />}
                      <KingNode king={k} showDot={false} compact={isPair} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BranchTabs() {
  const availableEras = BRANCH_ERAS.filter((era) => getKingsByEra(era).length > 0);
  const [active, setActive] = useState<EraKey>(availableEras[0]);

  return (
    <div>
      {/* ერთ ხაზში ყველა სამეფო — თაბი */}
      <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 mb-8 border-b border-neutral-800">
        {availableEras.map((era) => (
          <button
            key={era}
            onClick={() => setActive(era)}
            className={`shrink-0 px-4 py-2 text-sm font-medium rounded-t-md whitespace-nowrap transition-colors ${
              active === era
                ? "text-amber-400 border-b-2 border-amber-500 bg-neutral-900"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {ERA_LABELS[era]}
          </button>
        ))}
      </div>

      {/* არჩეული სამეფოს ქრონოლოგიური სია */}
      <EraColumn era={active} />
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

      {/* Branches: ერთ ხაზში სამეფოები, აირჩიე და ნახე ქრონოლოგია */}
      <BranchTabs />

      {/* ქართლ-კახეთი — ყოველთვის ღია, მწკრივის ქვემოთ ჩვეულებრივად */}
      <div className="mt-10">
        {TAIL_ERAS.map((era) => (
          <EraColumn key={era} era={era} />
        ))}
      </div>
    </div>
  );
}


