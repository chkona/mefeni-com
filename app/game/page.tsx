import Link from "next/link";

const GAMES = [
  {
    href: "/game/gaxde-mefe",
    emoji: "👑",
    title: "გახდი საქართველოს მეფე",
    description:
      "აირჩიეთ მეფე და მართეთ სამეფო — ყოველი გადაწყვეტილება მოქმედებს ხალხის მხარდაჭერაზე, ჯარზე, ხაზინასა და ეკონომიკაზე.",
  },
  {
    href: "/game/gamoicani-mefe",
    emoji: "🏆",
    title: "გამოიცანი რომელი მეფე ვარ",
    description:
      "გუნდური თამაში — მინიშნებები თანდათან უფრო ადვილი ხდება, გამოიცანით სახელი და მოიპოვეთ ქულები.",
  },
];

export default function GameHubPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <span className="font-num text-xs tracking-widest uppercase text-gold">
          თამაშები
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-goldBright mt-2">
          აირჩიეთ თამაში
        </h1>
      </div>

      <div className="grid gap-5">
        {GAMES.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="block rounded-lg border border-gold/15 bg-panel p-6 hover:border-goldBright transition-colors"
          >
            <h2 className="font-display text-2xl text-goldBright">
              {g.emoji} {g.title}
            </h2>
            <p className="text-muted text-sm mt-2">{g.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

