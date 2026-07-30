import { useEffect, useState } from "react";

import ResumeHistoryCard from "../components/Resume/ResumeHistoryCard";
import { getResumeHistory } from "../services/history";
import { deleteResume } from "../services/resume";
import type { ResumeHistoryItem } from "../types/history";

export default function ResumeHistory() {
    const [history, setHistory] = useState<
        ResumeHistoryItem[]
    >([]);

    useEffect(() => {
        loadHistory();
    }, []);
    
    async function loadHistory() {
        const data = await getResumeHistory();

        setHistory(data);
    }
    async function handleDelete(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this resume?"
  );

  if (!confirmed) return;

  try {
    await deleteResume(id);

    setHistory((prev) =>
      prev.filter((resume) => resume.id !== id)
    );
  } catch (error) {
    console.error(error);
    alert("Failed to delete resume.");
  }
}

    return (
  <div className="p-8">
    <h1 className="text-4xl font-bold text-white">
      Resume History
    </h1>

    <p className="mt-2 text-slate-400">
      View all previously analyzed resumes.
    </p>

    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {history.map((resume) => (
        <ResumeHistoryCard
          key={resume.id}
          resume={resume}
          onDelete={handleDelete}
        />
      ))}
    </div>
  </div>
);
}