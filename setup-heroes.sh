mkdir -p lib/actions "app/heroes/[slug]" "app/admin/heroes/new" "app/admin/heroes/[slug]/edit"

cat > lib/data/get-heroes.ts << 'EOF'
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
EOF

cat > lib/actions/heroes.ts << 'EOF'
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
  redirect(`/heroes/${slug}`);
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
  revalidatePath(`/heroes/${slug}`);
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
EOF

cat > components/hero-edit-form.tsx << 'EOF'
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createHero, updateHero, deleteHero, type HeroInput } from "@/lib/actions/heroes";

type Hero = {
  slug: string;
  name: string;
  era: string;
  image: string;
  summary: string;
  bio: string;
  bio_sections: { heading: string; text: string }[];
  sources: string;
};

export function HeroEditForm({ hero, isNew }: { hero: Partial<Hero>; isNew: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: hero.slug ?? "",
    name: hero.name ?? "",
    era: hero.era ?? "",
    image: hero.image ?? "",
    summary: hero.summary ?? "",
    bio: hero.bio ?? "",
    bio_sections: hero.bio_sections ?? [],
    sources: hero.sources ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function field<K extends keyof typeof form>(key: K) {
    return {
      value: (form[key] as string) ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  function updateSection(i: number, key: "heading" | "text", value: string) {
    setForm((f) => {
      const s = [...f.bio_sections];
      s[i] = { ...s[i], [key]: value };
      return { ...f, bio_sections: s };
    });
  }
  function addSection() {
    setForm((f) => ({ ...f, bio_sections: [...f.bio_sections, { heading: "", text: "" }] }));
  }
  function removeSection(i: number) {
    setForm((f) => ({ ...f, bio_sections: f.bio_sections.filter((_, idx) => idx !== i) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const payload: HeroInput = { ...form };
    const result = isNew ? await createHero(payload) : await updateHero(payload);

    setSaving(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("დარწმუნებული ხარ რომ გინდა წაშლა?")) return;
    await deleteHero(form.slug);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isNew && (
        <div>
          <label className="block text-sm mb-1">Slug (ლათინურად, უნიკალური, არასავალდებულო — თუ ცარიელია სახელიდან გამოითვლება)</label>
          <input className="w-full rounded border px-3 py-2 text-sm" {...field("slug")} />
        </div>
      )}
      <div>
        <label className="block text-sm mb-1">სახელი</label>
        <input className="w-full rounded border px-3 py-2 text-sm" required {...field("name")} />
      </div>
      <div>
        <label className="block text-sm mb-1">ეპოქა/პერიოდი</label>
        <input className="w-full rounded border px-3 py-2 text-sm" {...field("era")} />
      </div>
      <div>
        <label className="block text-sm mb-1">მოკლე აღწერა</label>
        <textarea rows={3} className="w-full rounded border px-3 py-2 text-sm" {...field("summary")} />
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium">ბიოგრაფიის სექციები</label>
          <button type="button" onClick={addSection} className="text-sm rounded border px-3 py-1 hover:bg-neutral-100">
            + სექციის დამატება
          </button>
        </div>
        <div className="space-y-4">
          {form.bio_sections.map((sec, i) => (
            <div key={i} className="border rounded p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">სექცია {i + 1}</span>
                <button type="button" onClick={() => removeSection(i)} className="text-xs text-red-600 hover:underline">
                  წაშლა
                </button>
              </div>
              <input
                placeholder="სათაური"
                className="w-full rounded border px-3 py-2 text-sm"
                value={sec.heading}
                onChange={(e) => updateSection(i, "heading", e.target.value)}
              />
              <textarea
                placeholder="ტექსტი"
                rows={5}
                className="w-full rounded border px-3 py-2 text-sm"
                value={sec.text}
                onChange={(e) => updateSection(i, "text", e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <label className="block text-sm mb-1">სრული ბიოგრაფია (თუ სექციები ცარიელია)</label>
        <textarea rows={8} className="w-full rounded border px-3 py-2 text-sm" {...field("bio")} />
      </div>
      <div>
        <label className="block text-sm mb-1">სურათის მისამართი</label>
        <input className="w-full rounded border px-3 py-2 text-sm" {...field("image")} />
      </div>
      <div>
        <label className="block text-sm mb-1">წყაროები</label>
        <textarea rows={3} className="w-full rounded border px-3 py-2 text-sm" {...field("sources")} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-600">შენახულია.</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="rounded bg-neutral-900 text-white px-4 py-2 text-sm font-medium disabled:opacity-50">
          {saving ? "ინახება..." : isNew ? "დამატება" : "შენახვა"}
        </button>
        {!isNew && (
          <button type="button" onClick={handleDelete} className="text-sm text-red-600 hover:underline">
            გმირის წაშლა
          </button>
        )}
      </div>
    </form>
  );
}
EOF

cat > app/heroes/page.tsx << 'EOF'
import Link from "next/link";
import { getAllHeroes } from "@/lib/data/get-heroes";
import { isEditor } from "@/lib/auth/get-profile";

export const revalidate = 0;

export default async function HeroesPage() {
  const heroes = await getAllHeroes();
  const canEdit = await isEditor();

  return (
    <main className="min-h-screen bg-void px-4 py-10 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-goldBright">გმირები</h1>
          {canEdit && (
            <Link href="/admin/heroes/new" className="rounded border border-gold/30 px-3 py-1.5 text-sm text-gold hover:bg-gold/10">
              + ახალი გმირი
            </Link>
          )}
        </div>
        {heroes.length === 0 ? (
          <p className="text-muted mt-6">გვერდი ჯერ ცარიელია — მალე დაემატება.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {heroes.map((h) => (
              <Link
                key={h.slug}
                href={`/heroes/${h.slug}`}
                className="block border border-gold/15 rounded-lg p-4 hover:border-gold/40 transition"
              >
                <h2 className="text-lg text-goldBright font-display">{h.name}</h2>
                <p className="text-sm text-muted mt-1">{h.era}</p>
                {h.summary && <p className="text-sm text-ink/80 mt-2 line-clamp-2">{h.summary}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
EOF

cat > "app/heroes/[slug]/page.tsx" << 'EOF'
import { getHeroBySlug } from "@/lib/data/get-heroes";
import { isEditor } from "@/lib/auth/get-profile";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

export default async function HeroDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hero = await getHeroBySlug(slug);
  if (!hero) return notFound();
  const canEdit = await isEditor();

  return (
    <article>
      {hero.image && (
        <div className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden">
          <Image src={hero.image} alt={hero.name} fill priority className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-3xl mx-auto">
            <span className="font-num text-xs tracking-widest uppercase text-gold">{hero.era}</span>
            <h1 className="font-display text-4xl md:text-6xl text-goldBright mt-2 drop-shadow-lg">{hero.name}</h1>
          </div>
        </div>
      )}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-start justify-between gap-4">
          <div>
            {!hero.image && (
              <>
                <span className="font-num text-xs tracking-widest uppercase text-gold">{hero.era}</span>
                <h1 className="font-display text-4xl md:text-5xl text-goldBright mt-3">{hero.name}</h1>
              </>
            )}
          </div>
          {canEdit && (
            <Link href={`/admin/heroes/${hero.slug}/edit`} className="shrink-0 rounded border border-gold/30 px-3 py-1.5 text-sm text-gold hover:bg-gold/10">
              რედაქტირება
            </Link>
          )}
        </div>

        {hero.bio_sections && hero.bio_sections.length > 0 ? (
          <div className="mt-8 space-y-6">
            {hero.bio_sections.map((sec, i) => (
              <div key={i}>
                <h2 className="font-display text-xl text-goldBright border-b border-gold/15 pb-2 mb-3">{sec.heading}</h2>
                <p className="leading-relaxed text-ink/90 whitespace-pre-line">{sec.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 leading-relaxed text-ink/90 whitespace-pre-line">{hero.bio}</p>
        )}

        <div className="mt-10 pt-6 border-t border-gold/20">
          <h2 className="font-num text-xs tracking-widest uppercase text-gold">წყაროები</h2>
          <p className="mt-2 text-sm text-muted whitespace-pre-line">
            {hero.sources && hero.sources.trim() !== "" ? hero.sources : "წყარო მალე დაემატება."}
          </p>
        </div>
      </section>
    </article>
  );
}
EOF

cat > app/admin/heroes/new/page.tsx << 'EOF'
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { HeroEditForm } from "@/components/hero-edit-form";

export default async function NewHeroPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?next=/admin/heroes/new");
  if (profile.role !== "editor" && profile.role !== "admin") redirect("/admin/request-access");

  return (
    <div className="mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-xl font-semibold mb-6">ახალი გმირის დამატება</h1>
      <HeroEditForm hero={{}} isNew />
    </div>
  );
}
EOF

cat > "app/admin/heroes/[slug]/edit/page.tsx" << 'EOF'
import { notFound, redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { getHeroBySlug } from "@/lib/data/get-heroes";
import { HeroEditForm } from "@/components/hero-edit-form";

export default async function EditHeroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getCurrentProfile();
  if (!profile) redirect(`/login?next=/admin/heroes/${slug}/edit`);
  if (profile.role !== "editor" && profile.role !== "admin") redirect("/admin/request-access");

  const hero = await getHeroBySlug(slug);
  if (!hero) notFound();

  return (
    <div className="mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-xl font-semibold mb-6">რედაქტირება — {hero.name}</h1>
      <HeroEditForm hero={hero} isNew={false} />
    </div>
  );
}
EOF

echo "heroes files done"
