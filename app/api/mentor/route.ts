import { NextResponse } from "next/server";
import axios from "axios";

function fallbackReply(message: string): string {
  const text = message.toLowerCase();

  if (text.includes("ppt") || text.includes("slide")) {
    return `Here is your complete 5-slide PPT for SkillBridge AI:

Slide 1: Problem Statement
Students struggle to find hackathon teammates, mentors, and strong project ideas quickly.

Slide 2: Our Solution
SkillBridge AI helps students discover teammates, generate smart project ideas, and get AI mentoring support.

Slide 3: Key Features
• AI Mentor
• Team Finder
• Resume Builder
• Project Ideas
• PPT Generator
• Startup Guidance

Slide 4: Tech Stack
• Next.js
• Firebase
• OpenRouter API
• Vercel
• Tailwind CSS

Slide 5: Future Scope
• Real teammate live chat
• GitHub repo sync
• APK mobile app
• Project analytics
• Mentor marketplace`;
  }

  if (
    text.includes("startup") ||
    text.includes("pitch") ||
    text.includes("investor")
  ) {
    return `Startup pitch for SkillBridge AI:

Problem:
Students waste too much time finding the right team, mentor, and project idea.

Solution:
An AI-powered collaboration platform for students.

Revenue Model:
• Premium AI mentor
• Recruiter dashboard
• College partnerships
• Resume review

Target Market:
Hackathons, engineering colleges, startups, students.

Vision:
Become LinkedIn + GitHub + AI mentor for student builders.`;
  }

  if (text.includes("deploy") || text.includes("vercel")) {
    return `Deployment checklist:
1. Push latest code to GitHub
2. Add all Vercel environment variables
3. Add Firebase auth domain
4. Redeploy production
5. Test API routes and frontend pages`;
  }

  if (
    text.includes("bug") ||
    text.includes("error") ||
    text.includes("fix")
  ) {
    return `Debugging steps:
• Check terminal logs
• Verify environment variables
• Confirm API route path
• Check Vercel deployment logs
• Verify Firebase domains
• Check package dependencies`;
  }

  return `I can help with:
• PPT generation
• Startup pitch
• Deployment
• Bug fixing
• Hackathon strategy
• Team building
• Resume improvement`;
}

async function askOpenRouter(message: string): Promise<string> {
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
              "You are SkillBridge AI Mentor helping students with PPTs, startups, coding, deployment, and hackathon strategy.",
          },
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
  } catch (error) {
    console.error("OpenRouter Error:", error);
    return fallbackReply(message);
  }
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const reply = await askOpenRouter(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Mentor Route Error:", error);
    return NextResponse.json({
      reply: "AI mentor is temporarily unavailable.",
    });
  }
}