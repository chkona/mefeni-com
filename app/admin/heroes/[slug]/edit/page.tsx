import { notFound, redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { getHeroBySlug } from "@/lib/data/get-heroes";
import { HeroEditForm } from "@/components/hero-edit-form";

export default async function EditHeroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getCurrentProfile();
  if (!profile) redirect(/login?next=/admin/heroes/${slug}/edit);
  if (profile.role !== "editor" && profile.role !== "admin") redirect("/admin/request-access");

  const hero = await getHeroBySlug(slug);
  if (!hero) notFound();

  return (
    <div className="mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-xl font-semibold mb-6">რედაქტირება — {hero.name}</h1>
      <HeroEditForm hero={hero} isNew={false} />
    </div>
  );
}
