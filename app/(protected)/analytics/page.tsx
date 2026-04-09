"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase";

type Stats = {
  teamMembers: number;
  activeChats: number;
  pptsGenerated: number;
  projectProgress: number;
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats>({
    teamMembers: 0,
    activeChats: 0,
    pptsGenerated: 0,
    projectProgress: 0,
  });

  useEffect(() => {
    const membersRef = ref(rtdb, "teamMembers");
    const chatsRef = ref(rtdb, "teamChat");
    const pptsRef = ref(rtdb, "pptHistory");
    const tasksRef = ref(rtdb, "tasks");

    const unsubMembers = onValue(membersRef, (snapshot) => {
      const data = snapshot.val() || {};
      setStats((prev) => ({ ...prev, teamMembers: Object.keys(data).length }));
    });

    const unsubChats = onValue(chatsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setStats((prev) => ({ ...prev, activeChats: Object.keys(data).length }));
    });

    const unsubPpts = onValue(pptsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setStats((prev) => ({ ...prev, pptsGenerated: Object.keys(data).length }));
    });

    const unsubTasks = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val() || {};
      const taskList = Object.values(data) as Array<{ done?: boolean }>;
      const total = taskList.length;
      const completed = taskList.filter((t) => t.done).length;
      const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

      setStats((prev) => ({ ...prev, projectProgress: progress }));
    });

    return () => {
      unsubMembers();
      unsubChats();
      unsubPpts();
      unsubTasks();
    };
  }, []);

  const cards = [
    { title: "Team Members", value: stats.teamMembers },
    { title: "Active Chats", value: stats.activeChats },
    { title: "PPTs Generated", value: stats.pptsGenerated },
    { title: "Project Progress", value: `${stats.projectProgress}%` },
  ];

  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-5xl font-bold mb-3">Project Analytics</h1>
      <p className="text-gray-500 mb-10">Live insights from Firebase realtime data</p>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((item, index) => (
          <div key={index} className="border rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl text-gray-500">{item.title}</h2>
            <p className="text-4xl font-bold mt-4">{item.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
