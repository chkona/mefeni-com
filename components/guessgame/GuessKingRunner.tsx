"use client";

import { useState } from "react";
import Link from "next/link";
import TeamSetup from "@/components/guessgame/TeamSetup";
import ScoreBoard from "@/components/guessgame/ScoreBoard";
import HintCard from "@/components/guessgame/HintCard";
import Confetti from "@/components/guessgame/Confetti";
import rawKings from "@/lib/data/guess-king-data.json";

type KingEntry = {
  slug: string;
  name: string;
  image: string;
  description: string;
  hints: string[];
};

const kings = rawKings as KingEntry[];
const POINTS = [5, 4, 3, 2, 1];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "setup" | "playing" | "ended";

export default function GuessKingRunner() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [team1, setTeam1] = useState("გუნდი 1");
  const [team2, setTeam2] = useState("გუნდი 2");
  const [totalRounds, setTotalRounds] = useState(10);
  const [order, setOrder] = useState<KingEntry[]>([]);
  const [round, setRound] = useState(0);
  const [revealedCount, setRevealedCount] = useState(1);
  const [answerShown, setAnswerShown] = useState(false);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [popScore, setPopScore] = useState<{ team: 1 | 2; points: number; key: number } | null>(null);

  function startGame(t1: string, t2: string, rounds: number) {
    const picked = shuffle(kings).slice(0, rounds);
    setTeam1(t1);
    setTeam2(t2);
    setTotalRounds(rounds);
    setOrder(picked);
    setRound(0);
    setRevealedCount(1);
    setAnswerShown(false);
    setScore1(0);
    setScore2(0);
    setPhase("playing");
  }

  function nextHint() {
    setRevealedCount((c) => Math.min(5, c + 1));
  }

  function awardAndReveal(team: 1 | 2 | null) {
    if (team) {
      const points = POINTS[revealedCount - 1];
      if (team === 1) setScore1((s) => s + points);
      else setScore2((s) => s + points);
      setPopScore({ team, points, key: Date.now() });
      setTimeout(() => setPopScore(null), 1100);
    }
    setAnswerShown(true);
  }

  function nextQuestion() {
    const nextRound = round + 1;
    if (nextRound >= totalRounds) {
      setPhase("ended");
      return;
    }
    setRound(nextRound);
    setRevealedCount(1);
    setAnswerShown(false);
  }

  function restartSameTeams() {
    startGame(team1, team2, totalRounds);
  }

  function newGame() {
    setPhase("setup");
  }

  if (phase === "setup") {
    return <TeamSetup onStart={startGame} />;
  }

  if (phase === "ended") {
    const winner = score1 === score2 ? null : score1 > score2 ? team1 : team2;
    return (
      <div className="max-w-md mx-auto text-center relative">
        <Confetti />
        <span className="font-num text-xs tracking-widest uppercase text-gold">
          თამაში დასრულდა
        </span>
        <h1 className="font-display text-4xl text-goldBright mt-2 mb-8">
          {winner ? `🏆 გაიმარჯვა ${winner}-მ` : "🤝 ფრეა!"}
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="rounded-lg border border-gold/15 bg-panel py-5">
            <p className="text-xs text-muted uppercase tracking-widest">{team1}</p>
            <p className="font-num text-4xl text-goldBright mt-1">{score1}</p>
          </div>
          <div className="rounded-lg border border-gold/15 bg-panel py-5">
            <p className="text-xs text-muted uppercase tracking-widest">{team2}</p>
            <p className="font-num text-4xl text-goldBright mt-1">{score2}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={restartSameTeams}
            className="px-6 py-3 rounded-md bg-gold text-void font-semibold hover:bg-goldBright transition-colors"
          >
            ↻ თავიდან დაწყება
          </button>
          <button
            onClick={newGame}
            className="px-6 py-3 rounded-md border border-gold/25 text-goldBright hover:bg-panel2 transition-colors"
          >
            ახალი თამაში
          </button>
          <Link
            href="/game"
            className="px-6 py-3 rounded-md border border-gold/15 text-muted hover:text-ink transition-colors"
          >
            თამაშების სია
          </Link>
        </div>
      </div>
    );
  }

  // --- playing ---
  const current = order[round];

  return (
    <div className="max-w-xl mx-auto">
      <ScoreBoard team1={team1} team2={team2} score1={score1} score2={score2} popScore={popScore} />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted">
          კითხვა {round + 1} / {totalRounds}
        </span>
      </div>
      <div className="w-full h-1.5 bg-panel2 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gold transition-all"
          style={{ width: `${((round + 1) / totalRounds) * 100}%` }}
        />
      </div>

      <HintCard
        hints={current.hints}
        revealedCount={revealedCount}
        onNextHint={nextHint}
        onGuessCorrect={(team) => awardAndReveal(team)}
        onNoOneGuessed={() => awardAndReveal(null)}
        team1={team1}
        team2={team2}
        revealed={answerShown}
        answerName={current.name}
        answerDescription={current.description}
        onNextQuestion={nextQuestion}
        isLastRound={round + 1 >= totalRounds}
      />
    </div>
  );
}

