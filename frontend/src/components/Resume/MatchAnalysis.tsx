import type { JobMatchAnalysis } from "@/types/match";

type Props = {
  analysis: JobMatchAnalysis;
};

export default function MatchAnalysis({
  analysis,
}: Props) {
  return (
    <div className="mt-8 space-y-6">

      {/* Overall Match */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          Overall Match
        </h2>

        <div className="mt-4 text-5xl font-bold text-green-500">
          {analysis.overall_match}%
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-700"
            style={{
              width: `${analysis.overall_match}%`,
            }}
          />
        </div>
      </div>

      {/* ATS Match */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          ATS Compatibility
        </h2>

        <div className="mt-4 text-5xl font-bold text-blue-500">
          {analysis.ats_match}%
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-700"
            style={{
              width: `${analysis.ats_match}%`,
            }}
          />
        </div>
      </div>

      {/* Recommended Role */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          Recommended Role
        </h2>

        <p className="mt-4 text-lg text-slate-300">
          {analysis.recommended_role}
        </p>
      </div>

      {/* Matched Skills */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          ✅ Matched Skills
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {analysis.matched_skills.map((skill) => (
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
          {analysis.missing_skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-red-600 px-3 py-1 text-sm text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          💪 Strengths
        </h2>

        <ul className="mt-4 space-y-2">
          {analysis.strengths.map((item) => (
            <li
              key={item}
              className="text-slate-300"
            >
              • {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          ⚠️ Weaknesses
        </h2>

        <ul className="mt-4 space-y-2">
          {analysis.weaknesses.map((item) => (
            <li
              key={item}
              className="text-slate-300"
            >
              • {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Keyword Matches */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          🔍 Keyword Matches
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {analysis.keyword_matches.map((item) => (
            <span
              key={item}
              className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          💡 Recommendations
        </h2>

        <ul className="mt-4 space-y-2">
          {analysis.recommendations.map((item) => (
            <li
              key={item}
              className="text-slate-300"
            >
              • {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Interview Questions */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          🎤 Interview Questions
        </h2>

        <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-300">
          {analysis.interview_questions.map((question) => (
            <li key={question}>
              {question}
            </li>
          ))}
        </ol>
      </div>

    </div>
  );
}