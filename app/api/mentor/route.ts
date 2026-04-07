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
  const text = message.toLowerCase().trim();

  const lastAssistant = [...history]
    .reverse()
    .find((m) => m.role === "assistant")?.content;

  // PPT / presentation
  if (
    text.includes("ppt") ||
    text.includes("slide") ||
    text.includes("presentation")
  ) {
    if (text.includes("1")) {
      return "Slide 1: Problem Statement — Students struggle to find teammates, mentors, and strong hackathon ideas quickly.";
    }
    if (text.includes("2")) {
      return "Slide 2: Solution — SkillBridge AI connects students with teammates, AI mentors, and project ideas.";
    }
    if (text.includes("3")) {
      return "Slide 3: Features — AI Mentor, Team Finder, Resume Builder, GitHub Sync, PPT Generator.";
    }
    if (text.includes("4")) {
      return "Slide 4: Tech Stack — Next.js, Firebase, OpenRouter, Vercel, Tailwind.";
    }
    if (text.includes("5")) {
      return "Slide 5: Future Scope — APK app, live chat, recruiter mode, analytics dashboard.";
    }

    return `For "${message}", create 5 slides:
1. Problem
2. Solution
3. Features
4. Tech Stack
5. Future Scope`;
  }

  // Deployment
  if (
    text.includes("deploy") ||
    text.includes("vercel") ||
    text.includes("production") ||
    text.includes("hosting")
  ) {
    return `Deployment steps for "${message}":
1. Push code to GitHub
2. Import repo into Vercel
3. Add environment variables
4. Deploy production build
5. Test live domain`;
  }

  // Bug fixing
  if (
    text.includes("bug") ||
    text.includes("error") ||
    text.includes("issue") ||
    text.includes("fix")
  ) {
    return `To solve "${message}", check:
• console logs
• API route
• environment variables
• Firebase config
• Vercel logs
• package dependencies`;
  }

  // Startup / business
  if (
    text.includes("startup") ||
    text.includes("pitch") ||
    text.includes("investor") ||
    text.includes("business")
  ) {
    return `Startup guidance for "${message}":
• define problem
• explain solution
• target users
• revenue model
• growth strategy
• future expansion`;
  }

  // Coding / project
  if (
    text.includes("code") ||
    text.includes("project") ||
    text.includes("feature") ||
    text.includes("api")
  ) {
    return `For "${message}", break it into:
• frontend UI
• backend API
• database
• auth
• deployment
• testing`;
  }

  // Team / hackathon
  if (
    text.includes("team") ||
    text.includes("hackathon") ||
    text.includes("mentor")
  ) {
    return `Best strategy for "${message}":
• choose strong teammates
• divide frontend/backend/AI roles
• build MVP first
• prepare PPT
• demo clean workflow`;
  }

  // Smart generic no-repeat fallback
  return lastAssistant
    ? `Based on your latest question "${message}", continue from previous context and expand the next practical step.`
    : `For "${message}", first define the goal, then break it into implementation steps, tools needed, and deployment strategy.`;
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