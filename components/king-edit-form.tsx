"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateKing, type UpdateKingInput } from "@/lib/actions/kings";

type King = {
  slug: string;
  name: string;
  reign: string;
  dynasty: string;
  ordinal: string;
  summary: string;
  bio: string;
  image: string;
};

export function KingEditForm({ king }: { king: King }) {
  const router = useRouter();
  const [form, setForm] = useState<King>(king);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function field<K extends keyof King>(key: K) {
    return {
      value: form[key] ?? "",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const payload: UpdateKingInput = { ...form, slug: form.slug };
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
      <div>
        <label className="block text-sm mb-1">სრული ბიოგრაფია</label>
        <textarea rows={10} className="w-full rounded border px-3 py-2 text-sm" {...field("bio")} />
      </div>
      <div>
        <label className="block text-sm mb-1">სურათის მისამართი</label>
        <input className="w-full rounded border px-3 py-2 text-sm" {...field("image")} />
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
