import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function fallbackReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("ppt")) {
    return "Use 5 slides: Problem, Solution, Features, Tech Stack, Future Scope.";
  }

  return "I can help with PPTs, coding, deployment, startup, and hackathon strategy.";
}

async function askOpenRouter(message: string) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI hackathon mentor for students and startups.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (geminiError) {
    console.log("Gemini failed, switching to OpenRouter");

    try {
      const reply = await askOpenRouter(message);
      return NextResponse.json({ reply });
    } catch (routerError) {
      console.log("OpenRouter failed, switching to fallback");

      return NextResponse.json({
        reply: fallbackReply(message),
      });
    }
  }
}