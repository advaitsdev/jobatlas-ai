import { useState } from "react";

import JobDescriptionInput from "./JobDescriptionInput";
import MatchAnalysis from "./MatchAnalysis";

import { matchResume } from "@/services/match";

import type { JobMatchAnalysis } from "@/types/match";

export default function ResumeMatcher() {
  const [file, setFile] =
    useState<File | null>(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [analysis, setAnalysis] =
    useState<JobMatchAnalysis | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {

    if (!file) return;

    if (!jobDescription.trim()) return;

    try {

      setLoading(true);

      const response =
        await matchResume(
          file,
          jobDescription
        );

      setAnalysis(
        response.analysis
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="space-y-6">

      <div className="rounded-xl bg-slate-900 p-6">

        <h2 className="text-xl font-semibold text-white">
          Upload Resume
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] ?? null
            )
          }
          className="mt-5 block text-white"
        />

      </div>

      <JobDescriptionInput
        value={jobDescription}
        onChange={setJobDescription}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        {loading
          ? "Analyzing..."
          : "Analyze Match"}
      </button>

      {analysis && (
        <MatchAnalysis
          analysis={analysis}
        />
      )}

    </div>
  );
}