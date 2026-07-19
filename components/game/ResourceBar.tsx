const ICONS: Record<string, string> = {
  support: "👑",
  army: "⚔️",
  treasury: "💰",
  economy: "🌾",
};

const LABELS: Record<string, string> = {
  support: "ხალხის მხარდაჭერა",
  army: "ჯარის ძალა",
  treasury: "ხაზინა",
  economy: "ეკონომიკა",
};

export default function ResourceBar({
  resKey,
  value,
  boosted,
}: {
  resKey: "support" | "army" | "treasury" | "economy";
  value: number;
  boosted?: boolean;
}) {
  const danger = value <= 20;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted flex items-center gap-1">
          <span>{ICONS[resKey]}</span> {LABELS[resKey]}
          {boosted && <span className="text-gold text-[10px]">+25%</span>}
        </span>
        <span className={`font-num text-xs ${danger ? "text-wineBright" : "text-goldBright"}`}>
          {Math.round(value)}
        </span>
      </div>
      <div className="w-full h-2 bg-panel2 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            danger ? "bg-wineBright" : "bg-gold"
          }`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

