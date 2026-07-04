"use client";

import { useState } from "react";
import { churches } from "@/lib/data/churches";
import GeorgiaChurchMap from "@/components/GeorgiaChurchMap";
import ChurchCard from "@/components/ChurchCard";

export default function ChurchesPage() {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(slug: string) {
    setSelected(slug);
    const el = document.getElementById(`church-${slug}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <span className="font-num text-xs tracking-widest uppercase text-gold">
          სულიერი მემკვიდრეობა
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-goldBright mt-2">
          საქართველოს ეკლესია-მონასტრები
        </h1>
        <p className="text-muted mt-4 max-w-2xl mx-auto">
          მონიშნეთ წერტილი რუკაზე, რომ ნახოთ დეტალები, ან დაათვალიერეთ სია
          ქვემოთ.
        </p>
      </div>

      <GeorgiaChurchMap onSelect={handleSelect} selected={selected} />

      <div className="grid sm:grid-cols-2 gap-5 mt-12">
        {churches.map((c) => (
          <ChurchCard key={c.slug} church={c} active={selected === c.slug} />
        ))}
      </div>
    </section>
  );
}

