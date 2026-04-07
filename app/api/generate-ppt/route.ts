import { NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";

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