import {
  FileText,
  Calendar,
  Eye,
  Trash2,
} from "lucide-react";

import type { ResumeHistoryItem } from "../../types/history";
import { useNavigate } from "react-router-dom";

interface Props {
  resume: ResumeHistoryItem;
  onDelete: (id: string) => void;
}

export default function ResumeHistoryCard({
  resume,
  onDelete,
}: Props) {
  const navigate = useNavigate();
  
  function getBadgeColor(score: number) {
    if (score >= 80)
      return "bg-green-500/20 text-green-400";

    if (score >= 60)
      return "bg-yellow-500/20 text-yellow-400";

    return "bg-red-500/20 text-red-400";
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg transition-all hover:border-blue-500 hover:shadow-blue-500/20">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-blue-600 p-3">
          <FileText className="text-white" size={22} />
        </div>

        <div>
          <h2 className="font-semibold text-white">
            {resume.filename}
          </h2>

          <p className="text-sm text-slate-400">
            Resume Upload
          </p>
        </div>

      </div>

      <div className="mb-6 flex items-center justify-between">

        <span className="text-slate-400">
          ATS Score
        </span>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${getBadgeColor(
            resume.ats_score
          )}`}
        >
          {resume.ats_score}%
        </span>

      </div>

      <div className="mb-8 flex items-center gap-2 text-slate-400">

        <Calendar size={16} />

        <span>
          {new Date(
            resume.uploaded_at
          ).toLocaleDateString()}
        </span>

      </div>

      <div className="flex gap-3">

        <button
          onClick={() => navigate(`/resume/${resume.id}`)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
>
        <Eye size={18} />

        View Analysis
      </button>

       <button
  onClick={() => onDelete(resume.id)}
  className="flex items-center justify-center rounded-lg border border-red-500 px-4 text-red-400 transition hover:bg-red-500 hover:text-white"
>
          <Trash2 size={18} />
        </button>
       

      </div>

    </div>
  );
}