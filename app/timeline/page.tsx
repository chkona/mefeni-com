// ქრონოლოგიის მონაცემები — დასამატებლად უბრალოდ ჩაამატე ახალი ობიექტი მასივში
const EVENTS = [
  { year: "ძვ.წ. 299", title: "ქართლის სამეფოს დაარსება", text: "ფარნავაზ I აარსებს იბერიის (ქართლის) სამეფოს." },
  { year: "337", title: "ქრისტიანობის მიღება", text: "ქართლი სახელმწიფო რელიგიად ქრისტიანობას იღებს მირიან III-ის დროს." },
  { year: "1008", title: "საქართველოს გაერთიანება", text: "ბაგრატ III აერთიანებს ქართლისა და აფხაზეთის სამეფოებს." },
  { year: "1121", title: "დიდგორის ბრძოლა", text: "დავით აღმაშენებელი ანადგურებს სელჩუკთა კოალიციას და იბრუნებს თბილისს." },
  { year: "1184–1213", title: "თამარის ოქროს ხანა", text: "საქართველო აღწევს უდიდეს გავლენას სამხრეთ კავკასიაში." },
  { year: "1783", title: "გეორგიევსკის ტრაქტატი", text: "ერეკლე II ხელს აწერს რუსეთის მფარველობის ხელშეკრულებას." },
  { year: "1801", title: "სამეფოს გაუქმება", text: "რუსეთის იმპერია აუქმებს ქართლ-კახეთის სამეფოს." },
];

export default function TimelinePage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="font-num text-xs tracking-widest uppercase text-gold">ქრონოლოგია</span>
        <h1 className="font-display text-4xl mt-2">სამეფოს გზა</h1>
      </div>

      <div className="relative pl-10">
        <div className="absolute left-[9px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
        {EVENTS.map((e) => (
          <div key={e.year} className="relative pb-12 last:pb-0">
            <div className="absolute -left-10 top-1 w-5 h-5 rounded-full bg-void border-2 border-gold" />
            <span className="font-num text-goldBright text-sm">{e.year}</span>
            <h3 className="font-display text-xl mt-1 mb-2">{e.title}</h3>
            <p className="text-muted text-sm max-w-lg">{e.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
