"use client";

import { useState } from "react";
import { REGIONS, getChurchesByRegion } from "@/lib/data/churches";
import ChurchCard from "@/components/ChurchCard";

export default function ChurchRegions() {
  const availableRegions = REGIONS.filter(
    (r) => getChurchesByRegion(r).length > 0
  );
  const [active, setActive] = useState<string>(availableRegions[0]);
  const activeChurches = getChurchesByRegion(active);

  return (
    <div>
      {/* რეგიონები — ერთ მწკრივში */}
      <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 mb-8 border-b border-gold/15">
        {availableRegions.map((region) => (
          <button
            key={region}
            onClick={() => setActive(region)}
            className={`shrink-0 px-4 py-2 text-sm font-medium rounded-t-md whitespace-nowrap transition-colors ${
              active === region
                ? "text-goldBright border-b-2 border-gold bg-panel"
                : "text-muted hover:text-ink"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* არჩეული რეგიონის ეკლესიები */}
      <div className="grid sm:grid-cols-2 gap-5">
        {activeChurches.map((c) => (
          <ChurchCard key={c.slug} church={c} />
        ))}
      </div>
    </div>
  );
}

