import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { KingEditForm } from "@/components/king-edit-form";

export default async function EditKingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect(`/login?next=/admin/kings/${slug}/edit`);
  }

  if (profile.role !== "editor" && profile.role !== "admin") {
    redirect("/admin/request-access");
  }

  const supabase = await createClient();
  const { data: king } = await supabase
    .from("kings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!king) notFound();

  return (
    <div className="mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-xl font-semibold mb-6">რედაქტირება — {king.name}</h1>
      <KingEditForm king={king} />
    </div>
  );
}
