import Link from "next/link";

const tasks = {
  todo: ["Create UI screens", "Setup backend APIs"],
  progress: ["AI team matching"],
  done: ["Landing page", "Login flow", "Profile form"],
};

const messages = [
  { sender: "Aman", text: "I will handle frontend screens." },
  { sender: "Riya", text: "I am working on ML model logic." },
  { sender: "Rahul", text: "Backend APIs setup done." },
];

const commits = [
  "Aman pushed landing page UI",
  "Rahul added auth APIs",
  "Riya integrated ML dataset",
];

const mentorNotes = [
  "Improve UI consistency for mobile screens.",
  "Add backend auth validation.",
  "Pitch startup scalability in final PPT.",
];

export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">Project Workspace</h1>
        <p className="text-gray-500 mt-2">
          Manage your hackathon project with your team.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">To Do</h2>
            {tasks.todo.map((task, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-3 mb-3">
                {task}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">In Progress</h2>
            {tasks.progress.map((task, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-3 mb-3">
                {task}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Done</h2>
            {tasks.done.map((task, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-3 mb-3">
                {task}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Team Chat</h2>
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-3">
                <span className="font-semibold">{msg.sender}: </span>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <input
              placeholder="Type your message..."
              className="flex-1 border rounded-2xl px-4 py-3"
            />
            <button className="bg-black text-white px-6 rounded-2xl">
              Send
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">GitHub Progress</h2>
            {commits.map((commit, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-3 mb-3">
                {commit}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Mentor Review</h2>
            {mentorNotes.map((note, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl p-3 mb-3">
                {note}
              </div>
            ))}
          </div>
        </div>

        <Link href="/resume-builder">
          <button className="mt-8 w-full bg-black text-white py-4 rounded-2xl">
            Generate Resume Points
          </button>
        </Link>
      </div>
    </main>
  );
}