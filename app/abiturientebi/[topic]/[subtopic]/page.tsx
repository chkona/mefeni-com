import { notFound } from "next/navigation";
import { examTopics, getSubtopic } from "@/lib/data/exam-questions";
import ExamRunner from "@/components/ExamRunner";

export function generateStaticParams() {
  return examTopics.flatMap((t) =>
    t.subtopics.map((s) => ({ topic: t.slug, subtopic: s.slug }))
  );
}

export default function ExamSubtopicPage({
  params,
}: {
  params: { topic: string; subtopic: string };
}) {
  const found = getSubtopic(params.topic, params.subtopic);
  if (!found) return notFound();
  const { topic, subtopic } = found;

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <span className="font-num text-xs tracking-widest uppercase text-gold">
          {topic.title}
        </span>
        <h1 className="font-display text-3xl md:text-4xl text-goldBright mt-2">
          {subtopic.title}
        </h1>
      </div>
      <ExamRunner topic={subtopic} />
    </section>
  );
}

