export type Church = {
  slug: string;
  name: string;
  region: string;
  founded: string;
  description: string;
  image: string;
  tags: string[];
  sources: string;
};

const PLACEHOLDER = "/images/kings/IMG_5398.png";
const SOURCES_DEFAULT = "წყარო მალე დაემატება.";
const DESC_DEFAULT = "დეტალური აღწერა მალე დაემატება — ინფორმაცია მუშავდება.";

// რეგიონები (ერთეულები) — ამ თანმიმდევრობით გამოჩნდება მწკრივში
export const REGIONS: string[] = [
  "თბილისი",
  "მცხეთა-მთიანეთი",
  "შიდა ქართლი",
  "კახეთი",
  "იმერეთი",
  "რაჭა-ლეჩხუმი და ქვემო სვანეთი",
  "სამეგრელო-ზემო სვანეთი",
  "გურია",
  "აჭარა",
  "სამცხე-ჯავახეთი",
  "აფხაზეთი",
  "ისტორიული ტაო-კლარჯეთი (დღეს — თურქეთი)",
];

export const churches: Church[] = [
  { slug: "svetitskhoveli", name: "სვეტიცხოვლის საკათედრო ტაძარი", region: "მცხეთა-მთიანეთი", founded: "XI ს. (ძველი ტაძარი — IV ს.)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "იუნესკო"], sources: SOURCES_DEFAULT },
  { slug: "jvari", name: "ჯვრის მონასტერი", region: "მცხეთა-მთიანეთი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "იუნესკო"], sources: SOURCES_DEFAULT },
  { slug: "samtavro", name: "სამთავროს მონასტერი", region: "მცხეთა-მთიანეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "betania", name: "ბეთანიის მონასტერი", region: "მცხეთა-მთიანეთი", founded: "XII–XIII სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },

  { slug: "bagrati", name: "ბაგრატის ტაძარი", region: "იმერეთი", founded: "XI ს. (1003)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "იუნესკო"], sources: SOURCES_DEFAULT },
  { slug: "gelati", name: "გელათის მონასტერი", region: "იმერეთი", founded: "XII ს. (1106)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "იუნესკო", "აკადემია"], sources: SOURCES_DEFAULT },
  { slug: "motsameta", name: "მოწამეთის მონასტერი", region: "იმერეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "katskhi", name: "კაცხის სვეტი", region: "იმერეთი", founded: "IX–X სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["სვეტი", "მონასტერი"], sources: SOURCES_DEFAULT },

  { slug: "nikortsminda", name: "ნიკორწმინდის ტაძარი", region: "რაჭა-ლეჩხუმი და ქვემო სვანეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },

  { slug: "khobi", name: "ხობის მონასტერი", region: "სამეგრელო-ზემო სვანეთი", founded: "XIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "martvili", name: "მარტვილის მონასტერი", region: "სამეგრელო-ზემო სვანეთი", founded: "VII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "chkondidi", name: "ჭყონდიდის ტაძარი", region: "სამეგრელო-ზემო სვანეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "lagurka", name: "ლაგურკის ეკლესია", region: "სამეგრელო-ზემო სვანეთი", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია", "სვანეთი"], sources: SOURCES_DEFAULT },
  { slug: "lagami", name: "ლაგამის ჯვრის ეკლესია", region: "სამეგრელო-ზემო სვანეთი", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია", "სვანეთი"], sources: SOURCES_DEFAULT },

  { slug: "kvatakhevi", name: "ქვათახევის მონასტერი", region: "შიდა ქართლი", founded: "XIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "samtavisi", name: "სამთავისის ტაძარი", region: "შიდა ქართლი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "urbnisi", name: "ურბნისის ტაძარი", region: "შიდა ქართლი", founded: "VI ს. (თავდაპირველად)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "ateni-sioni", name: "ატენის სიონი", region: "შიდა ქართლი", founded: "VII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },

  { slug: "sioni-tbilisi", name: "სიონის საკათედრო ტაძარი", region: "თბილისი", founded: "VI–VII სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "anchiskhati", name: "ანჩისხატის ბაზილიკა", region: "თბილისი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ბაზილიკა"], sources: SOURCES_DEFAULT },
  { slug: "metekhi", name: "მეტეხის ტაძარი", region: "თბილისი", founded: "XIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "sameba", name: "სამების საკათედრო ტაძარი (წმინდა სამება)", region: "თბილისი", founded: "XX–XXI სს. (2004)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "თანამედროვე"], sources: SOURCES_DEFAULT },

  { slug: "alaverdi", name: "ალავერდის საკათედრო ტაძარი", region: "კახეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "ikalto", name: "იყალთოს მონასტერი", region: "კახეთი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "აკადემია"], sources: SOURCES_DEFAULT },
  { slug: "nekresi", name: "ნეკრესის მონასტერი", region: "კახეთი", founded: "IV ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },

  { slug: "vardzia", name: "ვარძიის სამონასტრო კომპლექსი", region: "სამცხე-ჯავახეთი", founded: "XII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["კლდეში ნაკვეთი მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "sapara", name: "საფარის მონასტერი", region: "სამცხე-ჯავახეთი", founded: "IX ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "zarzma", name: "ზარზმის მონასტერი", region: "სამცხე-ჯავახეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },

  { slug: "khikhani", name: "ხიხანის ციხე-ეკლესია", region: "აჭარა", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ციხე-ეკლესია"], sources: SOURCES_DEFAULT },
  { slug: "maradidi", name: "მარადიდის ეკლესია", region: "აჭარა", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია"], sources: SOURCES_DEFAULT },

  { slug: "pitsunda", name: "პიცუნდის ტაძარი", region: "აფხაზეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT },
  { slug: "mokvi", name: "მოქვის საკათედრო ტაძარი", region: "აფხაზეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT },
  { slug: "ilori", name: "ილორის წმინდა გიორგის ეკლესია", region: "აფხაზეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT },
  { slug: "bedia", name: "ბედიის მონასტერი", region: "აფხაზეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT },

  { slug: "oshki", name: "ოშკის ტაძარი", region: "ისტორიული ტაო-კლარჯეთი (დღეს — თურქეთი)", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ისტორიული საქართველო"], sources: SOURCES_DEFAULT },
  { slug: "ishkhani", name: "იშხნის ტაძარი", region: "ისტორიული ტაო-კლარჯეთი (დღეს — თურქეთი)", founded: "VII, X სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ისტორიული საქართველო"], sources: SOURCES_DEFAULT },
  { slug: "khakhuli", name: "ხახულის ტაძარი", region: "ისტორიული ტაო-კლარჯეთი (დღეს — თურქეთი)", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ისტორიული საქართველო"], sources: SOURCES_DEFAULT },
];

export function getChurch(slug: string): Church | undefined {
  return churches.find((c) => c.slug === slug);
}

export function getChurchesByRegion(region: string): Church[] {
  return churches.filter((c) => c.region === region);
}

