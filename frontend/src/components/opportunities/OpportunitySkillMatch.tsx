import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Target,
} from "lucide-react";

import {
  getOpportunitySkillMatch,
  type OpportunitySkillMatch as OpportunitySkillMatchResult,
} from "@/services/opportunity";

import { getResumeHistory } from "@/services/resume";

import type { ResumeHistoryItem } from "@/types/resume";

type Props = {
  opportunityId: string;
};

export default function OpportunitySkillMatch({
  opportunityId,
}: Props) {
  const [resumes, setResumes] = useState<
    ResumeHistoryItem[]
  >([]);

  const [selectedResumeId, setSelectedResumeId] =
    useState("");

  const [result, setResult] =
    useState<OpportunitySkillMatchResult | null>(
      null
    );

  const [loadingResumes, setLoadingResumes] =
    useState(true);

  const [loadingMatch, setLoadingMatch] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        setLoadingResumes(true);
        setError(null);

        const data =
          await getResumeHistory();

        setResumes(data);

        if (data.length > 0) {
          setSelectedResumeId(data[0].id);
        }
      } catch (error) {
        console.error(
          "Failed to load resume history:",
          error
        );

        setError(
          "Failed to load resumes."
        );
      } finally {
        setLoadingResumes(false);
      }
    };

    loadResumes();
  }, []);

  const handleMatch = async () => {
    if (!selectedResumeId) {
      setError(
        "Please select a resume first."
      );

      return;
    }

    try {
      setLoadingMatch(true);
      setError(null);

      const data =
        await getOpportunitySkillMatch(
          opportunityId,
          selectedResumeId
        );

      setResult(data);
    } catch (error) {
      console.error(
        "Failed to calculate skill match:",
        error
      );

      setError(
        "Failed to calculate skill match."
      );
    } finally {
      setLoadingMatch(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Resume selector */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
            <Target className="h-5 w-5 text-slate-700" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Resume Match
            </h3>

            <p className="text-sm text-slate-500">
              Compare your resume against this job.
            </p>
          </div>
        </div>

        {loadingResumes ? (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2
              className="h-4 w-4 animate-spin"
            />
            Loading resumes...
          </div>
        ) : resumes.length === 0 ? (
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            No saved resumes found.
          </div>
        ) : (
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">
              Resume
            </label>

            <select
              value={selectedResumeId}
              onChange={(e) => {
                setSelectedResumeId(
                  e.target.value
                );

                setResult(null);
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            >
              {resumes.map((resume) => (
                <option
                  key={resume.id}
                  value={resume.id}
                >
                  {resume.filename}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleMatch}
              disabled={
                loadingMatch ||
                !selectedResumeId
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingMatch && (
                <Loader2
                  className="h-4 w-4 animate-spin"
                />
              )}

              {loadingMatch
                ? "Analyzing..."
                : "Analyze Match"}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {result && (
        <>
          {/* Overall score */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Overall Match
                </p>

                <h2 className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
                  {result.overall_match_percentage}%
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Based on required and preferred skills
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                <Target className="h-6 w-6 text-slate-700" />
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-900 transition-all duration-700"
                style={{
                  width: `${Math.min(
                    Math.max(
                      result.overall_match_percentage,
                      0
                    ),
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Match breakdown */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Metric
              label="Required Skills"
              value={
                result.required_match_percentage
              }
            />

            <Metric
              label="Preferred Skills"
              value={
                result.preferred_match_percentage
              }
            />
          </div>

          {/* Matched required */}
          <SkillSection
            title="Matched Required Skills"
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
            iconClassName="bg-emerald-50 text-emerald-600"
            skills={
              result.matched_required_skills
            }
            emptyMessage="No required skills matched yet."
          />

          {/* Missing required */}
          <SkillSection
            title="Missing Required Skills"
            icon={
              <AlertTriangle className="h-5 w-5" />
            }
            iconClassName="bg-amber-50 text-amber-600"
            skills={
              result.missing_required_skills
            }
            emptyMessage="No required skills are missing."
          />

          {/* Preferred skills */}
          <div className="grid gap-4 sm:grid-cols-2">
            <SkillSection
              title="Matched Preferred"
              icon={
                <CheckCircle2 className="h-5 w-5" />
              }
              iconClassName="bg-emerald-50 text-emerald-600"
              skills={
                result.matched_preferred_skills
              }
              emptyMessage="None"
            />

            <SkillSection
              title="Missing Preferred"
              icon={
                <AlertTriangle className="h-5 w-5" />
              }
              iconClassName="bg-amber-50 text-amber-600"
              skills={
                result.missing_preferred_skills
              }
              emptyMessage="None"
            />
          </div>
        </>
      )}
    </div>
  );
}

type MetricProps = {
  label: string;
  value: number;
};

function Metric({
  label,
  value,
}: MetricProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}%
      </p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-700 transition-all duration-500"
          style={{
            width: `${Math.min(
              Math.max(value, 0),
              100
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

type SkillSectionProps = {
  title: string;
  icon: React.ReactNode;
  iconClassName: string;
  skills: string[];
  emptyMessage: string;
};

function SkillSection({
  title,
  icon,
  iconClassName,
  skills,
  emptyMessage,
}: SkillSectionProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClassName}`}
        >
          {icon}
        </div>

        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>
      </div>

      {skills.length === 0 ? (
        <p className="mt-4 text-sm text-slate-400">
          {emptyMessage}
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}