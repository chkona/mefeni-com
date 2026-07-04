import DynastyChain from "@/components/DynastyChain";

export default function KingsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/gerbi.png"
            alt="საქართველოს გერბი"
            className="w-14 h-14 object-contain"
          />
          <h1 className="text-3xl font-bold text-neutral-50">
            საქართველოს მეფეები
          </h1>
        </div>
        <p className="text-neutral-400 mb-10">
          გენეალოგიური ხაზი — ანტიკური ქართლიდან გაერთიანებულ საქართველომდე,
          შემდეგ გაყოფილი სამეფოებით.
        </p>
        <DynastyChain />
      </div>
    </main>
  );
}
