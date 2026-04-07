"use client";

import { useEffect, useState } from "react";
import { rtdb } from "@/lib/firebase";
import { push, ref, onValue } from "firebase/database";

type ChatMessage = {
  text: string;
  sender: string;
};

export default function TeamChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const chatRef = ref(rtdb, "team-chat");

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
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const chatRef = ref(rtdb, "team-chat");

    await push(chatRef, {
      text: input,
      sender: "Sheran",
    });

    setInput("");
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">Team Live Chat</h1>
        <p className="text-gray-500 mb-6">
          Realtime collaboration for teammates
        </p>

        <div className="border rounded-3xl h-[500px] p-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="mb-4 bg-gray-100 rounded-2xl p-4"
            >
              <p className="font-semibold">{msg.sender}</p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send message to team..."
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