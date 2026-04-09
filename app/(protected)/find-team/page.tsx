import Link from "next/link";

const teammates = [
  {
    name: "Aman Verma",
    role: "Frontend + UI/UX",
    skills: "React, Tailwind, Figma",
    match: "92%",
  },
  {
    name: "Riya Singh",
    role: "AI/ML Engineer",
    skills: "Python, ML, OpenCV",
    match: "89%",
  },
  {
    name: "Rahul Khan",
    role: "Backend Developer",
    skills: "Node.js, MongoDB, Firebase",
    match: "87%",
  },
];

export default function FindTeamPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold">Best Teammates for You</h1>
        <p className="text-gray-500 mt-2">
          Based on your skills and interests, these teammates are the best match.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {teammates.map((member, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-2xl font-bold">{member.name}</h2>
              <p className="text-gray-600 mt-2">{member.role}</p>
              <p className="text-sm mt-2">{member.skills}</p>
              <div className="mt-4 text-xl font-semibold">
                Match Score: {member.match}
              </div>

              <Link href="/project-ideas">
                <button className="mt-4 w-full bg-black text-white py-3 rounded-2xl">
                  Connect
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}