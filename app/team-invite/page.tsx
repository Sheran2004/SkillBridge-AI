"use client";

import { useState } from "react";
import { push, ref } from "firebase/database";
import { rtdb } from "@/lib/firebase";

export default function TeamInvitePage() {
  const [email, setEmail] = useState("");

  const sendInvite = async () => {
    if (!email.trim()) return;

    const inviteRef = ref(rtdb, "team-invites");
    const teamId = `team-${Date.now()}`;

    await push(inviteRef, {
      email,
      invitedBy: "Sheran",
      teamId,
      createdAt: Date.now(),
      status: "pending",
    });

    setEmail("");
    alert(`Invite sent for ${teamId} 🚀`);
  };

  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-5xl font-bold">👥 Team Invite</h1>
      <p className="text-gray-500 mt-2">
        Invite teammates to join your team room
      </p>

      <div className="mt-8 border rounded-3xl p-6 max-w-2xl">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter teammate email"
          className="w-full border rounded-2xl px-4 py-3"
        />

        <button
          onClick={sendInvite}
          className="mt-4 bg-black text-white px-6 py-3 rounded-2xl"
        >
          Create Team + Send Invite
        </button>
      </div>
    </main>
  );
}