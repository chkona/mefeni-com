import { createClient } from "@/lib/supabase/server";

export type Work = {
  id: string;
  slug: string;
  title: string;
  author: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  status: "draft" | "published";
  created_at: string;
};

export async function getPublishedWorks(): Promise<Work[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) { console.error(error.message); return []; }
  return data as Work[];
}

export async function getAllWorksForEditor(): Promise<Work[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error(error.message); return []; }
  return data as Work[];
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data as Work;
}
