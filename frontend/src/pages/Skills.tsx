import { useEffect, useMemo, useState } from "react";

import {
  AlertTriangle,
  CheckCircle2,
  Code2,
  Loader2,
  Target,
  TrendingUp,
} from "lucide-react";

import { getResumeHistory } from "@/services/resume";
import { api } from "@/services/api";

import type { ResumeHistoryItem } from "@/types/resume";

type SkillGap = {
  skill: string;
  opportunity_count: number;
  percentage: number;
};

type SkillGapResponse = {
  resume_id: string;
  total_opportunities: number;
  skill_gaps: SkillGap[];
};

export default function Skills() {
  const [resumes, setResumes] = useState<ResumeHistoryItem[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [data, setData] = useState<SkillGapResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingGaps, setLoadingGaps] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        setLoading(true);
        setError(null);

        const history = await getResumeHistory();

        setResumes(history);

        if (history.length > 0) {
          setSelectedResumeId(history[0].id);
        }
      } catch (error) {
        console.error("Failed to load resumes:", error);
        setError("Failed to load your resumes.");
      } finally {
        setLoading(false);
      }
    };

    loadResumes();
  }, []);

  useEffect(() => {
    if (!selectedResumeId) {
      return;
    }

    const loadSkillGaps = async () => {
      try {
        setLoadingGaps(true);
        setError(null);

        const response = await api.get("/opportunities/skill-gaps", {
          params: {
            resume_id: selectedResumeId,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error("Failed to load skill gaps:", error);
        setError("Failed to load skill gaps.");
      } finally {
        setLoadingGaps(false);
      }
    };

    loadSkillGaps();
  }, [selectedResumeId]);

  const topSkillGaps = useMemo(() => {
    if (!data) {
      return [];
    }

    return [...data.skill_gaps]
      .sort((a, b) => {
        if (b.opportunity_count !== a.opportunity_count) {
          return b.opportunity_count - a.opportunity_count;
        }

        return b.percentage - a.percentage;
      })
      .slice(0, 5);
  }, [data]);

  const averageGapCoverage = useMemo(() => {
    if (!data || data.skill_gaps.length === 0) {
      return 0;
    }

    const total = data.skill_gaps.reduce(
      (sum, gap) => sum + gap.percentage,
      0
    );

    return Math.round(total / data.skill_gaps.length);
  }, [data]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Career intelligence
          </p>

          <h1 className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
            Skill Profile
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            See how your skills line up with the opportunities you're tracking
            and identify the gaps appearing most often.
          </p>
        </div>

        {resumes.length > 0 && (
          <div className="w-full lg:w-72">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Active Resume
            </label>

            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.filename}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {resumes.length === 0 ? (
        <EmptyState />
      ) : loadingGaps ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
            <p className="text-sm text-slate-500">
              Analyzing your tracked opportunities...
            </p>
          </div>
        </div>
      ) : data ? (
        <>
          {/* Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <OverviewCard
              icon={<Target className="h-5 w-5" />}
              label="Jobs Analyzed"
              value={data.total_opportunities}
              description="Tracked opportunities"
            />

            <OverviewCard
              icon={<AlertTriangle className="h-5 w-5" />}
              label="Skill Gaps"
              value={data.skill_gaps.length}
              description="Skills missing from your resume"
            />

            <OverviewCard
              icon={<TrendingUp className="h-5 w-5" />}
              label="Gap Coverage"
              value={`${averageGapCoverage}%`}
              description="Average job coverage across gaps"
            />
          </div>

          {/* Main grid */}
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* Skill gaps */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Skill Gaps
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Skills appearing most frequently in jobs you don't fully
                      match.
                    </p>
                  </div>
                </div>

                {data.skill_gaps.length > 0 && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {data.skill_gaps.length} gaps
                  </span>
                )}
              </div>

              {topSkillGaps.length === 0 ? (
                <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" />

                  <p className="mt-3 font-medium text-slate-900">
                    No skill gaps found
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Your current resume covers the required skills in the
                    opportunities analyzed.
                  </p>
                </div>
              ) : (
                <div className="mt-7 space-y-6">
                  {topSkillGaps.map((gap, index) => (
                    <SkillGapRow
                      key={gap.skill}
                      gap={gap}
                      rank={index + 1}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Your profile */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <Code2 className="h-5 w-5 text-slate-700" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Skill Intelligence
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    A quick read of your current opportunity coverage.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-5">
                <InsightRow
                  label="Opportunities tracked"
                  value={data.total_opportunities.toString()}
                />

                <InsightRow
                  label="Unique skill gaps"
                  value={data.skill_gaps.length.toString()}
                />

                <InsightRow
                  label="Most requested gap"
                  value={
                    topSkillGaps.length > 0
                      ? topSkillGaps[0].skill
                      : "None"
                  }
                />
              </div>

              <div className="mt-7 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  What this means
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Skills appearing across multiple opportunities can have a
                  broader impact on your job matching than skills appearing in
                  only one listing.
                </p>
              </div>
            </section>
          </div>

          {/* Full gap list */}
          {data.skill_gaps.length > 5 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h2 className="font-semibold text-slate-900">
                  All Skill Gaps
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Every missing required skill found across your tracked
                  opportunities.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {data.skill_gaps.map((gap) => (
                  <div
                    key={gap.skill}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">
                          {gap.skill}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {gap.opportunity_count}{" "}
                          {gap.opportunity_count === 1 ? "job" : "jobs"}
                        </p>
                      </div>

                      <span className="text-xs font-semibold text-slate-600">
                        {gap.percentage}%
                      </span>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-slate-800 transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            Math.max(gap.percentage, 0),
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      ) : null}
    </div>
  );
}

type OverviewCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
};

function OverviewCard({
  icon,
  label,
  value,
  description,
}: OverviewCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>

        <span className="text-xs font-medium text-slate-400">
          JobAtlasAI
        </span>
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>

      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

type SkillGapRowProps = {
  gap: SkillGap;
  rank: number;
};

function SkillGapRow({ gap, rank }: SkillGapRowProps) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
          {rank}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-4">
            <p className="truncate font-medium text-slate-900">
              {gap.skill}
            </p>

            <span className="shrink-0 text-sm font-semibold text-slate-700">
              {gap.percentage}%
            </span>
          </div>

          <p className="mt-0.5 text-xs text-slate-500">
            Required by {gap.opportunity_count}{" "}
            {gap.opportunity_count === 1 ? "job" : "jobs"}
          </p>
        </div>
      </div>

      <div className="ml-10 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-800 transition-all duration-700"
          style={{
            width: `${Math.min(Math.max(gap.percentage, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

type InsightRowProps = {
  label: string;
  value: string;
};

function InsightRow({ label, value }: InsightRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="max-w-[55%] truncate text-right text-sm font-semibold text-slate-900">
        {value}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
        <Target className="h-6 w-6 text-slate-600" />
      </div>

      <h2 className="mt-5 font-semibold text-slate-900">
        No resume available
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Upload and analyze a resume first. Once you have a resume, JobAtlasAI
        can compare its skills against the opportunities you're tracking.
      </p>
    </div>
  );
}