"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateKing, type UpdateKingInput, type BioSection } from "@/lib/actions/kings";

type King = {
  slug: string;
  name: string;
  reign: string;
  dynasty: string;
  ordinal: string;
  summary: string;
  bio: string;
  image: string;
  bio_sections?: BioSection[];
  sources?: string;
};

export function KingEditForm({ king }: { king: King }) {
  const router = useRouter();
  const [form, setForm] = useState({
    ...king,
    bio_sections: king.bio_sections && king.bio_sections.length > 0
      ? king.bio_sections
      : [],
    sources: king.sources ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function field<K extends keyof typeof form>(key: K) {
    return {
      value: (form[key] as string) ?? "",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  function updateSection(index: number, key: keyof BioSection, value: string) {
    setForm((f) => {
      const sections = [...f.bio_sections];
      sections[index] = { ...sections[index], [key]: value };
      return { ...f, bio_sections: sections };
    });
  }

  function addSection() {
    setForm((f) => ({
      ...f,
      bio_sections: [...f.bio_sections, { heading: "", text: "" }],
    }));
  }

  function removeSection(index: number) {
    setForm((f) => ({
      ...f,
      bio_sections: f.bio_sections.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const payload: UpdateKingInput = {
      slug: form.slug,
      name: form.name,
      reign: form.reign,
      dynasty: form.dynasty,
      ordinal: form.ordinal,
      summary: form.summary,
      bio: form.bio,
      image: form.image,
      bio_sections: form.bio_sections,
      sources: form.sources,
    };
    const result = await updateKing(payload);

    setSaving(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">სახელი</label>
        <input className="w-full rounded border px-3 py-2 text-sm" {...field("name")} />
      </div>
      <div>
        <label className="block text-sm mb-1">მეფობის წლები</label>
        <input className="w-full rounded border px-3 py-2 text-sm" {...field("reign")} />
      </div>
      <div>
        <label className="block text-sm mb-1">დინასტია</label>
        <input className="w-full rounded border px-3 py-2 text-sm" {...field("dynasty")} />
      </div>
      <div>
        <label className="block text-sm mb-1">რიგითი ნომერი (I, II, III...)</label>
        <input className="w-full rounded border px-3 py-2 text-sm" {...field("ordinal")} />
      </div>
      <div>
        <label className="block text-sm mb-1">მოკლე აღწერა</label>
        <textarea rows={3} className="w-full rounded border px-3 py-2 text-sm" {...field("summary")} />
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium">
            ბიოგრაფიის სექციები (სათაური + ტექსტი)
          </label>
          <button
            type="button"
            onClick={addSection}
            className="text-sm rounded border px-3 py-1 hover:bg-neutral-100"
          >
            + სექციის დამატება
          </button>
        </div>

        {form.bio_sections.length === 0 && (
          <p className="text-sm text-neutral-500 mb-3">
            სექციები არ არის — ქვემოთ "სრული ბიოგრაფია" ველი გამოჩნდება ჩვეულებრივ, ერთიან ტექსტად.
          </p>
        )}

        <div className="space-y-4">
          {form.bio_sections.map((sec, i) => (
            <div key={i} className="border rounded p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">სექცია {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeSection(i)}
                  className="text-xs text-red-600 hover:underline"
                >
                  წაშლა
                </button>
              </div>
              <input
                placeholder="სათაური (მაგ. წარმოშობა და ოჯახი)"
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
        <label className="block text-sm mb-1">
          სრული ბიოგრაფია (გამოჩნდება მხოლოდ თუ ზემოთ სექციები ცარიელია)
        </label>
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

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-neutral-900 text-white px-4 py-2 text-sm font-medium disabled:opacity-50"
      >
        {saving ? "ინახება..." : "შენახვა"}
      </button>
    </form>
  );
}
