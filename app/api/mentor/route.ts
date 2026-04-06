import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert hackathon AI mentor. Help with projects, PPT, debugging, startup ideas, and deployment.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  const data = await response.json();

  return NextResponse.json({
    reply: data.choices?.[0]?.message?.content || "No response",
  });
}