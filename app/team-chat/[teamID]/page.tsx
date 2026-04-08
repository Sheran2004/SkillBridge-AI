"use client";

import { useEffect, useState } from "react";
import { rtdb } from "@/lib/firebase";
import { push, ref, onValue, remove } from "firebase/database";

type ChatMessage = {
  text: string;
  sender: string;
};

export default function TeamChatRoomPage({
  params,
}: {
  params: { teamId: string };
}) {
  const { teamId } = params;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const chatRef = ref(rtdb, `teams/${teamId}/chat`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setMessages([]);
        return;
      }

      const loadedMessages = Object.values(data) as ChatMessage[];
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [teamId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    await push(ref(rtdb, `teams/${teamId}/chat`), {
      text: input,
      sender: "Sheran",
    });

    setInput("");
  };

  const clearChat = async () => {
    await remove(ref(rtdb, `teams/${teamId}/chat`));
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold">
            Team Room: {teamId}
          </h1>

          <button
            onClick={clearChat}
            className="bg-red-600 text-white px-5 py-2 rounded-2xl"
          >
            Clear Chat
          </button>
        </div>

        <p className="text-gray-500 mb-6">
          Private realtime chat for this team
        </p>

        <div className="border rounded-3xl h-[500px] p-4 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-gray-400">No messages yet</p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className="mb-4 bg-gray-100 rounded-2xl p-4"
              >
                <p className="font-semibold">{msg.sender}</p>
                <p>{msg.text}</p>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send message..."
            className="flex-1 border rounded-2xl px-4 py-3"
          />

          <button
            onClick={sendMessage}
            className="bg-black text-white px-6 rounded-2xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}