import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const prompt = `
You are an AI hackathon mentor helping students with PPT, startup, coding, deployment, and team building.

User question: ${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error: unknown) {
  console.error("Gemini Error:", error);

  const message =
    error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({
      reply: `Gemini Error: ${message}`,
    });
  }
}