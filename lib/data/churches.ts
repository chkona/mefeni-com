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
  "ქვემო ქართლი",
  "კახეთი",
  "იმერეთი",
  "რაჭა-ლეჩხუმი და ქვემო სვანეთი",
  "სამეგრელო-ზემო სვანეთი",
  "გურია",
  "აჭარა",
  "სამცხე-ჯავახეთი",
  "აფხაზეთი",
  "ისტორიული ტაო-კლარჯეთი",
];

export const churches: Church[] = [
  // თბილისი
  { slug: "sioni-tbilisi", name: "სიონის საკათედრო ტაძარი", region: "თბილისი", founded: "VI–VII სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "anchiskhati", name: "ანჩისხატის ბაზილიკა", region: "თბილისი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ბაზილიკა"], sources: SOURCES_DEFAULT },
  { slug: "metekhi", name: "მეტეხის ტაძარი", region: "თბილისი", founded: "XIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "sameba", name: "სამების საკათედრო ტაძარი (წმინდა სამება)", region: "თბილისი", founded: "XX–XXI სს. (2004)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "თანამედროვე"], sources: SOURCES_DEFAULT },
  { slug: "kashveti", name: "კაშველთის წმინდა გიორგის ეკლესია", region: "თბილისი", founded: "XX ს. (1910; ძველი ტაძრის ადგილზე)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია"], sources: SOURCES_DEFAULT },
  { slug: "didube-mother-of-god", name: "დიდუბის ღვთისმშობლის ეკლესია", region: "თბილისი", founded: "XIX ს. (ძველი საძირკველი — უფრო ადრეული)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია"], sources: SOURCES_DEFAULT },
  { slug: "vashlijvari", name: "ვაშლიჯვრის ეკლესია", region: "თბილისი", founded: "XVII ს. (ადრეული საფუძველი)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია"], sources: SOURCES_DEFAULT },

  // მცხეთა-მთიანეთი
  { slug: "svetitskhoveli", name: "სვეტიცხოვლის საკათედრო ტაძარი", region: "მცხეთა-მთიანეთი", founded: "XI ს. (ძველი ტაძარი — IV ს.)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "იუნესკო"], sources: SOURCES_DEFAULT },
  { slug: "jvari", name: "ჯვრის მონასტერი", region: "მცხეთა-მთიანეთი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "იუნესკო"], sources: SOURCES_DEFAULT },
  { slug: "samtavro", name: "სამთავროს მონასტერი", region: "მცხეთა-მთიანეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "betania", name: "ბეთანიის მონასტერი", region: "მცხეთა-მთიანეთი", founded: "XII–XIII სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "shiomgvime", name: "შიომღვიმის მონასტერი", region: "მცხეთა-მთიანეთი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "zedazeni", name: "ზედაზნის მონასტერი", region: "მცხეთა-მთიანეთი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "ananuri", name: "ანანურის საკვირაო კომპლექსი", region: "მცხეთა-მთიანეთი", founded: "XVII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ციხე-ეკლესია"], sources: SOURCES_DEFAULT },
  { slug: "gergeti", name: "გერგეტის სამების ეკლესია", region: "მცხეთა-მთიანეთი", founded: "XIV ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია"], sources: SOURCES_DEFAULT },

  // შიდა ქართლი
  { slug: "kvatakhevi", name: "ქვათახევის მონასტერი", region: "შიდა ქართლი", founded: "XIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "samtavisi", name: "სამთავისის ტაძარი", region: "შიდა ქართლი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "urbnisi", name: "ურბნისის ტაძარი", region: "შიდა ქართლი", founded: "VI ს. (თავდაპირველად)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "ateni-sioni", name: "ატენის სიონი", region: "შიდა ქართლი", founded: "VII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "nikozi", name: "ნიქოზის ტაძარი", region: "შიდა ქართლი", founded: "VI ს. (თავდაპირველად)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "tskhrakara", name: "ცხრაკარის მონასტერი", region: "შიდა ქართლი", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },

  // ქვემო ქართლი
  { slug: "bolnisi-sioni", name: "ბოლნისის სიონი", region: "ქვემო ქართლი", founded: "478–493 (უძველესი დათარიღებული ტაძარი საქართველოში)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "უძველესი"], sources: SOURCES_DEFAULT },
  { slug: "dmanisi-sioni", name: "დმანისის სიონი", region: "ქვემო ქართლი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "tsughrughasheni", name: "წუღრუღაშენის ტაძარი", region: "ქვემო ქართლი", founded: "XIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },

  // კახეთი
  { slug: "alaverdi", name: "ალავერდის საკათედრო ტაძარი", region: "კახეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "ikalto", name: "იყალთოს მონასტერი", region: "კახეთი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "აკადემია"], sources: SOURCES_DEFAULT },
  { slug: "nekresi", name: "ნეკრესის მონასტერი", region: "კახეთი", founded: "IV ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "bodbe", name: "ბოდბის მონასტერი (წმ. ნინოს საფლავი)", region: "კახეთი", founded: "IV–IX სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "david-gareja", name: "დავითგარეჯის სამონასტრო კომპლექსი", region: "კახეთი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "კლდეში ნაკვეთი"], sources: SOURCES_DEFAULT },
  { slug: "gremi", name: "გრემის ტაძარი", region: "კახეთი", founded: "XVI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },

  // იმერეთი
  { slug: "bagrati", name: "ბაგრატის ტაძარი", region: "იმერეთი", founded: "XI ს. (1003)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "იუნესკო"], sources: SOURCES_DEFAULT },
  { slug: "gelati", name: "გელათის მონასტერი", region: "იმერეთი", founded: "XII ს. (1106)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "იუნესკო", "აკადემია"], sources: SOURCES_DEFAULT },
  { slug: "motsameta", name: "მოწამეთის მონასტერი", region: "იმერეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "katskhi", name: "კაცხის სვეტი", region: "იმერეთი", founded: "IX–X სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["სვეტი", "მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "khoni", name: "ხონის ღვთისმშობლის ტაძარი", region: "იმერეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },

  // რაჭა-ლეჩხუმი და ქვემო სვანეთი
  { slug: "nikortsminda", name: "ნიკორწმინდის ტაძარი", region: "რაჭა-ლეჩხუმი და ქვემო სვანეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "jruchi", name: "ჯრუჭის მონასტერი", region: "რაჭა-ლეჩხუმი და ქვემო სვანეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "barakoni", name: "ბარაკონის ტაძარი", region: "რაჭა-ლეჩხუმი და ქვემო სვანეთი", founded: "XVIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },

  // სამეგრელო-ზემო სვანეთი
  { slug: "khobi", name: "ხობის მონასტერი", region: "სამეგრელო-ზემო სვანეთი", founded: "XIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "martvili", name: "მარტვილის მონასტერი", region: "სამეგრელო-ზემო სვანეთი", founded: "VII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "chkondidi", name: "ჭყონდიდის ტაძარი", region: "სამეგრელო-ზემო სვანეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "tsalenjikha", name: "ცალენჯიხის საკათედრო ტაძარი", region: "სამეგრელო-ზემო სვანეთი", founded: "X–XIV სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "ფრესკები"], sources: SOURCES_DEFAULT },
  { slug: "lagurka", name: "ლაგურკის ეკლესია", region: "სამეგრელო-ზემო სვანეთი", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია", "სვანეთი"], sources: SOURCES_DEFAULT },
  { slug: "lagami", name: "ლაგამის ჯვრის ეკლესია", region: "სამეგრელო-ზემო სვანეთი", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია", "სვანეთი"], sources: SOURCES_DEFAULT },
  { slug: "nakipari", name: "ნაქიფარის წმ. გიორგის ეკლესია", region: "სამეგრელო-ზემო სვანეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია", "სვანეთი"], sources: SOURCES_DEFAULT },

  // გურია
  { slug: "shemokmedi", name: "შემოქმედის საკათედრო ტაძარი", region: "გურია", founded: "XVI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი"], sources: SOURCES_DEFAULT },
  { slug: "jumati", name: "ჯუმათის ტაძარი", region: "გურია", founded: "XVI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT },

  // აჭარა
  { slug: "khikhani", name: "ხიხანის ციხე-ეკლესია", region: "აჭარა", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ციხე-ეკლესია"], sources: SOURCES_DEFAULT },
  { slug: "maradidi", name: "მარადიდის ეკლესია", region: "აჭარა", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია"], sources: SOURCES_DEFAULT },
  { slug: "skhalta", name: "სხალთის ეკლესია", region: "აჭარა", founded: "XIV ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია"], sources: SOURCES_DEFAULT },

  // სამცხე-ჯავახეთი
  { slug: "vardzia", name: "ვარძიის სამონასტრო კომპლექსი", region: "სამცხე-ჯავახეთი", founded: "XII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["კლდეში ნაკვეთი მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "sapara", name: "საფარის მონასტერი", region: "სამცხე-ჯავახეთი", founded: "IX ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "zarzma", name: "ზარზმის მონასტერი", region: "სამცხე-ჯავახეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "vanis-kvabebi", name: "ვანის ქვაბები", region: "სამცხე-ჯავახეთი", founded: "XIII–XIV სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["კლდეში ნაკვეთი მონასტერი"], sources: SOURCES_DEFAULT },
  { slug: "khertvisi", name: "ხერთვისის ეკლესია", region: "სამცხე-ჯავახეთი", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია"], sources: SOURCES_DEFAULT },

  // აფხაზეთი
  { slug: "pitsunda", name: "პიცუნდის ტაძარი", region: "აფხაზეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT },
  { slug: "mokvi", name: "მოქვის საკათედრო ტაძარი", region: "აფხაზეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT },
  { slug: "ilori", name: "ილორის წმინდა გიორგის ეკლესია", region: "აფხაზეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT },
  { slug: "bedia", name: "ბედიის მონასტერი", region: "აფხაზეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT },
  { slug: "dranda", name: "დრანდის საკათედრო ტაძარი", region: "აფხაზეთი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT },

  // ისტორიული ტაო-კლარჯეთი
  { slug: "oshki", name: "ოშკის ტაძარი", region: "ისტორიული ტაო-კლარჯეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ისტორიული საქართველო"], sources: SOURCES_DEFAULT },
  { slug: "ishkhani", name: "იშხნის ტაძარი", region: "ისტორიული ტაო-კლარჯეთი", founded: "VII, X სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ისტორიული საქართველო"], sources: SOURCES_DEFAULT },
  { slug: "khakhuli", name: "ხახულის ტაძარი", region: "ისტორიული ტაო-კლარჯეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ისტორიული საქართველო"], sources: SOURCES_DEFAULT },
  { slug: "parkhali", name: "პარხალის ტაძარი", region: "ისტორიული ტაო-კლარჯეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ისტორიული საქართველო"], sources: SOURCES_DEFAULT },
  { slug: "khandzta", name: "ხანძთის მონასტერი", region: "ისტორიული ტაო-კლარჯეთი", founded: "VIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "ისტორიული საქართველო"], sources: SOURCES_DEFAULT },
];

export function getChurch(slug: string): Church | undefined {
  return churches.find((c) => c.slug === slug);
}

export function getChurchesByRegion(region: string): Church[] {
  return churches.filter((c) => c.region === region);
}

