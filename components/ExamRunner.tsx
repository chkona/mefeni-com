"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { ExamSubtopic, ExamQuestion } from "@/lib/data/exam-questions";

const SECONDS_PER_QUESTION = 20; // ეროვნულის მსგავსი ტემპი

// ადმინისტრატორის მიერ განსაზღვრული ნაგულისხმევი პარამეტრები —
// მომხმარებელს შეუძლია გამოცდის დროს გამორთოს/ჩართოს ავტომატური გადასვლა,
// მაგრამ ეს არის საწყისი, ნაგულისხმევი მდგომარეობა და დაყოვნება.
const AUTO_ADVANCE_DEFAULT = true;
const AUTO_ADVANCE_DELAY_MS = 900;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ExamRunner({ topic }: { topic: ExamSubtopic }) {
  const maxQ = topic.questions.length;
  const [started, setStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(Math.min(maxQ, 20));
  const [questions, setQuestions] = useState<ExamQuestion[]>(topic.questions);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [finished, setFinished] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(AUTO_ADVANCE_DEFAULT);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mefeni-auto-advance");
      if (saved !== null) setAutoAdvance(saved === "1");
    } catch {
      // localStorage მიუწვდომელია — ნაგულისხმევი მნიშვნელობა რჩება
    }
  }, []);

  function toggleAutoAdvance() {
    setAutoAdvance((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("mefeni-auto-advance", next ? "1" : "0");
      } catch {
        // უბრალოდ არ დაიმახსოვრებს არჩევანს შემდეგ ჯერზე
      }
      return next;
    });
  }

  useEffect(() => {
    if (!started || finished) return;
    if (secondsLeft <= 0) {
      setFinished(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, finished, secondsLeft]);

  // კითხვის შეცვლისას გაუქმდეს ნებისმიერი მოლოდინში მყოფი ავტო-გადასვლის
  // ტაიმერი, რომ ორმაგად არ გადახტეს გვერდი
  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, [current]);

  const score = useMemo(
    () => answers.filter((a, i) => a === questions[i]?.correctIndex).length,
    [answers, questions]
  );

  function startExam() {
    const picked = shuffle(topic.questions).slice(0, questionCount);
    setQuestions(picked);
    setAnswers(Array(picked.length).fill(null));
    setCurrent(0);
    setSecondsLeft(picked.length * SECONDS_PER_QUESTION);
    setFinished(false);
    setStarted(true);
  }

  function selectAnswer(idx: number) {
    if (finished) return;
    if (answers[current] !== null) return; // პასუხი უკვე მიცემულია — შეცვლა არ შეიძლება
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);

    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (autoAdvance) {
      advanceTimer.current = setTimeout(() => {
        setCurrent((c) => (c < questions.length - 1 ? c + 1 : c));
      }, AUTO_ADVANCE_DELAY_MS);
    }
  }

  function mmss(s: number) {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  // --- დაწყების ეკრანი: კითხვების რაოდენობის არჩევა ---
  if (!started) {
    return (
      <div className="max-w-sm mx-auto text-center">
        <p className="text-muted text-sm mb-4">სულ ხელმისაწვდომია {maxQ} კითხვა</p>

        <p className="text-xs text-gold uppercase tracking-widest mb-2">
          აირჩიეთ კითხვების რაოდენობა
        </p>
        <div className="flex justify-center gap-2 mb-5 flex-wrap">
          {[10, 20, 30, maxQ].filter((n, i, arr) => n <= maxQ && arr.indexOf(n) === i).map((n) => (
            <button
              key={n}
              onClick={() => setQuestionCount(n)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                questionCount === n
                  ? "border-goldBright text-goldBright bg-panel2"
                  : "border-gold/20 text-muted hover:text-ink"
              }`}
            >
              {n === maxQ ? `ყველა (${maxQ})` : n}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted mb-2">ან ჩაწერეთ ზუსტად სასურველი რაოდენობა</p>
        <input
          type="number"
          min={1}
          max={maxQ}
          value={questionCount}
          onChange={(e) => {
            const v = Math.max(1, Math.min(maxQ, Number(e.target.value) || 1));
            setQuestionCount(v);
          }}
          className="mb-8 w-24 text-center bg-panel border border-gold/25 rounded-md py-2 text-goldBright text-lg focus:outline-none focus:border-goldBright"
        />

        <p className="text-muted text-xs mb-8">
          დრო: {mmss(questionCount * SECONDS_PER_QUESTION)} · გამოცდის დაწყების
          შემდეგ საათი ირთვება და აღარ ჩერდება. კითხვების თანმიმდევრობა ყოველ
          ჯერზე ახლიდან ირევა.
        </p>
        <button
          onClick={startExam}
          className="px-6 py-3 rounded-md bg-gold text-void font-semibold hover:bg-goldBright transition-colors"
        >
          გამოცდის დაწყება
        </button>
      </div>
    );
  }

  // --- შედეგების ეკრანი ---
  if (finished) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-num text-xs tracking-widest uppercase text-gold">
            შედეგი
          </p>
          <p className="font-display text-5xl text-goldBright mt-2">
            {score} / {questions.length}
          </p>
          <div className="w-full h-1.5 bg-panel2 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-gold transition-all"
              style={{ width: `${(score / Math.max(questions.length, 1)) * 100}%` }}
            />
          </div>
        </div>
        <div className="space-y-4">
          {questions.map((q, i) => {
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

  // --- კითხვის ეკრანი ---
  const q = questions[current];
  const given = answers[current];
  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted">
          კითხვა {current + 1} / {questions.length}
        </span>
        <span className="font-num text-goldBright text-lg">{mmss(secondsLeft)}</span>
      </div>

      <div className="w-full h-1 bg-panel2 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gold transition-all"
          style={{ width: `${(answeredCount / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => {
            if (window.confirm("დარწმუნებული ხართ, რომ გსურთ გამოცდის დასრულება ახლავე?")) {
              setFinished(true);
            }
          }}
          className="text-xs px-3 py-1.5 rounded-md border border-wine/40 text-wineBright hover:bg-wine/10 transition-colors"
        >
          ✕ დასრულება ახლავე
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">ავტომატური გადასვლა</span>
          <button
            onClick={toggleAutoAdvance}
            aria-pressed={autoAdvance}
            className={`w-10 h-5 rounded-full transition-colors relative ${
              autoAdvance ? "bg-gold" : "bg-panel2 border border-gold/20"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-void transition-transform ${
                autoAdvance ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gold/15 bg-panel p-6 mb-6 shadow-sm shadow-black/10">
        <p className="text-ink text-lg mb-5">{q.question}</p>
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let style = "border-gold/15 text-ink/85 hover:border-gold/40 cursor-pointer";
            if (given !== null) {
              if (idx === q.correctIndex) {
                // სწორი ვარიანტი ყოველთვის მწვანედ გამოსდის პასუხის გაცემის შემდეგ
                style = "border-green-600 bg-green-600/15 text-green-400 cursor-default";
              } else if (idx === given) {
                // ეს კონკრეტული, არასწორად შერჩეული ვარიანტი წითლდება
                style = "border-wine bg-wine/15 text-wineBright cursor-default";
              } else {
                // პასუხი უკვე დაფიქსირდა — დანარჩენი ვარიანტები ჩაბნელებულია და აღარ იცვლება
                style = "border-gold/10 text-muted/60 cursor-default";
              }
            }
            return (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                disabled={given !== null}
                className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${style}`}
              >
                {String.fromCharCode(65 + idx)}) {opt}
              </button>
            );
          })}
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
        {current < questions.length - 1 ? (
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

