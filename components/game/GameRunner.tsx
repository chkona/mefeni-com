"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import KingSelect from "@/components/game/KingSelect";
import ResourceBar from "@/components/game/ResourceBar";
import { gameKings, getGameKing, GameKing, ResourceKey } from "@/lib/data/game-kings";
import { achievements } from "@/lib/data/game-achievements";
import rawEvents from "@/lib/data/game-events.json";

type Choice = { label: string; effects: Partial<Record<ResourceKey, number>> };
type GameEvent = { id: string; text: string; choices: Choice[] };

const events = rawEvents as GameEvent[];
const ROUNDS_TO_WIN = 15;
const START_VALUE = 60;
const SAVE_KEY = "mefeni-game-save";
const ACH_KEY = "mefeni-game-achievements";

type Resources = Record<ResourceKey, number>;

type SaveData = {
  kingSlug: string;
  resources: Resources;
  round: number;
  order: string[]; // event id order for this playthrough
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadAchievements(): string[] {
  try {
    const raw = localStorage.getItem(ACH_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAchievements(list: string[]) {
  try {
    localStorage.setItem(ACH_KEY, JSON.stringify(list));
  } catch {
    // localStorage მიუწვდომელია — მიღწევები ამ სესიაზე მაინც გამოჩნდება
  }
}

const LOSE_ENDINGS: Record<ResourceKey, { title: string; text: string }> = {
  support: {
    title: "ხალხი აჯანყდა",
    text: "ხალხმა თქვენს მმართველობას მხარი აღარ დაუჭირა და ტახტი დაკარგეთ.",
  },
  army: {
    title: "ჯარი დაიშალა",
    text: "თქვენი ჯარი აღარ არსებობს — სამეფო დაუცველი დარჩა მტრების წინაშე.",
  },
  treasury: {
    title: "ხაზინა დაცარიელდა",
    text: "სახელმწიფო გაკოტრდა და ვეღარ შეძლო ფუნქციონირება.",
  },
  economy: {
    title: "ეკონომიკა დაინგრა",
    text: "სამეფოს ეკონომიკა კოლაფსში აღმოჩნდა, შიმშილმა და სიღარიბემ მოიცვა ქვეყანა.",
  },
};

const WIN_ENDINGS = [
  { title: "დიდებული მეფობა", text: "თქვენი სახელი საუკუნეების განმავლობაში დარჩება ხსოვნაში, როგორც ერთ-ერთი ყველაზე ბრძენი მმართველისა." },
  { title: "სტაბილური მეფობა", text: "სამეფო გაუძლო ყველა გამოწვევას თქვენი მართვის ქვეშ და მშვიდობით გადასცემთ ტახტს მემკვიდრეს." },
  { title: "გამოცდილი მმართველი", text: "რთული გზა გამოიარეთ, მაგრამ სამეფო კვლავ დგას — თქვენი მემკვიდრეობა უსაფრთხოა." },
];

export default function GameRunner() {
  const [phase, setPhase] = useState<"select" | "playing" | "ended">("select");
  const [king, setKing] = useState<GameKing | null>(null);
  const [resources, setResources] = useState<Resources>({ support: START_VALUE, army: START_VALUE, treasury: START_VALUE, economy: START_VALUE });
  const [round, setRound] = useState(0);
  const [order, setOrder] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);
  const [hasSave, setHasSave] = useState(false);
  const [ending, setEnding] = useState<{ title: string; text: string } | null>(null);
  const [reachedGoldenAge, setReachedGoldenAge] = useState(false);

  useEffect(() => {
    setUnlocked(loadAchievements());
    try {
      setHasSave(!!localStorage.getItem(SAVE_KEY));
    } catch {
      setHasSave(false);
    }
  }, []);

  const persistSave = useCallback(
    (data: SaveData) => {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(data));
      } catch {
        // ვერ ჩაიწერა — თამაშის გაგრძელება ამ სესიაზე მაინც იმუშავებს
      }
    },
    []
  );

  function unlockAchievement(id: string) {
    setUnlocked((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveAchievements(next);
      setNewlyUnlocked((n) => [...n, id]);
      return next;
    });
  }

  function checkThresholdAchievements(res: Resources) {
    if (res.army >= 100) unlockAchievement("iron-army");
    if (res.treasury >= 100) unlockAchievement("rich-treasury");
    if (res.support >= 100) unlockAchievement("beloved-ruler");
    if (res.economy >= 100) unlockAchievement("flourishing-economy");
    if (!reachedGoldenAge && res.support >= 80 && res.army >= 80 && res.treasury >= 80 && res.economy >= 80) {
      setReachedGoldenAge(true);
      unlockAchievement("golden-age");
    }
  }

  function startNewGame(selected: GameKing) {
    const newOrder = shuffle(events.map((e) => e.id)).slice(0, ROUNDS_TO_WIN);
    const startRes: Resources = { support: START_VALUE, army: START_VALUE, treasury: START_VALUE, economy: START_VALUE };
    setKing(selected);
    setResources(startRes);
    setRound(0);
    setOrder(newOrder);
    setEnding(null);
    setReachedGoldenAge(false);
    setPhase("playing");
    persistSave({ kingSlug: selected.slug, resources: startRes, round: 0, order: newOrder });
  }

  function continueGame() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const data: SaveData = JSON.parse(raw);
      const k = getGameKing(data.kingSlug);
      if (!k) return;
      setKing(k);
      setResources(data.resources);
      setRound(data.round);
      setOrder(data.order);
      setEnding(null);
      setPhase("playing");
    } catch {
      // შენახული თამაშის წაკითხვა ვერ მოხერხდა
    }
  }

  function restart() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      // არაფერი
    }
    setHasSave(false);
    setKing(null);
    setEnding(null);
    setPhase("select");
  }

  function applyChoice(choice: Choice) {
    if (!king) return;
    const next: Resources = { ...resources };
    (Object.keys(choice.effects) as ResourceKey[]).forEach((key) => {
      let delta = choice.effects[key] ?? 0;
      if (delta > 0 && key === king.bonusResource) {
        delta = Math.round(delta * 1.25);
      }
      next[key] = Math.max(0, Math.min(100, next[key] + delta));
    });
    setResources(next);
    checkThresholdAchievements(next);

    if (round === 0) unlockAchievement("first-step");

    const depleted = (Object.keys(next) as ResourceKey[]).find((k) => next[k] <= 0);
    if (depleted) {
      setEnding(LOSE_ENDINGS[depleted]);
      setPhase("ended");
      try {
        localStorage.removeItem(SAVE_KEY);
      } catch {
        // არაფერი
      }
      return;
    }

    const nextRound = round + 1;
    if (nextRound >= ROUNDS_TO_WIN) {
      unlockAchievement("survivor");
      const winEnding = WIN_ENDINGS[Math.floor(Math.random() * WIN_ENDINGS.length)];
      setEnding(winEnding);
      setPhase("ended");
      try {
        localStorage.removeItem(SAVE_KEY);
      } catch {
        // არაფერი
      }
      return;
    }

    setRound(nextRound);
    persistSave({ kingSlug: king.slug, resources: next, round: nextRound, order });
  }

  if (phase === "select") {
    return (
      <KingSelect onSelect={startNewGame} hasSave={hasSave} onContinue={continueGame} />
    );
  }

  if (phase === "ended" && ending) {
    const won = WIN_ENDINGS.some((w) => w.title === ending.title);
    return (
      <div className="max-w-xl mx-auto text-center">
        <span className="font-num text-xs tracking-widest uppercase text-gold">
          მეფობა დასრულდა
        </span>
        <h1 className={`font-display text-4xl mt-2 mb-4 ${won ? "text-goldBright" : "text-wineBright"}`}>
          {ending.title}
        </h1>
        <p className="text-ink/85 mb-8">{ending.text}</p>

        {newlyUnlocked.length > 0 && (
          <div className="mb-8 rounded-lg border border-gold/20 bg-panel p-4">
            <p className="text-xs text-gold uppercase tracking-widest mb-2">
              ახალი მიღწევები
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {newlyUnlocked.map((id) => {
                const a = achievements.find((x) => x.id === id);
                if (!a) return null;
                return (
                  <span key={id} className="text-xs text-ink/85 px-3 py-1 rounded-full border border-gold/20 bg-panel2">
                    {a.icon} {a.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={restart}
            className="px-6 py-3 rounded-md bg-gold text-void font-semibold hover:bg-goldBright transition-colors"
          >
            ↻ ახლიდან დაწყება
          </button>
          <Link
            href="/kings"
            className="px-6 py-3 rounded-md border border-gold/25 text-goldBright hover:bg-panel2 transition-colors"
          >
            მეფეების გვერდზე დაბრუნება
          </Link>
        </div>
      </div>
    );
  }

  // --- playing ---
  const eventId = order[round];
  const event = events.find((e) => e.id === eventId) ?? events[0];

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-muted">
          {king?.name} · ტური {round + 1} / {ROUNDS_TO_WIN}
        </span>
        <button
          onClick={restart}
          className="text-xs text-muted hover:text-wineBright transition-colors"
        >
          ✕ თამაშის დასრულება
        </button>
      </div>

      <div className="w-full h-1.5 bg-panel2 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gold transition-all"
          style={{ width: `${((round + 1) / ROUNDS_TO_WIN) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <ResourceBar resKey="support" value={resources.support} boosted={king?.bonusResource === "support"} />
        <ResourceBar resKey="army" value={resources.army} boosted={king?.bonusResource === "army"} />
        <ResourceBar resKey="treasury" value={resources.treasury} boosted={king?.bonusResource === "treasury"} />
        <ResourceBar resKey="economy" value={resources.economy} boosted={king?.bonusResource === "economy"} />
      </div>

      <div className="rounded-lg border border-gold/15 bg-panel p-6 mb-6">
        <p className="text-ink text-lg leading-relaxed">{event.text}</p>
      </div>

      <div className="space-y-3">
        {event.choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => applyChoice(choice)}
            className="w-full text-left px-4 py-3 rounded-md border border-gold/15 text-ink/85 hover:border-goldBright hover:bg-panel2 transition-colors"
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}

