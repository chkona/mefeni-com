"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-sm py-16 px-4">
        <h1 className="text-xl font-semibold mb-2">დაადასტურე ელფოსტა</h1>
        <p className="text-sm text-neutral-600">
          გამოგზავნეთ დასტურის ბმული თქვენს ელფოსტაზე. გახსენით და
          დააჭირეთ, რომ ანგარიში გააქტიურდეს.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm py-16 px-4">
      <h1 className="text-xl font-semibold mb-6">რეგისტრაცია</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">ელფოსტა</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">პაროლი</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-neutral-900 text-white py-2 text-sm font-medium disabled:opacity-50"
        >
          {loading ? "..." : "რეგისტრაცია"}
        </button>
      </form>
      <p className="mt-4 text-sm text-neutral-600">
        უკვე გაქვს ანგარიში?{" "}
        <a href="/login" className="underline">
          შესვლა
        </a>
      </p>
    </div>
  );
}
