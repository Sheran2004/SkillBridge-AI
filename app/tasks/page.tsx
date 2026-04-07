"use client";

import { useState, useEffect } from "react";
import { rtdb } from "@/lib/firebase";
import { ref, push, onValue, update } from "firebase/database";

type Task = {
  id: string;
  text: string;
  done: boolean;
};

export default function TasksPage() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const tasksRef = ref(rtdb, "tasks");

    return onValue(tasksRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, value]: any) => ({
        id,
        ...(value as object),
      })) as Task[];

      setTasks(list);
    });
  }, []);

  const addTask = async () => {
    if (!task.trim()) return;

    await push(ref(rtdb, "tasks"), {
      text: task,
      done: false,
    });

    setTask("");
  };

  const toggleTask = async (id: string, done: boolean) => {
    await update(ref(rtdb, `tasks/${id}`), {
      done: !done,
    });
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-6">Project Tasks</h1>

      <div className="flex gap-3 mb-6">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border rounded-xl px-4 py-3 w-full"
          placeholder="Add task..."
        />
        <button
          onClick={addTask}
          className="bg-black text-white px-6 rounded-xl"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="border rounded-2xl p-4 flex justify-between"
          >
            <span className={t.done ? "line-through" : ""}>{t.text}</span>
            <button onClick={() => toggleTask(t.id, t.done)}>
              {t.done ? "Undo" : "Done"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}