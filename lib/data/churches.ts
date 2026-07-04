export type Church = {
  slug: string;
  name: string;
  region: string;
  founded: string;
  description: string;
  image: string;
  tags: string[];
  sources: string;
  // x/y — პროცენტული პოზიცია სტილიზებულ რუკაზე (0-100), არა ზუსტი GPS
  x: number;
  y: number;
};

const PLACEHOLDER = "/images/kings/IMG_5398.png";
const SOURCES_DEFAULT = "წყარო მალე დაემატება.";
const DESC_DEFAULT = "დეტალური აღწერა მალე დაემატება — ინფორმაცია მუშავდება.";

export const churches: Church[] = [
  { slug: "svetitskhoveli", name: "სვეტიცხოვლის საკათედრო ტაძარი", region: "მცხეთა", founded: "XI ს. (ძველი ტაძარი — IV ს.)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "იუნესკო"], sources: SOURCES_DEFAULT, x: 55, y: 55 },
  { slug: "jvari", name: "ჯვრის მონასტერი", region: "მცხეთა", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "იუნესკო"], sources: SOURCES_DEFAULT, x: 56, y: 53 },
  { slug: "samtavro", name: "სამთავროს მონასტერი", region: "მცხეთა", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT, x: 55, y: 57 },
  { slug: "bagrati", name: "ბაგრატის ტაძარი", region: "ქუთაისი, იმერეთი", founded: "XI ს. (1003)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "იუნესკო"], sources: SOURCES_DEFAULT, x: 25, y: 48 },
  { slug: "gelati", name: "გელათის მონასტერი", region: "ქუთაისის მიდამოები, იმერეთი", founded: "XII ს. (1106)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "იუნესკო", "აკადემია"], sources: SOURCES_DEFAULT, x: 26, y: 46 },
  { slug: "motsameta", name: "მოწამეთის მონასტერი", region: "ქუთაისის მიდამოები, იმერეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT, x: 27, y: 47 },
  { slug: "katskhi", name: "კაცხის სვეტი", region: "ჭიათურა, იმერეთი", founded: "IX–X სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["სვეტი", "მონასტერი"], sources: SOURCES_DEFAULT, x: 33, y: 50 },
  { slug: "nikortsminda", name: "ნიკორწმინდის ტაძარი", region: "რაჭა", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT, x: 35, y: 20 },
  { slug: "khobi", name: "ხობის მონასტერი", region: "სამეგრელო", founded: "XIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT, x: 15, y: 40 },
  { slug: "martvili", name: "მარტვილის მონასტერი", region: "სამეგრელო", founded: "VII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT, x: 18, y: 42 },
  { slug: "chkondidi", name: "ჭყონდიდის ტაძარი", region: "სამეგრელო", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT, x: 20, y: 45 },
  { slug: "betania", name: "ბეთანიის მონასტერი", region: "თბილისის მიდამოები, ქართლი", founded: "XII–XIII სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT, x: 57, y: 60 },
  { slug: "kvatakhevi", name: "ქვათახევის მონასტერი", region: "ქართლი", founded: "XIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT, x: 53, y: 62 },
  { slug: "samtavisi", name: "სამთავისის ტაძარი", region: "ქართლი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT, x: 50, y: 58 },
  { slug: "urbnisi", name: "ურბნისის ტაძარი", region: "ქართლი", founded: "VI ს. (თავდაპირველად)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT, x: 45, y: 57 },
  { slug: "ateni-sioni", name: "ატენის სიონი", region: "გორის მიდამოები, ქართლი", founded: "VII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT, x: 47, y: 60 },
  { slug: "sioni-tbilisi", name: "სიონის საკათედრო ტაძარი", region: "თბილისი", founded: "VI–VII სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი"], sources: SOURCES_DEFAULT, x: 60, y: 60 },
  { slug: "anchiskhati", name: "ანჩისხატის ბაზილიკა", region: "თბილისი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ბაზილიკა"], sources: SOURCES_DEFAULT, x: 60, y: 59 },
  { slug: "metekhi", name: "მეტეხის ტაძარი", region: "თბილისი", founded: "XIII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი"], sources: SOURCES_DEFAULT, x: 61, y: 61 },
  { slug: "sameba", name: "სამების საკათედრო ტაძარი (წმინდა სამება)", region: "თბილისი", founded: "XX–XXI სს. (2004)", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "თანამედროვე"], sources: SOURCES_DEFAULT, x: 62, y: 60 },
  { slug: "alaverdi", name: "ალავერდის საკათედრო ტაძარი", region: "კახეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი"], sources: SOURCES_DEFAULT, x: 80, y: 58 },
  { slug: "ikalto", name: "იყალთოს მონასტერი", region: "კახეთი", founded: "VI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "აკადემია"], sources: SOURCES_DEFAULT, x: 78, y: 56 },
  { slug: "nekresi", name: "ნეკრესის მონასტერი", region: "კახეთი", founded: "IV ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT, x: 85, y: 55 },
  { slug: "vardzia", name: "ვარძიის სამონასტრო კომპლექსი", region: "სამცხე-ჯავახეთი", founded: "XII ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["კლდეში ნაკვეთი მონასტერი"], sources: SOURCES_DEFAULT, x: 40, y: 80 },
  { slug: "sapara", name: "საფარის მონასტერი", region: "სამცხე-ჯავახეთი", founded: "IX ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT, x: 38, y: 78 },
  { slug: "zarzma", name: "ზარზმის მონასტერი", region: "სამცხე-ჯავახეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი"], sources: SOURCES_DEFAULT, x: 36, y: 76 },
  { slug: "oshki", name: "ოშკის ტაძარი", region: "ისტორიული ტაო-კლარჯეთი (დღეს — თურქეთი)", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ისტორიული საქართველო"], sources: SOURCES_DEFAULT, x: 25, y: 85 },
  { slug: "ishkhani", name: "იშხნის ტაძარი", region: "ისტორიული ტაო-კლარჯეთი (დღეს — თურქეთი)", founded: "VII, X სს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ისტორიული საქართველო"], sources: SOURCES_DEFAULT, x: 23, y: 83 },
  { slug: "khakhuli", name: "ხახულის ტაძარი", region: "ისტორიული ტაო-კლარჯეთი (დღეს — თურქეთი)", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ისტორიული საქართველო"], sources: SOURCES_DEFAULT, x: 22, y: 82 },
  { slug: "khikhani", name: "ხიხანის ციხე-ეკლესია", region: "ხულო, აჭარა", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ციხე-ეკლესია"], sources: SOURCES_DEFAULT, x: 15, y: 70 },
  { slug: "maradidi", name: "მარადიდის ეკლესია", region: "აჭარა", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია"], sources: SOURCES_DEFAULT, x: 8, y: 65 },
  { slug: "lagurka", name: "ლაგურკის ეკლესია", region: "სვანეთი", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია"], sources: SOURCES_DEFAULT, x: 20, y: 10 },
  { slug: "lagami", name: "ლაგამის ჯვრის ეკლესია", region: "სვანეთი", founded: "საშუალო საუკუნეები", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია"], sources: SOURCES_DEFAULT, x: 18, y: 8 },
  { slug: "pitsunda", name: "პიცუნდის ტაძარი", region: "აფხაზეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ტაძარი", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT, x: 8, y: 15 },
  { slug: "mokvi", name: "მოქვის საკათედრო ტაძარი", region: "აფხაზეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["საკათედრო ტაძარი", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT, x: 8, y: 28 },
  { slug: "ilori", name: "ილორის წმინდა გიორგის ეკლესია", region: "აფხაზეთი", founded: "XI ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["ეკლესია", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT, x: 9, y: 32 },
  { slug: "bedia", name: "ბედიის მონასტერი", region: "აფხაზეთი", founded: "X ს.", description: DESC_DEFAULT, image: PLACEHOLDER, tags: ["მონასტერი", "ოკუპირებული ტერიტორია"], sources: SOURCES_DEFAULT, x: 10, y: 30 },
];

export function getChurch(slug: string): Church | undefined {
  return churches.find((c) => c.slug === slug);
}

