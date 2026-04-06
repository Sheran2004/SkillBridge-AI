"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/profile");
    } catch (error) {
      console.error("Login failed", error);
      alert("Google login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center">
          Sign in / Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Continue building your dream hackathon team with one click.
        </p>

        <div className="mt-6 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-black text-white py-3 rounded-2xl"
          >
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          New users are automatically registered on first Google login.
        </p>
      </div>
    </main>
  );
}