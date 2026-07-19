export type ResourceKey = "support" | "army" | "treasury" | "economy";

export type GameKing = {
  slug: string;
  name: string;
  title: string;
  years: string;
  bonusLabel: string;
  bonusDescription: string;
  bonusResource: ResourceKey; // ამ რესურსში მიღებული ყველა დადებითი ცვლილება +25%-ით იზრდება
  image: string;
};

export const gameKings: GameKing[] = [
  {
    slug: "davit-iv",
    name: "დავით IV აღმაშენებელი",
    title: "მეფე-გამაერთიანებელი",
    years: "1089–1125",
    bonusLabel: "სამხედრო რეფორმატორი",
    bonusDescription: "ჯარის ყველა დადებითი ცვლილება +25%-ით იზრდება.",
    bonusResource: "army",
    image: "/images/kings/IMG_5353.png",
  },
  {
    slug: "tamar-mepe",
    name: "თამარ მეფე",
    title: "მეფეთ-მეფე",
    years: "1184–1213",
    bonusLabel: "ხალხის საყვარელი",
    bonusDescription: "ხალხის მხარდაჭერის ყველა დადებითი ცვლილება +25%-ით იზრდება.",
    bonusResource: "support",
    image: "/images/kings/IMG_5356.png",
  },
  {
    slug: "giorgi-v-brtsqinvale",
    name: "გიორგი V ბრწყინვალე",
    title: "აღმდგენი მეფე",
    years: "1314–1346",
    bonusLabel: "ეკონომიკის აღმდგენი",
    bonusDescription: "ეკონომიკის ყველა დადებითი ცვლილება +25%-ით იზრდება.",
    bonusResource: "economy",
    image: "/images/kings/IMG_5398.png",
  },
  {
    slug: "erekle-ii",
    name: "ერეკლე II",
    title: "მცირე კახი",
    years: "1744–1798",
    bonusLabel: "ხაზინის მეურვე",
    bonusDescription: "ხაზინის ყველა დადებითი ცვლილება +25%-ით იზრდება.",
    bonusResource: "treasury",
    image: "/images/kings/IMG_5398.png",
  },
];

export function getGameKing(slug: string): GameKing | undefined {
  return gameKings.find((k) => k.slug === slug);
}

