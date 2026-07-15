import DynastyChain from "@/components/DynastyChain";

export default function KingsPage() {
  return (
    <main className="min-h-screen bg-void px-4 py-10 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/kings/IMG_5412.jpeg"
            alt="საქართველოს გერბი"
            className="w-14 h-14 object-contain"
          />
          <h1 className="text-3xl font-bold text-goldBright">
            საქართველოს მეფეები
          </h1>
        </div>
        <p className="text-muted mb-10">
          გენეალოგიური ხაზი — ანტიკური ქართლიდან გაერთიანებულ საქართველომდე,
          შემდეგ გაყოფილი სამეფოებით.
        </p>
        <DynastyChain />
      </div>
    </main>
  );
}

