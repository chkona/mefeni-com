// ეს გვერდი საჭიროებს backend API როუტს (app/api/ai-historian/route.ts),
// რომელიც გამოიძახებს Claude API-ს და აბრუნებს პასუხს.
// მაგალითი route.ts ფაილისთვის იხილე README.md.

export default function AiHistorianPage() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24 text-center">
      <span className="font-num text-xs tracking-widest uppercase text-gold">AI ისტორიკოსი</span>
      <h1 className="font-display text-4xl mt-2 mb-4">დაუსვი კითხვა ისტორიაზე</h1>
      <p className="text-muted">
        ეს გვერდი დააკავშირე Claude API-სთან — README.md ფაილში მოცემულია
        API route-ის მაგალითი კოდი.
      </p>
    </section>
  );
}
