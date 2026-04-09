"use client";

import { useEffect, useState } from "react";
import {
  onValue,
  ref,
  update,
} from "firebase/database";
import { rtdb } from "@/lib/firebase";

type Invite = {
  id: string;
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

      const inviteList = Object.entries(data).map(
        ([id, value]) => ({
          id,
          ...(value as Omit<Invite, "id">),
        })
      );

      setInvites(inviteList);
    });

    return () => unsubscribe();
  }, []);

  const updateInviteStatus = async (
    id: string,
    status: "accepted" | "rejected"
  ) => {
    await update(ref(rtdb, `team-invites/${id}`), {
      status,
    });
  };

  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-5xl font-bold">📥 Team Invites</h1>
      <p className="text-gray-500 mt-2">
        Manage collaboration requests
      </p>

      <div className="mt-8 space-y-4">
        {invites.map((invite) => (
          <div
            key={invite.id}
            className="border rounded-3xl p-4"
          >
            <p><strong>Email:</strong> {invite.email}</p>
            <p><strong>Invited by:</strong> {invite.invitedBy}</p>
            <p><strong>Status:</strong> {invite.status}</p>

            {invite.status === "pending" && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() =>
                    updateInviteStatus(invite.id, "accepted")
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-xl"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateInviteStatus(invite.id, "rejected")
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-xl"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}