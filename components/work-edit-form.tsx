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
