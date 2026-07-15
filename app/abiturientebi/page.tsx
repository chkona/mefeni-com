import Link from "next/link";
import { examTopics } from "@/lib/data/exam-questions";

export default function AbiturientebiPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <span className="font-num text-xs tracking-widest uppercase text-gold">
          იმიტირებული გამოცდა
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-goldBright mt-2">
          აბიტურიენტები
        </h1>
        <p className="text-muted mt-4 max-w-xl mx-auto">
          ერთიანი ეროვნული გამოცდების ისტორიის ტესტების ფორმატში — აირჩიეთ
          თემა და გაიარეთ იმიტირებული გამოცდა.
        </p>
      </div>

      <div className="grid gap-4">
        {examTopics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/abiturientebi/${topic.slug}`}
            className="block rounded-lg border border-gold/15 bg-panel p-5 hover:border-goldBright transition-colors"
          >
            <h2 className="font-display text-xl text-goldBright">{topic.title}</h2>
            <p className="text-sm text-muted mt-2">{topic.description}</p>
            <p className="text-xs text-gold mt-3">
              {topic.subtopics.length} ქვეთემა ·{" "}
              {topic.subtopics.reduce((n, s) => n + s.questions.length, 0)} კითხვა →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

