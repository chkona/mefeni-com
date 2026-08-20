mkdir -p lib/actions "app/works/[slug]" "app/admin/works/new" "app/admin/works/[slug]/edit"

cat > lib/data/get-works.ts << 'EOF'
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
EOF

cat > lib/actions/works.ts << 'EOF'
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
EOF

cat > components/work-edit-form.tsx << 'EOF'
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWork, updateWork, deleteWork, type WorkInput } from "@/lib/actions/works";

type Work = {
  slug?: string;
  title: string;
  author: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  status: "draft" | "published";
};

export function WorkEditForm({ work, isNew }: { work: Partial<Work>; isNew: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: work.title ?? "",
    author: work.author ?? "",
    summary: work.summary ?? "",
    content: work.content ?? "",
    category: work.category ?? "",
    image: work.image ?? "",
    status: work.status ?? "draft",
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const payload: WorkInput = { ...form };
    const result = isNew
      ? await createWork(payload)
      : await updateWork(work.slug!, payload);

    setSaving(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  async function handleDelete() {
    if (!work.slug) return;
    if (!confirm("დარწმუნებული ხარ რომ გინდა წაშლა?")) return;
    await deleteWork(work.slug);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">სათაური</label>
        <input className="w-full rounded border px-3 py-2 text-sm" required {...field("title")} />
      </div>
      <div>
        <label className="block text-sm mb-1">ავტორი</label>
        <input className="w-full rounded border px-3 py-2 text-sm" {...field("author")} />
      </div>
      <div>
        <label className="block text-sm mb-1">კატეგორია</label>
        <input className="w-full rounded border px-3 py-2 text-sm" {...field("category")} />
      </div>
      <div>
        <label className="block text-sm mb-1">მოკლე აღწერა</label>
        <textarea rows={3} className="w-full rounded border px-3 py-2 text-sm" {...field("summary")} />
      </div>
      <div>
        <label className="block text-sm mb-1">სრული ტექსტი</label>
        <textarea rows={12} className="w-full rounded border px-3 py-2 text-sm" {...field("content")} />
      </div>
      <div>
        <label className="block text-sm mb-1">სურათის მისამართი (არასავალდებულო)</label>
        <input className="w-full rounded border px-3 py-2 text-sm" {...field("image")} />
      </div>
      <div>
        <label className="block text-sm mb-1">სტატუსი</label>
        <select
          className="w-full rounded border px-3 py-2 text-sm"
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "draft" | "published" }))}
        >
          <option value="draft">დრაფტი (მხოლოდ რედაქტორები ხედავენ)</option>
          <option value="published">გამოქვეყნებული (ყველა ხედავს)</option>
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-600">შენახულია.</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="rounded bg-neutral-900 text-white px-4 py-2 text-sm font-medium disabled:opacity-50">
          {saving ? "ინახება..." : isNew ? "გამოქვეყნება/შენახვა" : "შენახვა"}
        </button>
        {!isNew && (
          <button type="button" onClick={handleDelete} className="text-sm text-red-600 hover:underline">
            წაშლა
          </button>
        )}
      </div>
    </form>
  );
}
EOF

cat > app/works/page.tsx << 'EOF'
import Link from "next/link";
import { getPublishedWorks } from "@/lib/data/get-works";
import { isEditor } from "@/lib/auth/get-profile";

export const revalidate = 0;

export default async function WorksPage() {
  const works = await getPublishedWorks();
  const canEdit = await isEditor();

  return (
    <main className="min-h-screen bg-void px-4 py-10 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-goldBright">ნაშრომები</h1>
          {canEdit && (
            <Link href="/admin/works/new" className="rounded border border-gold/30 px-3 py-1.5 text-sm text-gold hover:bg-gold/10">
              + ახალი ნაშრომი
            </Link>
          )}
        </div>
        {works.length === 0 ? (
          <p className="text-muted mt-6">ჯერ არაფერი გამოქვეყნებულა.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {works.map((w) => (
              <Link
                key={w.slug}
                href={`/works/${w.slug}`}
                className="block border border-gold/15 rounded-lg p-4 hover:border-gold/40 transition"
              >
                <span className="text-xs text-gold uppercase tracking-wide">{w.category}</span>
                <h2 className="text-lg text-goldBright font-display mt-1">{w.title}</h2>
                <p className="text-sm text-muted mt-1">{w.author}</p>
                {w.summary && <p className="text-sm text-ink/80 mt-2 line-clamp-2">{w.summary}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
EOF

cat > "app/works/[slug]/page.tsx" << 'EOF'
import { getWorkBySlug } from "@/lib/data/get-works";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 0;

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) return notFound();

  const profile = await getCurrentProfile();
  const canEdit = profile?.role === "editor" || profile?.role === "admin";

  if (work.status !== "published" && !canEdit) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-num text-xs tracking-widest uppercase text-gold">{work.category}</span>
          <h1 className="font-display text-3xl md:text-4xl text-goldBright mt-2">{work.title}</h1>
          <p className="text-muted mt-2">{work.author}</p>
          {work.status === "draft" && (
            <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-500">დრაფტი — მხოლოდ რედაქტორები ხედავენ</span>
          )}
        </div>
        {canEdit && (
          <Link href={`/admin/works/${work.slug}/edit`} className="shrink-0 rounded border border-gold/30 px-3 py-1.5 text-sm text-gold hover:bg-gold/10">
            რედაქტირება
          </Link>
        )}
      </div>
      <p className="mt-8 leading-relaxed text-ink/90 whitespace-pre-line">{work.content}</p>
    </article>
  );
}
EOF

cat > app/admin/works/new/page.tsx << 'EOF'
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { WorkEditForm } from "@/components/work-edit-form";

export default async function NewWorkPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?next=/admin/works/new");
  if (profile.role !== "editor" && profile.role !== "admin") redirect("/admin/request-access");

  return (
    <div className="mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-xl font-semibold mb-6">ახალი ნაშრომის დამატება</h1>
      <WorkEditForm work={{}} isNew />
    </div>
  );
}
EOF

cat > "app/admin/works/[slug]/edit/page.tsx" << 'EOF'
import { notFound, redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { getWorkBySlug } from "@/lib/data/get-works";
import { WorkEditForm } from "@/components/work-edit-form";

export default async function EditWorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getCurrentProfile();
  if (!profile) redirect(`/login?next=/admin/works/${slug}/edit`);
  if (profile.role !== "editor" && profile.role !== "admin") redirect("/admin/request-access");

  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <div className="mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-xl font-semibold mb-6">რედაქტირება — {work.title}</h1>
      <WorkEditForm work={work} isNew={false} />
    </div>
  );
}
EOF

echo "works files done"
