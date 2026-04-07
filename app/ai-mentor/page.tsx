"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function AIMentorPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi 👋 I am your AI Mentor. Ask me about hackathons, PPTs, bugs, deployment, startup ideas, or team strategy.",
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(updatedMessages);
    const currentInput = input;
    setInput("");

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          history: updatedMessages.slice(-8),
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "AI mentor is temporarily unavailable.",
        },
      ]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-5xl font-bold mb-3">AI Mentor</h1>
      <p className="text-gray-600 mb-6">
        Your personal hackathon and startup guide.
      </p>

      <div className="border rounded-3xl p-4 h-[550px] overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rounded-2xl px-4 py-3 max-w-[80%] ${
              msg.role === "user"
                ? "bg-black text-white ml-auto"
                : "bg-gray-100"
            }`}
            >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-2xl px-4 py-3"
          placeholder="Ask your AI mentor..."
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-6 rounded-2xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}