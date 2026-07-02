// ეს გვერდი სტუბია — შეავსე იგივე პრინციპით, როგორც app/kings/page.tsx:
// 1) შექმენი lib/data/[სახელი].ts მონაცემების ფაილი
// 2) დაწერე ბარათის კომპონენტი components/ საქაღალდეში
// 3) დააჯგუფე grid-ში, საჭიროებისამებრ დაამატე ძებნა/ფილტრი

export default function Page() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24 text-center">
      <h1 className="font-display text-4xl text-goldBright mb-4">გვერდი მუშავდება</h1>
      <p className="text-muted">
        ეს სექცია აშენდება იმავე სტრუქტურით, როგორც "მეფეები" — მონაცემთა ფაილი
        + ბარათის კომპონენტი + grid გამოტანა.
      </p>
    </section>
  );
}
