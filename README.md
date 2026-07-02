# მეფენი.ge — გამოყენების ინსტრუქცია

## 1. როგორ გავუშვათ საკუთარ კომპიუტერზე

გჭირდება დაინსტალირებული **Node.js** (nodejs.org-დან, უფასო).

```bash
npm install
npm run dev
```

გახსენი ბრაუზერში `http://localhost:3000` — საიტი აქ ცოცხლად მუშაობს, და
ნებისმიერი ცვლილება ფაილში ავტომატურად აისახება გვერდზე.

## 2. სად რა შევცვალო

| რისი შეცვლა გინდა | რომელი ფაილი |
|---|---|
| მეფეების სია, ტექსტები, დამატება/წაშლა | `lib/data/kings.ts` |
| მთავარი გვერდის სათაური/ტექსტი | `app/page.tsx` (ზედა ცვლადები `HERO_TITLE` და ა.შ.) |
| ფერები, შრიფტები (დიზაინი) | `tailwind.config.ts` |
| ნავიგაციის ბმულები | `components/Navbar.tsx` |
| ქრონოლოგიის მოვლენები | `app/timeline/page.tsx` |
| ვიქტორინის კითხვები | `app/quiz/page.tsx` |
| ახალი გვერდი (ბრძოლები, დინასტიები, გმირები, ეკლესიები, რუკები) | შესაბამისი `app/[სახელი]/page.tsx` — ამჟამად სტუბია, ავსება `kings/page.tsx`-ის მაგალითზე |

ტექსტების და მონაცემების შეცვლას პროგრამირება არ სჭირდება — უბრალო ცვლადებია.
თუ გინდა, ნებისმიერ დროს დამიბრუნდი და მითხარი კონკრეტულად რისი შეცვლა
გინდა (მაგ. "დაამატე მეფე X" ან "შეცვალე მთავარი ფერი მწვანეზე") — გავაკეთებ
ცვლილებას პირდაპირ კოდში.

## 3. AI ისტორიკოსის გვერდის დასაკავშირებლად

შექმენი ფაილი `app/api/ai-historian/route.ts`:

```ts
export async function POST(req: Request) {
  const { question } = await req.json();
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 800,
      system: "შენ ხარ ქართული ისტორიის ექსპერტი. უპასუხე მკაფიოდ და ფაქტობრივად.",
      messages: [{ role: "user", content: question }],
    }),
  });
  const data = await res.json();
  return Response.json(data);
}
```

`ANTHROPIC_API_KEY` მიიღება console.anthropic.com-დან და ემატება
`.env.local` ფაილში (`ANTHROPIC_API_KEY=sk-ant-...`).

## 4. როგორ გავხადოთ საიტი ყველასთვის ხელმისაწვდომი (დეპლოი)

უმარტივესი და უფასო გზა — **Vercel** (Next.js-ის შემქმნელი კომპანია):

1. ატვირთე პროექტი GitHub-ზე (`github.com` — ახალი repository, ატვირთე ეს ფაილები).
2. შედი `vercel.com`-ზე, დარეგისტრირდი GitHub ანგარიშით.
3. "Add New Project" → აირჩიე შენი repository → "Deploy".
4. 1-2 წუთში მიიღებ საჯარო ბმულს, მაგ. `mefeni-ge.vercel.app`, რომელზეც
   ნებისმიერს შეუძლია შესვლა.
5. საკუთარი დომენის დასამატებლად (`მეფენი.ge`) — Vercel-ის პროექტის
   Settings → Domains-ში, დომენის რეგისტრატორთან (მაგ. namecheap.com,
   ან ქართული რეგისტრატორი domain.ge) ყიდვის შემდეგ.

ალტერნატივა: **Netlify** ან **Cloudflare Pages** — იგივე პრინციპით მუშაობს.

ცვლილების შემდეგ საკმარისია GitHub-ზე ატვირთო განახლებული ფაილები
(`git push`) — Vercel ავტომატურად განაახლებს ცოცხალ საიტს.
