"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/get-profile";

export type HeroInput = {
  slug: string;
  name: string;
  era?: string;
  image?: string;
  summary?: string;
  bio?: string;
  bio_sections?: { heading: string; text: string }[];
  sources?: string;
  tags?: string[];
  order?: number;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\u10D0-\u10FFa-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createHero(input: HeroInput) {
  const profile = await getCurrentProfile();
  if (!profile || (profile.role !== "editor" && profile.role !== "admin")) {
    return { error: "მხოლოდ რედაქტორებს შეუძლიათ დამატება." };
  }
  const supabase = await createClient();
  const slug = input.slug?.trim() || slugify(input.name);

  const { error } = await supabase.from("heroes").insert({
    ...input,
    slug,
    updated_by: profile.id,
  });

  if (error) return { error: error.message };
  revalidatePath("/heroes");
  redirect(/heroes/${slug});
}

export async function updateHero(input: HeroInput) {
  const profile = await getCurrentProfile();
  if (!profile || (profile.role !== "editor" && profile.role !== "admin")) {
    return { error: "მხოლოდ რედაქტორებს შეუძლიათ ჩასწორება." };
  }
  const supabase = await createClient();
  const { slug, ...fields } = input;

  const { error } = await supabase
    .from("heroes")
    .update({ ...fields, updated_by: profile.id })
    .eq("slug", slug);

  if (error) return { error: error.message };
  revalidatePath(/heroes/${slug});
  return { success: true };
}

export async function deleteHero(slug: string) {
  const profile = await getCurrentProfile();
  if (!profile || (profile.role !== "editor" && profile.role !== "admin")) {
    return { error: "მხოლოდ რედაქტორებს შეუძლიათ წაშლა." };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("heroes").delete().eq("slug", slug);
  if (error) return { error: error.message };
  revalidatePath("/heroes");
  redirect("/heroes");
}
