import { createClient } from "@/lib/supabase/server";

export type Hero = {
  slug: string;
  name: string;
  era: string;
  image: string;
  summary: string;
  bio: string;
  bio_sections: { heading: string; text: string }[];
  sources: string;
  tags: string[];
  order: number;
};

export async function getAllHeroes(): Promise<Hero[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("heroes")
    .select("*")
    .order("order", { ascending: true });
  if (error) { console.error(error.message); return []; }
  return data as Hero[];
}

export async function getHeroBySlug(slug: string): Promise<Hero | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("heroes")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data as Hero;
}
