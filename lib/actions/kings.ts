"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/get-profile";

export type BioSection = { heading: string; text: string };

export type UpdateKingInput = {
  slug: string;
  name?: string;
  reign?: string;
  dynasty?: string;
  ordinal?: string;
  summary?: string;
  bio?: string;
  image?: string;
  tags?: string[];
  bio_sections?: BioSection[];
  sources?: string;
};

export async function updateKing(input: UpdateKingInput) {
  const profile = await getCurrentProfile();

  if (!profile || (profile.role !== "editor" && profile.role !== "admin")) {
    return { error: "მხოლოდ რედაქტორებს შეუძლიათ ცვლილებების შენახვა." };
  }

  const supabase = await createClient();
  const { slug, ...fields } = input;

  const { error } = await supabase
    .from("kings")
    .update({ ...fields, updated_by: profile.id })
    .eq("slug", slug);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/kings/${slug}`);
  return { success: true };
}

export async function requestEditorAccess(message: string) {
  const profile = await getCurrentProfile();

  if (!profile) {
    return { error: "ჯერ უნდა გაიაროთ ავტორიზაცია." };
  }

  if (profile.role === "editor" || profile.role === "admin") {
    return { error: "თქვენ უკვე ხართ რედაქტორი." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("editor_requests")
    .insert({ user_id: profile.id, message });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
