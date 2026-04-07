import { NextResponse } from "next/server";
import axios from "axios";

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

function fallbackReply(
  message: string,
  history: HistoryMessage[] = []
): string {
  const text = message.toLowerCase();

  const previousContext = history
    .map((m) => m.content.toLowerCase())
    .join(" ");

  // PPT flow
  if (previousContext.includes("ppt") || text.includes("ppt")) {
    if (text.includes("slide 1")) {
      return "Slide 1: Problem Statement — Students struggle to find teammates, mentors, and strong hackathon ideas quickly.";
    }

    if (text.includes("slide 2")) {
      return "Slide 2: Solution — SkillBridge AI helps students discover teammates, generate AI project ideas, and get mentorship support.";
    }

    if (text.includes("slide 3")) {
      return "Slide 3: Features — AI Mentor, Team Finder, Resume Builder, Project Ideas, GitHub Sync.";
    }

    if (text.includes("slide 4")) {
      return "Slide 4: Tech Stack — Next.js, Firebase, OpenRouter API, Vercel, Tailwind CSS.";
    }

    if (text.includes("slide 5")) {
      return "Slide 5: Future Scope — APK app, live teammate chat, analytics dashboard, recruiter access.";
    }

    return "Use 5 slides: Problem, Solution, Features, Tech Stack, Future Scope.";
  }

  // Startup flow
  if (previousContext.includes("startup") || text.includes("startup")) {
    if (text.includes("revenue")) {
      return "Revenue model: premium AI mentor, recruiter dashboard, college subscriptions.";
    }

    return "Startup pitch: SkillBridge AI solves student collaboration and hackathon preparation.";
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
    return fallbackReply(message,history);
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