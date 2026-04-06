const bullets = [
  "Built SkillBridge AI using Next.js, Firebase Auth, and Firestore.",
  "Implemented AI-style teammate matching and project recommendation workflow.",
  "Designed mobile-friendly Kanban workspace with team collaboration features.",
  "Integrated Google login and cloud profile persistence for real users.",
];

export default function ResumeBuilderPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-4xl font-bold">AI Resume Builder</h1>
        <p className="text-gray-500 mt-2">
          Convert your project work into ATS-friendly resume points.
        </p>

        <div className="mt-8 space-y-4">
          {bullets.map((point, index) => (
            <div key={index} className="bg-gray-100 rounded-2xl p-4">
              • {point}
            </div>
          ))}
        </div>

        <button className="mt-6 w-full bg-black text-white py-3 rounded-2xl">
          Copy Resume Points
        </button>
      </div>
    </main>
  );
}