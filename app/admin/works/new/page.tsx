import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { WorkEditForm } from "@/components/work-edit-form";

export default async function NewWorkPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?next=/admin/works/new");
  if (profile.role !== "editor" && profile.role !== "admin") redirect("/admin/request-access");

  return (
    <div className="mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-xl font-semibold mb-6">ახალი ნაშრომის დამატება</h1>
      <WorkEditForm work={{}} isNew />
    </div>
  );
}
