import { NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";

export async function POST(req: Request) {
  try {
    const { topic = "SkillBridge AI" } = await req.json();

    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_WIDE";
    pptx.author = "SkillBridge AI";
    pptx.subject = topic;
    pptx.title = `${topic} Hackathon Pitch`;

    const slides = [
      {
        title: "Problem Statement",
        body: "Students struggle to find teammates, mentors, and strong hackathon ideas quickly.",
      },
      {
        title: "Solution",
        body: "SkillBridge AI helps students discover teammates, AI mentors, and project ideas.",
      },
      {
        title: "Key Features",
        body: "AI Mentor, Team Finder, Resume Builder, PPT Generator, GitHub Sync",
      },
      {
        title: "Tech Stack",
        body: "Next.js, Firebase, Vercel, OpenRouter, Tailwind CSS",
      },
      {
        title: "Future Scope",
        body: "APK app, real-time team chat, analytics, recruiter dashboard",
      },
    ];

    slides.forEach((s) => {
      const slide = pptx.addSlide();
      slide.addText(s.title, {
        x: 0.5,
        y: 0.5,
        w: 12,
        h: 0.8,
        fontSize: 28,
        bold: true,
      });
      slide.addText(s.body, {
        x: 0.8,
        y: 1.8,
        w: 11.5,
        h: 4,
        fontSize: 20,
        breakLine: true,
      });
    });

    const buffer = await pptx.write({
        outputType: "nodebuffer",
        });

    return new NextResponse(buffer as BodyInit, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition": `attachment; filename="${topic.replace(/\s+/g, "-")}.pptx"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "PPT generation failed" }, { status: 500 });
  }
}