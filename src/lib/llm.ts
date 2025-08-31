export async function llmReply(userMessage: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY. Set it in Vercel env.");
  }

  const base = process.env.OPENAI_BASE_URL || "https://api.openai.com";

  const res = await fetch(`${base}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant. Keep answers concise." },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content?.trim();
  return content || "(No response)";
}
