export async function POST(req: Request) {
  const { question } = await req.json();

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY as string,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 800,
      system:
        "შენ ხარ ქართული ისტორიის ექსპერტი ასისტენტი. უპასუხე კითხვებს საქართველოს მეფეებისა და ისტორიის შესახებ ქართულ ენაზე, ზუსტად და გასაგებად.",
      messages: [{ role: "user", content: question }],
    }),
  });

  const data = await res.json();
  return Response.json(data);
}
