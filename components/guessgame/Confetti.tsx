"use client";

const COLORS = ["#c9a227", "#eecd76", "#5c1a1a", "#8a2a2a", "#e9e2d0"];

export default function Confetti({ count = 60 }: { count?: number }) {
  const pieces = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 0.6;
    const duration = 2.2 + Math.random() * 1.6;
    const size = 6 + Math.random() * 6;
    const color = COLORS[i % COLORS.length];
    const rotate = Math.random() * 360;
    return { left, delay, duration, size, color, rotate, key: i };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[70]" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.key}
          className="absolute top-0 animate-confetti"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.5,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

