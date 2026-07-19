export type Achievement = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

export const achievements: Achievement[] = [
  { id: "first-step", label: "პირველი ნაბიჯი", description: "პირველი გადაწყვეტილება მიღებულია", icon: "🏁" },
  { id: "golden-age", label: "ოქროს ხანა", description: "ყველა რესურსი ერთდროულად 80-ს ზემოთ", icon: "✨" },
  { id: "iron-army", label: "რკინის ჯარი", description: "ჯარის ძალამ მიაღწია 100-ს", icon: "⚔️" },
  { id: "rich-treasury", label: "მდიდარი ხაზინა", description: "ხაზინამ მიაღწია 100-ს", icon: "💰" },
  { id: "beloved-ruler", label: "ხალხის რჩეული", description: "ხალხის მხარდაჭერამ მიაღწია 100-ს", icon: "👑" },
  { id: "flourishing-economy", label: "აყვავებული ეკონომიკა", description: "ეკონომიკამ მიაღწია 100-ს", icon: "🌾" },
  { id: "survivor", label: "დიდებული მეფობა", description: "მთელი მეფობა წარმატებით გაძლიერდა", icon: "🏆" },
];

