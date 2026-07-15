import Link from "next/link";
import { notFound } from "next/navigation";
import { examTopics, getTopic } from "@/lib/data/exam-questions";

export function generateStaticParams() {
  return examTopics.map((t) => ({ topic: t.slug }));
}

export default function ExamTopicPage({ params }: { params: { topic: string } }) {
  const topic = getTopic(params.topic);
  if (!topic) return notFound();

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <span className="font-num text-xs tracking-widest uppercase text-gold">
          იმიტირებული გამოცდა
        </span>
        <h1 className="font-display text-3xl md:text-4xl text-goldBright mt-2">
          {topic.title}
        </h1>
        <p className="text-muted mt-3">აირჩიეთ ქვეთემა, რომ დაიწყოთ ტესტი.</p>
      </div>

      <div className="grid gap-4">
        {topic.subtopics.map((sub) => (
          <Link
            key={sub.slug}
            href={`/abiturientebi/${topic.slug}/${sub.slug}`}
            className="block rounded-lg border border-gold/15 bg-panel p-5 hover:border-goldBright transition-colors"
          >
            <h2 className="font-display text-lg text-goldBright">{sub.title}</h2>
            <p className="text-xs text-gold mt-2">{sub.questions.length} კითხვა →</p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/abiturientebi" className="text-gold hover:text-goldBright text-sm">
          ← სხვა თემის არჩევა
        </Link>
      </div>
    </section>
  );
}

