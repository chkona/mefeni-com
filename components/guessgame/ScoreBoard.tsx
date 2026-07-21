"use client";

export default function ScoreBoard({
  team1,
  team2,
  score1,
  score2,
  popScore, // { team: 1 | 2, points: number, key: number } | null
}: {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  popScore: { team: 1 | 2; points: number; key: number } | null;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {[
        { name: team1, score: score1, team: 1 as const },
        { name: team2, score: score2, team: 2 as const },
      ].map((t) => (
        <div
          key={t.team}
          className="relative rounded-lg border border-gold/15 bg-panel py-4 px-3 text-center"
        >
          <p className="text-xs text-muted uppercase tracking-widest truncate">{t.name}</p>
          <p className="font-num text-4xl text-goldBright mt-1">{t.score}</p>
          {popScore && popScore.team === t.team && (
            <span
              key={popScore.key}
              className="absolute top-1 right-3 font-num text-xl text-green-400 animate-score-pop pointer-events-none"
            >
              +{popScore.points}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

