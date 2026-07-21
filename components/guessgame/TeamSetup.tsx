"use client";

import { useState } from "react";

export default function TeamSetup({
  onStart,
}: {
  onStart: (team1: string, team2: string, rounds: number) => void;
}) {
  const [team1, setTeam1] = useState("გუნდი 1");
  const [team2, setTeam2] = useState("გუნდი 2");
  const [rounds, setRounds] = useState(10);

  return (
    <div className="max-w-md mx-auto text-center animate-fade-up">
      <span className="font-num text-xs tracking-widest uppercase text-gold">
        🏆 გუნდური თამაში
      </span>
      <h1 className="font-display text-4xl text-goldBright mt-2 mb-8">
        გამოიცანი რომელი მეფე ვარ
      </h1>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-xs text-muted mb-1 text-left">
            გუნდი 1-ის სახელი
          </label>
          <input
            value={team1}
            onChange={(e) => setTeam1(e.target.value || "გუნდი 1")}
            className="w-full bg-panel border border-gold/25 rounded-md py-2 px-3 text-goldBright focus:outline-none focus:border-goldBright"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1 text-left">
            გუნდი 2-ის სახელი
          </label>
          <input
            value={team2}
            onChange={(e) => setTeam2(e.target.value || "გუნდი 2")}
            className="w-full bg-panel border border-gold/25 rounded-md py-2 px-3 text-goldBright focus:outline-none focus:border-goldBright"
          />
        </div>
      </div>

      <p className="text-xs text-gold uppercase tracking-widest mb-2">
        რამდენი კითხვა?
      </p>
      <div className="flex justify-center gap-2 mb-10">
        {[10, 20, 30].map((n) => (
          <button
            key={n}
            onClick={() => setRounds(n)}
            className={`px-5 py-2 rounded-full text-sm border transition-colors ${
              rounds === n
                ? "border-goldBright text-goldBright bg-panel2"
                : "border-gold/20 text-muted hover:text-ink"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <button
        onClick={() => onStart(team1, team2, rounds)}
        className="px-8 py-4 rounded-md bg-gold text-void font-semibold text-lg hover:bg-goldBright transition-colors"
      >
        თამაშის დაწყება
      </button>
    </div>
  );
}

