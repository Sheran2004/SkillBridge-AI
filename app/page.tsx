import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold text-center">
        SkillBridge AI
      </h1>

      <p className="mt-4 text-center text-gray-600 max-w-xl">
        Build hackathon teams, generate smart project ideas, connect with mentors,
        and manage project tasks in one place.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
  <a
    href="/ai-mentor"
    className="bg-black text-white px-6 py-3 rounded-2xl"
  >
    AI Mentor
  </a>

  <a
    href="/team-chat"
    className="border px-6 py-3 rounded-2xl"
  >
    Team Chat
  </a>

  <a
    href="/tasks"
    className="border px-6 py-3 rounded-2xl"
  >
    Tasks
  </a>

  <a
    href="/analytics"
    className="border px-6 py-3 rounded-2xl"
  >
    Analytics
  </a>
</div>
    </main>
  );
}