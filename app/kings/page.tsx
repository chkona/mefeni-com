"use client";
import { useState, useMemo } from "react";
import { kings } from "@/lib/data/kings";
import KingCard from "@/components/KingCard";

const DYNASTIES = ["all", "ფარნავაზიანი", "ხოსროიანი", "ბაგრატიონი"] as const;

export default function KingsPage() {
  const [query, setQuery] = useState("");
  const [dynasty, setDynasty] = useState<(typeof DYNASTIES)[number]>("all");

  const filtered = useMemo(() => {
    return kings.filter((k) => {
      const matchesQuery = k.name.toLowerCase().includes(query.toLowerCase());
      const matchesDynasty = dynasty === "all" || k.dynasty === dynasty;
      return matchesQuery && matchesDynasty;
    });
  }, [query, dynasty]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="font-num text-xs tracking-widest uppercase text-gold">სამეფო გალერეა</span>
        <h1 className="font-display text-4xl mt-2">მეფეები და დედოფლები</h1>
        <p className="text-muted mt-3">მოძებნე სახელით ან გაფილტრე დინასტიის მიხედვით.</p>
      </div>

      <div className="flex justify-center mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="მოძებნე მეფე... მაგ. თამარ"
          className="bg-white/5 border border-gold/20 rounded-full px-5 py-3 w-full max-w-md outline-none focus:border-gold text-sm"
        />
      </div>

      <div className="flex gap-3 flex-wrap justify-center mb-12">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((k) => (
          <KingCard key={k.slug} king={k} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted mt-16">მეფე ვერ მოიძებნა — სცადე სხვა საძიებო სიტყვა.</p>
      )}
    </section>
  );
}
