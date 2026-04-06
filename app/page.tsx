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

      <div className="mt-8 flex gap-4">
        <Link href="/login">
          <button className="px-6 py-3 rounded-2xl bg-black text-white">
            Get Started
          </button>
        </Link>

        <button className="px-6 py-3 rounded-2xl border">
          Explore
        </button>
      </div>
    </main>
  );
}