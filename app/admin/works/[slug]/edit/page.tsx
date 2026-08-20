import { notFound, redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { getWorkBySlug } from "@/lib/data/get-works";
import { WorkEditForm } from "@/components/work-edit-form";

export default async function EditWorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getCurrentProfile();
  if (!profile) redirect(`/login?next=/admin/works/${slug}/edit`);
  if (profile.role !== "editor" && profile.role !== "admin") redirect("/admin/request-access");

  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <div className="mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-xl font-semibold mb-6">რედაქტირება — {work.title}</h1>
      <WorkEditForm work={work} isNew={false} />
    </div>
  );
}
