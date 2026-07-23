import type { ResumeAnalysis as ResumeAnalysisType } from "@/types/resume";

type ResumeAnalysisProps = {
  analysis: ResumeAnalysisType;
};

export default function ResumeAnalysis({
  analysis,
}: ResumeAnalysisProps) {
  return (
    <div className="mt-8 space-y-6">

      {/* Header */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h1 className="text-3xl font-bold text-white">
          Resume Intelligence
        </h1>

        <p className="mt-2 text-slate-400">
          AI-powered ATS analysis of your resume
        </p>
      </div>

      {/* ATS Score */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          ATS Score
        </h2>

        <div className="mt-4 text-5xl font-bold text-blue-500">
          {analysis.ats_score}/100
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-700"
            style={{
              width: `${analysis.ats_score}%`,
            }}
          />
        </div>
      </div>

      {/* Best Role */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          Best Role
        </h2>

        <p className="mt-4 text-lg text-slate-300">
          {analysis.best_role}
        </p>
      </div>

      {/* Skills */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          Technical Skills
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {analysis.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          Strengths
        </h2>

        <ul className="mt-4 space-y-3">
          {analysis.strengths.map((strength) => (
            <li
              key={strength}
              className="text-slate-300"
            >
              ✅ {strength}
            </li>
          ))}
        </ul>
      </div>

      {/* Missing Skills */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          Missing Skills
        </h2>

        <ul className="mt-4 space-y-3">
          {analysis.missing_skills.map((skill) => (
            <li
              key={skill}
              className="text-slate-300"
            >
              ❌ {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          Recommendations
        </h2>

        <ul className="mt-4 space-y-3">
          {analysis.recommendations.map((recommendation) => (
            <li
              key={recommendation}
              className="text-slate-300"
            >
              • {recommendation}
            </li>
          ))}
        </ul>
      </div>

      {/* Education */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          Education
        </h2>

        <div className="mt-4 space-y-4">
          {analysis.education.map((edu) => (
            <div
              key={`${edu.institution}-${edu.degree}`}
              className="rounded-lg bg-slate-800 p-4"
            >
              <h3 className="font-semibold text-white">
                {edu.degree}
              </h3>

              <p className="text-slate-300">
                {edu.institution}
              </p>

              <p className="text-sm text-slate-400">
                {edu.duration}
              </p>

              <p className="text-sm text-slate-400">
                {edu.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          Experience
        </h2>

        <div className="mt-4 space-y-6">
          {analysis.experience.map((exp) => (
            <div
              key={`${exp.organization}-${exp.title}`}
              className="rounded-lg bg-slate-800 p-4"
            >
              <h3 className="font-semibold text-white">
                {exp.title}
              </h3>

              <p className="text-slate-300">
                {exp.organization}
              </p>

              <p className="text-sm text-slate-400">
                {exp.duration}
              </p>

              <p className="text-sm text-slate-400">
                {exp.location}
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
                {exp.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="rounded-xl bg-slate-900 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">
          Projects
        </h2>

        <div className="mt-4 space-y-6">
          {analysis.projects.map((project) => (
            <div
              key={project.name}
              className="rounded-lg bg-slate-800 p-4"
            >
              <h3 className="font-semibold text-white">
                {project.name}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {project.year}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-700 px-3 py-1 text-xs text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}