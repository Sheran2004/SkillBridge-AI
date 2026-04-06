import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI hackathon mentor helping students with PPT, startup, coding, deployment, and team building.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Try asking in a more detailed way.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Mentor API Error:", error);
    return NextResponse.json({
      reply: "AI mentor temporarily unavailable",
    });
  }
}