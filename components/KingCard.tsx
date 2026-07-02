import Link from "next/link";
import { King } from "@/lib/data/kings";

export default function KingCard({ king }: { king: King }) {
  return (
    <Link href={`/kings/${king.slug}`} className="glass-card block p-7">
      <div className="flex justify-between items-start mb-4">
        <div className="w-11 h-11 rounded-full border border-gold flex items-center justify-center font-num text-goldBright">
          {king.ordinal}
        </div>
        <span className="font-num text-[0.65rem] tracking-widest uppercase text-muted text-right">
          {king.dynasty}<br />დინასტია
        </span>
      </div>
      <h3 className="font-display text-xl text-goldBright mb-1">{king.name}</h3>
      <span className="font-num text-xs text-muted block mb-3">{king.reign}</span>
      <p className="text-sm opacity-85">{king.summary}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {king.tags.map((t) => (
          <span key={t} className="text-[0.65rem] px-2.5 py-1 border border-gold/20 rounded-full text-muted">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
