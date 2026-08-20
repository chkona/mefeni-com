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
