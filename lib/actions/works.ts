"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/get-profile";

export type WorkInput = {
  slug?: string;
  title: string;
  author?: string;
  summary?: string;
  content?: string;
  category?: string;
  image?: string;
  status?: "draft" | "published";
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\u10D0-\u10FFa-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createWork(input: WorkInput) {
  const profile = await getCurrentProfile();
  if (!profile || (profile.role !== "editor" && profile.role !== "admin")) {
    return { error: "მხოლოდ რედაქტორებს შეუძლიათ ნაშრომის დამატება." };
  }
  const supabase = await createClient();
  const slug = input.slug?.trim() || slugify(input.title) + "-" + Date.now().toString(36);

  const { error } = await supabase.from("works").insert({
    ...input,
    slug,
    created_by: profile.id,
  });

  if (error) return { error: error.message };
  revalidatePath("/works");
  redirect(`/works/${slug}`);
}

export async function updateWork(slug: string, input: WorkInput) {
  const profile = await getCurrentProfile();
  if (!profile || (profile.role !== "editor" && profile.role !== "admin")) {
    return { error: "მხოლოდ რედაქტორებს შეუძლიათ ჩასწორება." };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("works")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("slug", slug);

  if (error) return { error: error.message };
  revalidatePath(`/works/${slug}`);
  return { success: true };
}

export async function deleteWork(slug: string) {
  const profile = await getCurrentProfile();
  if (!profile || (profile.role !== "editor" && profile.role !== "admin")) {
    return { error: "მხოლოდ რედაქტორებს შეუძლიათ წაშლა." };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("works").delete().eq("slug", slug);
  if (error) return { error: error.message };
  revalidatePath("/works");
  redirect("/works");
}
