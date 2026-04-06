"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function ProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    college: "",
    branch: "",
    skills: "",
    interests: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      await setDoc(doc(db, "profiles", user.uid), {
        ...form,
        email: user.email,
        updatedAt: new Date(),
      });

      alert("Profile saved successfully in Firestore ✅");
      router.push("/find-team");
    } catch (error) {
      console.error(error);
      alert("Failed to save profile");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold">Build Your Profile</h1>
        <p className="text-gray-500 mt-2">
          This helps us find the best teammates and project ideas for you.
        </p>

        <div className="mt-6 space-y-4">
          <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full border rounded-2xl px-4 py-3" />
          <input name="college" placeholder="College Name" onChange={handleChange} className="w-full border rounded-2xl px-4 py-3" />
          <input name="branch" placeholder="Branch" onChange={handleChange} className="w-full border rounded-2xl px-4 py-3" />
          <input name="skills" placeholder="Skills" onChange={handleChange} className="w-full border rounded-2xl px-4 py-3" />
          <input name="interests" placeholder="Interests" onChange={handleChange} className="w-full border rounded-2xl px-4 py-3" />

          <button
            onClick={handleSave}
            className="w-full bg-black text-white py-3 rounded-2xl"
          >
            Save Profile
          </button>
        </div>
      </div>
    </main>
  );
}