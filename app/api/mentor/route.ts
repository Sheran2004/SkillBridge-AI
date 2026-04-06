import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(
      `You are an AI hackathon mentor helping students with PPT, startup, coding, deployment, and team building.
      
User question: ${message}`
    );

    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Gemini Mentor Error:", error);

    return NextResponse.json({
    reply: `Gemini Error: ${String(error)}`,
  });
  }
}