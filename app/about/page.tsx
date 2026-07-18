// ============================================================
// "ჩვენს შესახებ" გვერდის ტექსტები და კონტაქტის ბმულები.
// როცა მზად გექნებათ, უბრალოდ შეავსეთ FACEBOOK_URL და EMAIL
// ქვემოთ — დანარჩენი კოდი აღარაფერს ითხოვს შეცვლას.
// ============================================================
const FACEBOOK_URL = ""; // მაგ: "https://facebook.com/mefeni.ge"
const EMAIL = ""; // მაგ: "info@mefeni.ge"

export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24 text-center">
      <span className="font-num text-xs tracking-widest uppercase text-gold">
        მეფენი.ge
      </span>
      <h1 className="font-display text-4xl md:text-5xl text-goldBright mt-3 mb-6">
        ჩვენს შესახებ
      </h1>
      <p className="text-ink/85 leading-relaxed mb-4">
        მეფენი.ge არის ციფრული სივრცე, სადაც თავმოყრილია საქართველოს მეფეთა,
        დინასტიების, ეკლესია-მონასტრებისა და ისტორიული მოვლენების შესახებ
        ინფორმაცია — ერთიანი, ადვილად ხელმისაწვდომი ფორმით.
      </p>
      <p className="text-muted text-sm mb-12">
        პროექტი მუდმივად ივსება და იხვეწება.
      </p>

      <div className="flex items-center justify-center gap-6">
        {FACEBOOK_URL ? (
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-goldBright transition-colors text-sm"
          >
            Facebook გვერდი
          </a>
        ) : (
          <span className="text-muted text-sm italic">Facebook გვერდი მალე დაემატება</span>
        )}

        {EMAIL ? (
          <a
            href={`mailto:${EMAIL}`}
            className="text-gold hover:text-goldBright transition-colors text-sm"
          >
            {EMAIL}
          </a>
        ) : (
          <span className="text-muted text-sm italic">ელ. ფოსტა მალე დაემატება</span>
        )}
      </div>
    </section>
  );
}