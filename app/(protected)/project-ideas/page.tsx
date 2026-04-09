import Link from "next/link";

const ideas = [
  {
    title: "Smart Accident Detection",
    description:
      "AI-based real-time accident detection with automatic emergency alerts and live location sharing.",
    stack: "React, Node.js, OpenCV, Firebase",
  },
  {
    title: "Fake News Detector",
    description:
      "ML-powered app to classify news articles and social posts as real or fake.",
    stack: "Next.js, Python, Scikit-learn, MongoDB",
  },
  {
    title: "Smart Queue Predictor",
    description:
      "Predict hospital and office waiting times using live crowd and historical analytics.",
    stack: "React, ML, OpenCV, FastAPI",
  },
];

export default function ProjectIdeasPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold">AI Project Ideas for You</h1>
        <p className="text-gray-500 mt-2">
          Based on your profile and teammate strengths.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {ideas.map((idea, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-2xl font-bold">{idea.title}</h2>
              <p className="text-gray-600 mt-3">{idea.description}</p>
              <p className="mt-4 text-sm font-medium">{idea.stack}</p>

              <Link href="/workspace">
                <button className="mt-4 w-full bg-black text-white py-3 rounded-2xl">
                  Select Project
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}