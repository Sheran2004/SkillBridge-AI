"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AIMentorPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi 👋 I am your AI Mentor. Ask me about hackathons, PPTs, bugs, deployment, startup ideas, or team strategy.",
    },
  ]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const currentInput = input;

    const userMsg: Message = {
      role: "user",
      text: currentInput,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply || "No response from AI mentor",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong while contacting AI mentor.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6">
        <h1 className="text-4xl font-bold">AI Mentor</h1>
        <p className="text-gray-500 mt-2">
          Your personal hackathon and startup guide.
        </p>

        <div className="mt-6 h-[500px] overflow-y-auto space-y-4 border rounded-2xl p-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl max-w-[80%] ${
                msg.role === "user"
                  ? "ml-auto bg-black text-white"
                  : "bg-gray-100"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="bg-gray-100 rounded-2xl p-3 max-w-[80%]">
              AI is thinking...
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI mentor..."
            className="flex-1 border rounded-2xl px-4 py-3"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-black text-white px-6 rounded-2xl disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}