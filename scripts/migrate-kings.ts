// scripts/migrate-kings.mjs
//
// ერთჯერადი სკრიპტი: lib/data/kings.ts-ის მონაცემებს Supabase-ის
// "kings" ცხრილში ჩატვირთავს.
//
// გამოყენება:
//   1. დააკოპირეთ ეს ფაილი პროექტის root-ში `scripts/migrate-kings.mjs`
//   2. დარწმუნდით რომ .env.local-ში გაქვთ:
//        NEXT_PUBLIC_SUPABASE_URL=...
//        SUPABASE_SERVICE_ROLE_KEY=...   (service role, არა anon key!)
//      (service role key Supabase Dashboard → Settings → API-ში)
//   3. გაუშვით:  node --env-file=.env.local scripts/migrate-kings.mjs
//
// შენიშვნა: service role key ტოვებს RLS-ს გვერდი, ამიტომ
// ეს სკრიპტი მხოლოდ ლოკალურად/CI-ში გაუშვით, არასდროს ბრაუზერში.

import { createClient } from "@supabase/supabase-js";
import { kings } from "../lib/data/kings.ts";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "❌ აკლია NEXT_PUBLIC_SUPABASE_URL ან SUPABASE_SERVICE_ROLE_KEY .env.local-ში"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function migrate() {
  console.log(`მოიძებნა ${kings.length} მეფე lib/data/kings.ts-ში. ვიწყებთ ატვირთვას...`);

  // ბატჩებად ვტვირთავთ (100 ჩანაწერი თითო ბატჩში), rate-limit-ის ასარიდებლად
  const BATCH_SIZE = 100;
  let inserted = 0;
  let failed = [];

  for (let i = 0; i < kings.length; i += BATCH_SIZE) {
    const batch = kings.slice(i, i + BATCH_SIZE).map((k) => ({
      slug: k.slug,
      name: k.name,
      reign: k.reign ?? "",
      dynasty: k.dynasty ?? "",
      ordinal: k.ordinal ?? "",
      era: k.era,
      order: k.order,
      image: k.image ?? "",
      summary: k.summary ?? "",
      bio: k.bio ?? "",
      tags: k.tags ?? [],
    }));

    const { error } = await supabase
      .from("kings")
      .upsert(batch, { onConflict: "slug" });

    if (error) {
      console.error(`❌ ბატჩი ${i}-${i + batch.length} ჩავარდა:`, error.message);
      failed.push(...batch.map((b) => b.slug));
    } else {
      inserted += batch.length;
      console.log(`✅ ჩაიტვირთა ${inserted}/${kings.length}`);
    }
  }

  console.log("\n--- დასრულდა ---");
  console.log(`სულ წარმატებული: ${inserted}`);
  if (failed.length) {
    console.log(`ჩავარდნილი slug-ები (${failed.length}):`, failed.join(", "));
  } else {
    console.log("ყველა ჩანაწერი წარმატებით აიტვირთა 🎉");
  }
}

migrate().catch((err) => {
  console.error("სკრიპტი ჩავარდა:", err);
  process.exit(1);
});
