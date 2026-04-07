"use client";

import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { rtdb } from "@/lib/firebase";

type Invite = {
  email: string;
  invitedBy: string;
  status: string;
};

export default function InvitesPage() {
  const [invites, setInvites] = useState<Invite[]>([]);

  useEffect(() => {
    const inviteRef = ref(rtdb, "team-invites");

    const unsubscribe = onValue(inviteRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setInvites([]);
        return;
      }

      setInvites(Object.values(data));
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-5xl font-bold">📥 Team Invites</h1>
      <p className="text-gray-500 mt-2">
        View all pending collaboration invites
      </p>

      <div className="mt-8 space-y-4">
        {invites.map((invite, index) => (
          <div key={index} className="border rounded-3xl p-4">
            <p><strong>Email:</strong> {invite.email}</p>
            <p><strong>Invited by:</strong> {invite.invitedBy}</p>
            <p><strong>Status:</strong> {invite.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}