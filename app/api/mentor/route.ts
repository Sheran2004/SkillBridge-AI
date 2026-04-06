import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function fallbackReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("ppt")) {
    return `Here’s a 5-slide PPT structure for SkillBridge AI:

1. Problem Statement
- Students struggle to find teammates, mentors, and project ideas

2. Our Solution
- SkillBridge AI connects teammates, AI mentor, PPT builder

3. Key Features
- AI mentor
- Team matching
- Resume builder
- Hackathon PPT generator

4. Tech Stack
- Next.js
- Firebase
- Gemini API
- Vercel

5. Future Scope
- Live chat
- GitHub sync
- APK app
- Analytics dashboard`;
  }

  if (text.includes("startup")) {
    return "For startup mode: focus on problem, market, MVP, revenue model, and GTM strategy.";
  }

  if (text.includes("deploy")) {
    return "For deployment: use Vercel + Firebase env variables + production domain auth setup.";
  }

  return "I can help with PPTs, startup ideas, deployment, coding, and hackathon strategies.";
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
You are an AI hackathon mentor helping students with PPT, startup, coding, deployment, and team building.

User question: ${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini Error:", error);

    const { message } = await req.json().catch(() => ({
      message: "",
    }));

    return NextResponse.json({
      reply: fallbackReply(message),
    });
  }
}