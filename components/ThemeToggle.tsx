"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("mefeni-theme", next ? "light" : "dark");
    } catch {
      // ლოკალური მეხსიერების გარეშეც იმუშავებს, უბრალოდ არ დაიმახსოვრებს არჩევანს
    }
  }

  // სერვერზე რენდერისას ჯერ არაფერი ვიცით რეალურ თემაზე — ცარიელი ადგილი
  // ვტოვებთ განლაგების "აცმენდის" თავიდან ასაცილებლად.
  if (!mounted) {
    return <span className="w-9 h-9 inline-block" aria-hidden />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? "ბნელ თემაზე გადართვა" : "ღია თემაზე გადართვა"}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-gold/25 text-gold hover:border-goldBright hover:text-goldBright transition-colors"
    >
      {isLight ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}

