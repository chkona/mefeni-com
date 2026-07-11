"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ExamTopic } from "@/lib/data/exam-questions";

const SECONDS_PER_QUESTION = 60; // ეროვნულის მსგავსი ტემპი

export default function ExamRunner({ topic }: { topic: ExamTopic }) {
  const totalSeconds = topic.questions.length * SECONDS_PER_QUESTION;
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(topic.questions.length).fill(null)
  );
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started || finished) return;
    if (secondsLeft <= 0) {
      setFinished(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, finished, secondsLeft]);

  const score = useMemo(
    () =>
      answers.reduce(
        (acc, a, i) => acc + (a === topic.questions[i].correctIndex ? 1 : 0),
        0
      ),
    [answers, topic.questions]
  );

  function selectAnswer(idx: number) {
    if (finished) return;
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  }

  function mmss(s: number) {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  if (!started) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <p className="text-ink/90 mb-2">
          {topic.questions.length} კითხვა · დრო: {mmss(totalSeconds)}
        </p>
        <p className="text-muted text-sm mb-8">
          გამოცდის დაწყების შემდეგ საათი ირთვება და აღარ ჩერდება — ეს
          იმეორებს რეალური გამოცდის რეჟიმს.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-6 py-3 rounded-md bg-gold text-void font-semibold hover:bg-goldBright transition-colors"
        >
          გამოცდის დაწყება
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-num text-xs tracking-widest uppercase text-gold">
            შედეგი
          </p>
          <p className="font-display text-5xl text-goldBright mt-2">
            {score} / {topic.questions.length}
          </p>
        </div>
        <div className="space-y-4">
          {topic.questions.map((q, i) => {
            const given = answers[i];
            const correct = given === q.correctIndex;
            return (
              <div
                key={q.id}
                className={`rounded-lg border p-4 ${
                  correct ? "border-green-600/40" : "border-wine/60"
                } bg-panel`}
              >
                <p className="text-ink/90 text-sm font-medium mb-2">
                  {i + 1}. {q.question}
                </p>
                <p className="text-xs text-muted">
                  თქვენი პასუხი:{" "}
                  <span className={correct ? "text-green-500" : "text-wineBright"}>
                    {given !== null ? q.options[given] : "პასუხი არ გაცემულა"}
                  </span>
                </p>
                {!correct && (
                  <p className="text-xs text-goldBright mt-1">
                    სწორი პასუხი: {q.options[q.correctIndex]}
                  </p>
                )}
                {q.explanation && (
                  <p className="text-xs text-muted mt-2 italic">{q.explanation}</p>
                )}
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/abiturientebi"
            className="text-gold hover:text-goldBright text-sm"
          >
            ← სხვა თემის არჩევა
          </Link>
        </div>
      </div>
    );
  }

  const q = topic.questions[current];

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-muted">
          კითხვა {current + 1} / {topic.questions.length}
        </span>
        <span className="font-num text-goldBright text-lg">{mmss(secondsLeft)}</span>
      </div>

      <div className="rounded-lg border border-gold/15 bg-panel p-6 mb-6">
        <p className="text-ink text-lg mb-5">{q.question}</p>
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => selectAnswer(idx)}
              className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                answers[current] === idx
                  ? "border-goldBright bg-panel2 text-goldBright"
                  : "border-gold/15 text-ink/85 hover:border-gold/40"
              }`}
            >
              {String.fromCharCode(65 + idx)}) {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
          className="text-sm text-muted disabled:opacity-30"
        >
          ← წინა
        </button>
        {current < topic.questions.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="text-sm text-gold hover:text-goldBright"
          >
            შემდეგი →
          </button>
        ) : (
          <button
            onClick={() => setFinished(true)}
            className="px-4 py-2 rounded-md bg-gold text-void text-sm font-semibold hover:bg-goldBright"
          >
            დასრულება
          </button>
        )}
      </div>
    </div>
  );
}

