import { NextResponse } from "next/server";
import axios from "axios";

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

function fallbackReply(message: string): string {
  const text = message.toLowerCase();

  if (text.includes("ppt") || text.includes("slide")) {
    return "Use 5 slides: Problem, Solution, Features, Tech Stack, Future Scope.";
  }

  if (text.includes("bug") || text.includes("error")) {
    return "Check logs, environment variables, route path, Firebase config, and deployment logs.";
  }

  return "I can help with PPTs, coding, deployment, startup, and hackathon strategy.";
}

async function askOpenRouter(
  message: string,
  history: HistoryMessage[]
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return fallbackReply(message);
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "system",
            content:
              "You are SkillBridge AI Mentor. Use previous conversation context and avoid repeating the same answer. Give actionable student-friendly answers.",
          },
          ...history.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          {
            role: "user",
            content: message,
          },
        ],
        },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return (
      response.data?.choices?.[0]?.message?.content ||
      fallbackReply(message)
    );
  } catch {
    return fallbackReply(message);
  }
}

export async function POST(req: Request) {
  try {
    const { message, history = [] } = await req.json();

    const reply = await askOpenRouter(message, history);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({
      reply: "AI mentor is temporarily unavailable.",
    });
  }
}