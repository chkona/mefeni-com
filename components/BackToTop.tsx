"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="ზემოთ დაბრუნება"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-gold text-void flex items-center justify-center shadow-lg shadow-black/30 hover:bg-goldBright transition-colors animate-fade-up"
      style={{ animationDuration: "0.3s" }}
    >
      <ArrowUp size={18} />
    </button>
  );
}

