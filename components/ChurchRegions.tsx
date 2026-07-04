"use client";

import { useState, useEffect } from "react";
import { REGIONS, getChurchesByRegion, getCitiesForRegion, getChurchesByCity } from "@/lib/data/churches";
import ChurchCard from "@/components/ChurchCard";

export default function ChurchRegions() {
  const availableRegions = REGIONS.filter(
    (r) => getChurchesByRegion(r).length > 0
  );
  const [activeRegion, setActiveRegion] = useState<string>(availableRegions[0]);
  const cities = getCitiesForRegion(activeRegion);
  const [activeCity, setActiveCity] = useState<string>(cities[0]);

  // რეგიონის შეცვლისას პირველი ქალაქი აირჩევა ავტომატურად
  useEffect(() => {
    const newCities = getCitiesForRegion(activeRegion);
    setActiveCity(newCities[0]);
  }, [activeRegion]);

  const activeChurches = getChurchesByCity(activeRegion, activeCity);

  return (
    <div>
      {/* რეგიონები — ერთ მწკრივში */}
      <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 mb-6 border-b border-gold/15">
        {availableRegions.map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`shrink-0 px-4 py-2 text-sm font-medium rounded-t-md whitespace-nowrap transition-colors ${
              activeRegion === region
                ? "text-goldBright border-b-2 border-gold bg-panel"
                : "text-muted hover:text-ink"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* ქალაქები/მუნიციპალიტეტები არჩეულ რეგიონში */}
      <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 mb-8">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-colors ${
              activeCity === city
                ? "border-goldBright text-goldBright bg-panel2"
                : "border-gold/20 text-muted hover:text-ink"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* არჩეული ქალაქის ეკლესიები */}
      <div className="grid sm:grid-cols-2 gap-5">
        {activeChurches.map((c) => (
          <ChurchCard key={c.slug} church={c} />
        ))}
      </div>
    </div>
  );
}

