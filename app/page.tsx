import Link from "next/link";

// ===================================================================
// მთავარი გვერდის ტექსტები. ცვლილებისთვის უბრალოდ შეცვალე ქვემოთ
// მოცემული სტრიქონები — HERO_TITLE, HERO_SUBTITLE და ა.შ.
// ===================================================================
const HERO_EYEBROW = "ისტორია • დინასტიები • მემკვიდრეობა";
const HERO_TITLE = "ქართველ მეფეთა საუკუნეები";
const HERO_SUBTITLE =
  "ფარნავაზიდან გიორგი XII-მდე — 2000 წელზე მეტი ხნის სამეფო ისტორია, ბრძოლები და დინასტიები ერთ ციფრულ მუზეუმში.";

const STATS = [
  { value: "2000+", label: "წელი ისტორია" },
  { value: "5", label: "დინასტია" },
  { value: "80+", label: "მეფე & დედოფალი" },
];

export default function HomePage() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 10%, rgba(201,162,39,0.10), transparent 60%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(92,26,26,0.14), transparent 70%)",
        }}
      />

      <span className="font-num text-xs tracking-[0.32em] uppercase text-gold">{HERO_EYEBROW}</span>

      <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight mt-6 bg-gradient-to-b from-goldBright via-gold to-[#8a6d1c] bg-clip-text text-transparent">
        {HERO_TITLE}
      </h1>

      <p className="max-w-xl mt-6 text-muted text-lg">{HERO_SUBTITLE}</p>

      <div className="flex gap-4 flex-wrap justify-center mt-10">
        <Link href="/kings" className="font-num text-sm uppercase tracking-wider px-8 py-4 bg-gold text-[#181209] rounded-sm hover:bg-goldBright transition">
          დაათვალიერე მეფენი
        </Link>
        <Link href="/timeline" className="font-num text-sm uppercase tracking-wider px-8 py-4 border border-gold text-goldBright rounded-sm hover:bg-gold/10 transition">
          ქრონოლოგია
        </Link>
      </div>

      <div className="flex gap-12 flex-wrap justify-center mt-16">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <b className="font-num text-3xl text-goldBright block">{s.value}</b>
            <span className="text-xs uppercase tracking-widest text-muted">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
