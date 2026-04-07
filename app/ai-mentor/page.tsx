"use client";

import { useState } from "react";

export default function AIMentorPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi 👋 I am your AI Mentor. Ask me about hackathons, PPTs, bugs, deployment, startup ideas, or team strategy.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
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
          history: updatedMessages,
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
          content: "Something went wrong. Please try again.",
        },
      ]);
    }
  };

  const downloadPPT = async () => {
    const topic = input || "SkillBridge AI";

    try {
      const res = await fetch("/api/generate-ppt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${topic.replace(/\s+/g, "-")}.pptx`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch {
      alert("PPT generation failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-6">
      <div className="w-full max-w-5xl border rounded-3xl p-6">
        <h1 className="text-6xl font-bold mb-4">AI Mentor</h1>
        <p className="text-2xl text-gray-600 mb-6">
          Your personal hackathon and startup guide.
        </p>

        <div className="border rounded-3xl p-4 h-[600px] overflow-y-auto mb-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 p-4 rounded-2xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-black text-white ml-auto"
                  : "bg-gray-100"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI mentor..."
            className="flex-1 border rounded-2xl px-4 py-3 text-xl"
          />

          <button
            onClick={sendMessage}
            className="bg-black text-white px-6 py-3 rounded-2xl"
          >
            Send
          </button>

          <button
            onClick={downloadPPT}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl"
          >
            PPT
          </button>
        </div>
      </div>
    </div>
  );
}