import { getWorkBySlug } from "@/lib/data/get-works";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 0;

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) return notFound();

  const profile = await getCurrentProfile();
  const canEdit = profile?.role === "editor" || profile?.role === "admin";

  if (work.status !== "published" && !canEdit) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-num text-xs tracking-widest uppercase text-gold">{work.category}</span>
          <h1 className="font-display text-3xl md:text-4xl text-goldBright mt-2">{work.title}</h1>
          <p className="text-muted mt-2">{work.author}</p>
          {work.status === "draft" && (
            <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-500">დრაფტი — მხოლოდ რედაქტორები ხედავენ</span>
          )}
        </div>
        {canEdit && (
          <Link href={`/admin/works/${work.slug}/edit`} className="shrink-0 rounded border border-gold/30 px-3 py-1.5 text-sm text-gold hover:bg-gold/10">
            რედაქტირება
          </Link>
        )}
      </div>
      <p className="mt-8 leading-relaxed text-ink/90 whitespace-pre-line">{work.content}</p>
    </article>
  );
}
