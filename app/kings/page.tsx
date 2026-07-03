"use client";
import { useState, useMemo } from "react";
import { kings, getEra, ERA_LABELS, TRUNK_ERAS, BRANCH_ERAS } from "@/lib/data/kings";
import KingCard from "@/components/KingCard";
import DynastyChain from "@/components/DynastyChain";

const DYNASTIES = ["all", "ფარნავაზიანი", "ხოსროიანი", "ბაგრატიონი"] as const;

export default function KingsPage() {
  const [query, setQuery] = useState("");
  const [dynasty, setDynasty] = useState<(typeof DYNASTIES)[number]>("all");
  const isFiltering = query.trim() !== "" || dynasty !== "all";

  const filtered = useMemo(() => {
    return kings.filter((k) => {
      const matchesQuery = k.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesDynasty = dynasty === "all" || k.dynasty === dynasty;
      return matchesQuery && matchesDynasty;
    });
  }, [query, dynasty]);

  const trunkByEra = TRUNK_ERAS.map((era) => ({
    era, label: ERA_LABELS[era], list: kings.filter((k) => getEra(k.slug) === era),
  }));
  const branches = BRANCH_ERAS.map((era) => ({
    era, label: ERA_LABELS[era], list: kings.filter((k) => getEra(k.slug) === era),
  }));

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="font-num text-xs tracking-widest uppercase text-gold">დინასტიური ხე</span>
        <h1 className="font-display text-4xl mt-2">მეფენი და დედოფლები</h1>
        <p className="text-muted mt-3">
          იბერიის ანტიკური მეფეებიდან — ერთიან საქართველომდე, და მისი დაშლის შემდეგ
          სამ სამეფომდე. დააჭირე ნებისმიერ მეფეს დეტალური ინფორმაციისთვის.
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="მოძებნე მეფე... მაგ. თამარ"
          className="bg-white/5 border border-gold/20 rounded-full px-5 py-3 w-full max-w-md outline-none focus:border-gold text-sm"
        />
      </div>

      <div className="flex gap-3 flex-wrap justify-center mb-14">
        {DYNASTIES.map((d) => (
          <button
            key={d}
            onClick={() => setDynasty(d)}
            className={`font-num text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition ${
              dynasty === d ? "border-gold text-goldBright bg-gold/10" : "border-gold/20 text-muted"
            }`}
          >
            {d === "all" ? "ყველა" : d}
          </button>
        ))}
      </div>

      {isFiltering ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((k) => (
              <KingCard key={k.slug} king={k} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted mt-16">მეფე ვერ მოიძებნა — სცადე სხვა საძიებო სიტყვა.</p>
          )}
        </>
      ) : (
        <>
          <div className="max-w-2xl mx-auto">
            {trunkByEra.map(({ era, label, list }) => (
              <div key={era} className="mb-10">
                <h2 className="font-num text-xs tracking-widest uppercase text-gold mb-4 pl-8">{label}</h2>
                <DynastyChain kings={list} />
              </div>
            ))}
            <div className="relative mt-4 mb-10">
              <div className="text-center font-num text-xs tracking-widest uppercase text-muted mb-3">
                საქართველოს დაშლა სამ სამეფოდ (1466)
              </div>
              <div className="h-px bg-gold/50 w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {branches.map(({ era, label, list }) => (
              <div key={era}>
                <div className="w-px h-8 bg-gold/50 mx-auto" />
                <h2 className="font-num text-xs tracking-widest uppercase text-gold mb-4 text-center">{label}</h2>
                <DynastyChain kings={list} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
