"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/workspace");
    } catch (error) {
      console.error("Register failed:", error);
      alert("Registration failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md border rounded-3xl p-8 bg-white">
        <h1 className="text-4xl font-bold mb-6">Register</h1>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full border rounded-2xl px-4 py-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full border rounded-2xl px-4 py-3 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-3 rounded-2xl"
        >
          Create Account
        </button>
      </div>
    </main>
  );
}