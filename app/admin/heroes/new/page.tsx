import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { HeroEditForm } from "@/components/hero-edit-form";

export default async function NewHeroPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?next=/admin/heroes/new");
  if (profile.role !== "editor" && profile.role !== "admin") redirect("/admin/request-access");

  return (
    <div className="mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-xl font-semibold mb-6">ახალი გმირის დამატება</h1>
      <HeroEditForm hero={{}} isNew />
    </div>
  );
}
