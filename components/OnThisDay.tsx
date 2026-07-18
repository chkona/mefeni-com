"use client";

import { useEffect, useState } from "react";
import { getTodayEvent, OnThisDayEvent } from "@/lib/data/on-this-day";

export default function OnThisDay() {
  const [event, setEvent] = useState<OnThisDayEvent | null | undefined>(undefined);
  const [today, setToday] = useState("");

  useEffect(() => {
    setEvent(getTodayEvent());
    setToday(
      new Date().toLocaleDateString("ka-GE", { day: "numeric", month: "long" })
    );
  }, []);

  // სერვერზე ჯერ არაფერი ვიცით თარიღზე — თავიდან ავირიდოთ hydration mismatch
  if (event === undefined) return null;

  return (
    <div className="max-w-2xl mx-auto mt-16 rounded-lg border border-gold/15 bg-panel px-6 py-5 text-center">
      <span className="font-num text-xs tracking-widest uppercase text-gold">
        დღეს ისტორიაში · {today}
      </span>
      {event ? (
        <>
          <h3 className="font-display text-xl text-goldBright mt-2">
            {event.title} <span className="text-muted text-sm font-num">({event.year})</span>
          </h3>
          <p className="text-ink/80 text-sm mt-2">{event.description}</p>
        </>
      ) : (
        <p className="text-muted text-sm mt-2">
          დღევანდელი თარიღისთვის კონკრეტული მოვლენა ჯერ არ გვაქვს დამატებული —
          გვერდიგვერდ ივსება.
        </p>
      )}
    </div>
  );
}