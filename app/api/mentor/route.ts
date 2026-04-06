import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: "OPENAI_API_KEY missing in environment variables",
      });
    }

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
              "You are an expert hackathon AI mentor. Help with PPTs, startup ideas, deployment, debugging, and team strategy.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("OpenAI response:", data);

    return NextResponse.json({
      reply:
        data.choices?.[0]?.message?.content ||
        data.error?.message ||
        "No response from OpenAI",
    });
  } catch (error) {
    return NextResponse.json({
      reply: "API route failed",
    });
  }
}