"use client";

import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { rtdb } from "@/lib/firebase";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalInvites: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
    totalMessages: 0,
  });

  useEffect(() => {
    const inviteRef = ref(rtdb, "team-invites");
    const chatRef = ref(rtdb, "team-chat");

    onValue(inviteRef, (snapshot) => {
      const data = snapshot.val() || {};
      const values = Object.values(data) as {
        status: string;
      }[];

      setStats((prev) => ({
        ...prev,
        totalInvites: values.length,
        accepted: values.filter(
          (v) => v.status === "accepted"
        ).length,
        rejected: values.filter(
          (v) => v.status === "rejected"
        ).length,
        pending: values.filter(
          (v) => v.status === "pending"
        ).length,
      }));
    });

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val() || {};

      setStats((prev) => ({
        ...prev,
        totalMessages: Object.keys(data).length,
      }));
    });
  }, []);

  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-5xl font-bold">
        📊 Project Analytics
      </h1>
      <p className="text-gray-500 mt-2">
        Live hackathon collaboration insights
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="border rounded-3xl p-6">
          <h2 className="text-2xl font-bold">
            Total Invites
          </h2>
          <p className="text-4xl mt-3">
            {stats.totalInvites}
          </p>
        </div>

        <div className="border rounded-3xl p-6">
          <h2 className="text-2xl font-bold">
            Accepted
          </h2>
          <p className="text-4xl mt-3">
            {stats.accepted}
          </p>
        </div>

        <div className="border rounded-3xl p-6">
          <h2 className="text-2xl font-bold">
            Pending
          </h2>
          <p className="text-4xl mt-3">
            {stats.pending}
          </p>
        </div>

        <div className="border rounded-3xl p-6">
          <h2 className="text-2xl font-bold">
            Rejected
          </h2>
          <p className="text-4xl mt-3">
            {stats.rejected}
          </p>
        </div>

        <div className="border rounded-3xl p-6 md:col-span-2">
          <h2 className="text-2xl font-bold">
            Team Chat Messages
          </h2>
          <p className="text-4xl mt-3">
            {stats.totalMessages}
          </p>
        </div>
      </div>
    </main>
  );
}