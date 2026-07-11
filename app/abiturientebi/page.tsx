import { notFound } from "next/navigation";
import { examTopics, getTopic } from "@/lib/data/exam-questions";
import ExamRunner from "@/components/ExamRunner";

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
      </div>
      <ExamRunner topic={topic} />
    </section>
  );
}

