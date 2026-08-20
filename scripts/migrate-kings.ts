import { createClient } from "@supabase/supabase-js";
import { kings } from "../lib/data/kings";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function migrate() {
  const batch = (kings as any[]).map((k) => ({
    slug: k.slug,
    name: k.name,
    reign: k.reign,
    dynasty: k.dynasty,
    ordinal: k.ordinal,
    era: k.era,
    order: k.order,
    image: k.image,
    summary: k.summary,
    bio: k.bio,
    tags: k.tags,
    bio_sections: k.bioSections ?? [],
    sources: k.sources ?? "",
  }));

  for (let i = 0; i < batch.length; i += 100) {
    const chunk = batch.slice(i, i + 100);
    const { error } = await supabase.from("kings").upsert(chunk, { onConflict: "slug" });
    if (error) { console.error(error.message); process.exit(1); }
    console.log(`${Math.min(i + 100, batch.length)}/${batch.length}`);
  }
  console.log("დასრულდა.");
}
migrate();
