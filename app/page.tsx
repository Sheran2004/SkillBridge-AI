"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-7xl font-bold">SkillBridge AI</h1>

        <p className="text-gray-600 mt-4 max-w-2xl">
          Build hackathon teams, generate smart project ideas,
          connect with mentors, and manage project tasks in one place.
        </p>

        {!user ? (
          <div className="flex justify-center gap-4 mt-8">
            <Link
              href="/login"
              className="bg-black text-white px-6 py-3 rounded-2xl"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="border px-6 py-3 rounded-2xl"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/ai-mentor"
              className="bg-black text-white px-6 py-3 rounded-2xl"
            >
              AI Mentor
            </Link>

            <Link
              href="/team-chat/team-demo"
              className="border px-6 py-3 rounded-2xl"
            >
              Team Chat
            </Link>

            <Link
              href="/tasks"
              className="border px-6 py-3 rounded-2xl"
            >
              Tasks
            </Link>

            <Link
              href="/analytics"
              className="border px-6 py-3 rounded-2xl"
            >
              Analytics
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}