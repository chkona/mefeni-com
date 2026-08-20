import { createClient } from "@/lib/supabase/server";

export type King = {
  slug: string;
  name: string;
  reign: string;
  dynasty: string;
  ordinal: string;
  era: string;
  order: number;
  image: string;
  summary: string;
  bio: string;
  tags: string[];
  bio_sections: any[];
  sources: string;
};

export async function getAllKings(): Promise<King[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("kings")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error("getAllKings error:", error.message);
    return [];
  }

  return data as King[];
}

export async function getKingBySlug(slug: string): Promise<King | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("kings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as King;
}
