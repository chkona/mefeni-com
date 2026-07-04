import ChurchRegions from "@/components/ChurchRegions";

export default function ChurchesPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <span className="font-num text-xs tracking-widest uppercase text-gold">
          სულიერი მემკვიდრეობა
        </span>
        <h1 className="font-display text-4xl md:text-5xl text-goldBright mt-2">
          საქართველოს ეკლესია-მონასტრები
        </h1>
        <p className="text-muted mt-4 max-w-2xl mx-auto">
          აირჩიეთ რეგიონი, რომ ნახოთ იქაური ეკლესია-მონასტრები.
        </p>
      </div>

      <ChurchRegions />
    </section>
  );
}

