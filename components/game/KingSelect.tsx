"use client";

import { gameKings, GameKing } from "@/lib/data/game-kings";

export default function KingSelect({
  onSelect,
  hasSave,
  onContinue,
}: {
  onSelect: (king: GameKing) => void;
  hasSave: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <span className="font-num text-xs tracking-widest uppercase text-gold">
        ინტერაქტიული თამაში
      </span>
      <h1 className="font-display text-4xl md:text-5xl text-goldBright mt-2 mb-4">
        გახდი საქართველოს მეფე
      </h1>
      <p className="text-muted max-w-xl mx-auto mb-10">
        აირჩიეთ მეფე და მართეთ სამეფო — ყოველი გადაწყვეტილება იმოქმედებს ხალხის
        მხარდაჭერაზე, ჯარზე, ხაზინასა და ეკონომიკაზე. თუ რომელიმე რესურსი
        ნულამდე ჩამოვა, თქვენი მეფობა დასრულდება.
      </p>

      {hasSave && (
        <button
          onClick={onContinue}
          className="mb-10 px-6 py-3 rounded-md border border-goldBright text-goldBright hover:bg-panel2 transition-colors"
        >
          ↻ გააგრძელეთ შენახული თამაში
        </button>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        {gameKings.map((k) => (
          <button
            key={k.slug}
            onClick={() => onSelect(k)}
            className="text-left rounded-lg border border-gold/15 bg-panel p-5 hover:border-goldBright transition-colors"
          >
            <h2 className="font-display text-xl text-goldBright">{k.name}</h2>
            <p className="font-num text-xs text-muted mt-1">
              {k.title} · {k.years}
            </p>
            <p className="text-xs text-gold mt-3">✦ {k.bonusLabel}</p>
            <p className="text-xs text-ink/70 mt-1">{k.bonusDescription}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

