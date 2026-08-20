import { createClient } from "@supabase/supabase-js";
import { kings } from "../lib/data/kings";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "საჭიროა NEXT_PUBLIC_SUPABASE_URL და SUPABASE_SERVICE_ROLE_KEY environment-ში."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function migrate() {
  console.log(`ვტვირთავ ${kings.length} ჩანაწერს...`);

  const batchSize = 100;
  for (let i = 0; i < kings.length; i += batchSize) {
    const batch = kings.slice(i, i + batchSize).map((k) => ({
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
    }));

    const { error } = await supabase.from("kings").upsert(batch, {
      onConflict: "slug",
    });

    if (error) {
      console.error(`შეცდომა batch ${i}-ზე:`, error.message);
      process.exit(1);
    }

    console.log(`  ${Math.min(i + batchSize, kings.length)}/${kings.length}`);
  }

  console.log("მიგრაცია დასრულდა.");
}

migrate();
