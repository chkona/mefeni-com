"use client";
import { useState } from "react";

// კითხვების დასამატებლად ჩაამატე ახალი ობიექტი — a არის სწორი
// პასუხის ინდექსი opts მასივში (იწყება 0-დან)
const QUIZ = [
  { q: "ვინ დააარსა ქართლის (იბერიის) სამეფო?", opts: ["ვახტანგ გორგასალი", "ფარნავაზ I", "დავით აღმაშენებელი", "ბაგრატ III"], a: 1 },
  { q: "რომელი ბრძოლა ითვლება დავით აღმაშენებლის მთავარ გამარჯვებად?", opts: ["დიდგორის ბრძოლა", "ბასიანის ბრძოლა", "კრწანისის ბრძოლა", "მარაბდის ბრძოლა"], a: 0 },
  { q: "ვინ დადო გეორგიევსკის ტრაქტატი?", opts: ["თამარ მეფე", "გიორგი XII", "ერეკლე II", "გიორგი V"], a: 2 },
  { q: "რომელი მეფის დროს იყო ოქროს ხანის მწვერვალი?", opts: ["თამარ მეფე", "დემეტრე I", "ვახტანგ გორგასალი", "გიორგი XII"], a: 0 },
];

export default function QuizPage() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const item = QUIZ[i % QUIZ.length];

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === item.a) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    setI((v) => v + 1);
  }

  return (
    <section className="max-w-xl mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <span className="font-num text-xs tracking-widest uppercase text-gold">გაიხსენე ისტორია</span>
        <h1 className="font-display text-4xl mt-2">სამეფო ვიქტორინა</h1>
      </div>

      <div className="glass-card p-8">
        <p className="font-display text-lg mb-6">{i + 1}. {item.q}</p>
        <div className="space-y-3">
          {item.opts.map((o, idx) => {
            let style = "border-gold/20";
            if (picked !== null) {
              if (idx === item.a) style = "border-green-600 bg-green-900/20";
              else if (idx === picked) style = "border-red-700 bg-red-900/20";
            }
            return (
              <button
                key={o}
                onClick={() => choose(idx)}
                className={`w-full text-left px-5 py-3 border rounded ${style} hover:border-gold transition`}
              >
                {o}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-8">
          <span className="font-num text-gold text-sm">ქულა: {score} / {i + (picked !== null ? 1 : 0)}</span>
          <button onClick={next} className="border border-gold text-goldBright px-5 py-2 rounded-sm hover:bg-gold/10 transition">
            შემდეგი →
          </button>
        </div>
      </div>
    </section>
  );
}
