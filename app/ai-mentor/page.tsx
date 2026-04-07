"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIMentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi 👋 I am your AI Mentor. Ask me about hackathons, PPTs, bugs, deployment, startup ideas, or team strategy.",
    },
  ]);

  const [input, setInput] = useState("");
  const [lastAIReply, setLastAIReply] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

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

      const aiMessage: Message = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLastAIReply(data.reply);
    } catch {
      const errorMsg =
        "Something went wrong while contacting AI mentor.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMsg,
        },
      ]);
      setLastAIReply(errorMsg);
    }
  };

  const downloadPPT = async () => {
    const content = lastAIReply || "SkillBridge AI PPT";

    const res = await fetch("/api/generate-ppt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: input || "SkillBridge AI",
        content,
      }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "AI-Mentor-Presentation.pptx";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold">AI Mentor</h1>
        <p className="text-gray-500 mt-2">
          Your personal hackathon and startup guide.
        </p>

        <div className="mt-6 border rounded-3xl p-4 h-[500px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 p-4 rounded-2xl max-w-[80%] ${
                msg.role === "user"
                  ? "ml-auto bg-black text-white"
                  : "bg-gray-100"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI mentor..."
            className="flex-1 border rounded-2xl px-4 py-3"
          />

          <button
            onClick={sendMessage}
            className="bg-black text-white px-6 rounded-2xl"
          >
            Send
          </button>

          <button
            onClick={downloadPPT}
            className="bg-blue-600 text-white px-6 rounded-2xl"
          >
            PPT
          </button>
        </div>
      </div>
    </div>
  );
}