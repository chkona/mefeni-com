"use client";

export default function HintCard({
  hints,
  revealedCount,
  onNextHint,
  onGuessCorrect,
  onNoOneGuessed,
  team1,
  team2,
  revealed, // true once answer is shown
  answerName,
  answerDescription,
  onNextQuestion,
  isLastRound,
}: {
  hints: string[];
  revealedCount: number;
  onNextHint: () => void;
  onGuessCorrect: (team: 1 | 2) => void;
  onNoOneGuessed: () => void;
  team1: string;
  team2: string;
  revealed: boolean;
  answerName: string;
  answerDescription: string;
  onNextQuestion: () => void;
  isLastRound: boolean;
}) {
  const points = [5, 4, 3, 2, 1];

  if (revealed) {
    return (
      <div className="rounded-lg border border-goldBright/40 bg-panel p-6 text-center animate-card-in">
        <p className="text-xs text-gold uppercase tracking-widest mb-2">სწორი პასუხი</p>
        <h2 className="font-display text-3xl text-goldBright mb-3">{answerName}</h2>
        <p className="text-ink/80 text-sm leading-relaxed mb-6">{answerDescription}</p>
        <button
          onClick={onNextQuestion}
          className="px-6 py-3 rounded-md bg-gold text-void font-semibold hover:bg-goldBright transition-colors"
        >
          {isLastRound ? "საბოლოო შედეგი →" : "შემდეგი კითხვა →"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-lg border border-gold/15 bg-panel p-6 mb-6 min-h-[140px] flex items-center justify-center">
        <div className="space-y-3 w-full">
          {hints.slice(0, revealedCount).map((h, i) => (
            <p key={i} className="text-ink text-lg leading-relaxed animate-card-in">
              <span className="text-gold font-num text-xs mr-2">
                +{points[i]}
              </span>
              {h}
            </p>
          ))}
        </div>
      </div>

      {revealedCount < hints.length && (
        <div className="text-center mb-6">
          <button
            onClick={onNextHint}
            className="px-5 py-2.5 rounded-md border border-gold/25 text-goldBright hover:bg-panel2 transition-colors text-sm"
          >
            შემდეგი მინიშნება →
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-3">
        <button
          onClick={() => onGuessCorrect(1)}
          className="px-4 py-4 rounded-md bg-gold text-void font-semibold hover:bg-goldBright transition-colors"
        >
          ✅ გამოიცნო {team1}-მა
        </button>
        <button
          onClick={() => onGuessCorrect(2)}
          className="px-4 py-4 rounded-md bg-gold text-void font-semibold hover:bg-goldBright transition-colors"
        >
          ✅ გამოიცნო {team2}-მა
        </button>
      </div>
      <div className="text-center">
        <button
          onClick={onNoOneGuessed}
          className="text-xs text-muted hover:text-wineBright transition-colors"
        >
          ვერავინ გამოიცნო
        </button>
      </div>
    </div>
  );
}

