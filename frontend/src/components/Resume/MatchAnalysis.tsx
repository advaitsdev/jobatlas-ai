import type { MatchAnalysis as MatchAnalysisType } from "@/types/match";

type Props = {
  analysis: MatchAnalysisType;
};

export default function MatchAnalysis({
  analysis,
}: Props) {
  return (
    <div className="mt-8 space-y-6">

      {/* Match Score */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">

        <h2 className="text-xl font-semibold text-white">
          Job Match Score
        </h2>

        <div className="mt-4 text-5xl font-bold text-green-500">
          {analysis.match_score}%
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">

          <div
            className="h-full rounded-full bg-green-500 transition-all duration-700"
            style={{
              width: `${analysis.match_score}%`,
            }}
          />

        </div>

      </div>

      {/* Matched Skills */}

      <div className="rounded-xl bg-slate-900 p-6 shadow">

        <h2 className="text-xl font-semibold text-white">
          ✅ Matched Skills
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">

          {(analysis.matched_skills ?? []).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-green-600 px-3 py-1 text-sm text-white"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      {/* Missing Skills */}

      <div className="rounded-xl bg-slate-900 p-6 shadow">

        <h2 className="text-xl font-semibold text-white">
          ❌ Missing Skills
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">

          {(analysis.missing_skills ?? []).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-red-600 px-3 py-1 text-sm text-white"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      {/* Keyword Matches */}

      <div className="rounded-xl bg-slate-900 p-6 shadow">

        <h2 className="text-xl font-semibold text-white">
          🔍 Keyword Matches
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">

          {(analysis.keyword_matches ?? []).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      {/* Recommendations */}

      <div className="rounded-xl bg-slate-900 p-6 shadow">

        <h2 className="text-xl font-semibold text-white">
          💡 Recommendations
        </h2>

        <ul className="mt-4 space-y-3">

          {(analysis.recommendations ?? []).map((item) => (
            <li
              key={item}
              className="text-slate-300"
            >
              • {item}
            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}