import { NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

export async function POST(req: Request) {
  try {
    const { topic = "SkillBridge AI", content = "" } =
      await req.json();

    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_WIDE";

    const slideTexts =
      content.split("\n").filter((line: string) => line.trim()) ||
      [];

    if (slideTexts.length === 0) {
      slideTexts.push(
        "Problem",
        "Solution",
        "Features",
        "Tech Stack",
        "Future Scope"
      );
    }

    slideTexts.slice(0, 5).forEach((text: string, index: number) => {
      const slide = pptx.addSlide();

      slide.addText(`${topic} - Slide ${index + 1}`, {
        x: 0.5,
        y: 0.5,
        w: 12,
        h: 0.6,
        fontSize: 28,
        bold: true,
      });

      slide.addText(text, {
        x: 0.8,
        y: 1.8,
        w: 11,
        h: 4,
        fontSize: 20,
        breakLine: true,
      });
    });

    const buffer = await pptx.write({
      outputType: "nodebuffer",
    });

    const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);

await push(ref(rtdb, "pptHistory"), {
  topic,
  createdAt: Date.now(),
});

    return new NextResponse(buffer as BodyInit, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition":
          'attachment; filename="AI-Mentor-Presentation.pptx"',
      },
    });
  } catch {
    return NextResponse.json(
      { error: "PPT generation failed" },
      { status: 500 }
    );
  }
}