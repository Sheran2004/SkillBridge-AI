export default function AnalyticsPage() {
  const stats = [
    { title: "Team Members", value: "12" },
    { title: "Active Chats", value: "48" },
    { title: "PPTs Generated", value: "9" },
    { title: "Project Progress", value: "78%" },
  ];

  return (
    <main className="min-h-screen p-8 bg-white">
      <h1 className="text-5xl font-bold mb-3">Project Analytics</h1>
      <p className="text-gray-500 mb-10">
        Live insights for your hackathon workspace
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="border rounded-3xl p-8 shadow-sm"
          >
            <h2 className="text-xl text-gray-500">{item.title}</h2>
            <p className="text-4xl font-bold mt-4">{item.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}