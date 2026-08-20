"use client";

import { useState } from "react";
import { requestEditorAccess } from "@/lib/actions/kings";

export default function RequestAccessPage() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    const res = await requestEditorAccess(message);
    setSending(false);
    setResult(
      res.error ? res.error : "მოთხოვნა გაიგზავნა. დაელოდეთ დადასტურებას."
    );
  }

  return (
    <div className="mx-auto max-w-sm py-16 px-4">
      <h1 className="text-xl font-semibold mb-2">რედაქტორის სტატუსის მოთხოვნა</h1>
      <p className="text-sm text-neutral-600 mb-6">
        თუ გინდა, რომ შეგეძლოს გვერდების რედაქტირება, გამოგზავნე მოთხოვნა —
        ადმინისტრატორი განიხილავს.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={4}
          placeholder="რატომ გინდა რედაქტორობა? (არასავალდებულო)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded bg-neutral-900 text-white py-2 text-sm font-medium disabled:opacity-50"
        >
          {sending ? "..." : "მოთხოვნის გაგზავნა"}
        </button>
      </form>
      {result && <p className="mt-4 text-sm">{result}</p>}
    </div>
  );
}
