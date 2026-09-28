import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Search,
  Lightbulb,
  FileEdit,
  FileText,
  User,
  GraduationCap,
  Briefcase,
  Code2,
} from "lucide-react";

import {
  getResumeHistory,
} from "@/services/resume";

import {
  optimizeResume,
} from "@/services/resumeOptimizer";

import {
  generateOptimizedResume,
  downloadOptimizedResume,
} from "@/services/optimizedResume";

import type {
  ResumeHistoryItem,
} from "@/types/resume";

import type {
  ResumeOptimization,
} from "@/types/resumeOptimizer";

import type {
  GenerateOptimizedResumeResponse,
} from "@/services/optimizedResume";


export default function ResumeOptimizer() {
  const [resumes, setResumes] =
    useState<ResumeHistoryItem[]>([]);

  const [selectedResumeId, setSelectedResumeId] =
    useState("");

  const [jobDescription, setJobDescription] =
    useState("");

  const [optimization, setOptimization] =
    useState<ResumeOptimization | null>(null);

  const [
    optimizedResume,
    setOptimizedResume,
  ] =
    useState<
      GenerateOptimizedResumeResponse["optimized_resume"] | null
    >(null);

  const [loading, setLoading] =
    useState(false);

  const [
    generatingResume,
    setGeneratingResume,
  ] =
    useState(false);

  const [
    downloadingResume,
    setDownloadingResume,
  ] =
    useState(false);

  const [loadingResumes, setLoadingResumes] =
    useState(true);


  useEffect(() => {
    const loadResumes = async () => {
      try {
        setLoadingResumes(true);

        const data =
          await getResumeHistory();

        setResumes(data);

        if (data.length > 0) {
          setSelectedResumeId(
            data[0].id
          );
        }

        const savedResume =
          localStorage.getItem(
            "jobatlas_optimized_resume"
          );

        if (savedResume) {
          try {
            setOptimizedResume(
              JSON.parse(savedResume)
            );
          } catch (error) {
            console.error(
              "Failed to restore optimized resume:",
              error
            );

            localStorage.removeItem(
              "jobatlas_optimized_resume"
            );
          }
        }

      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load your resumes."
        );

      } finally {
        setLoadingResumes(false);
      }
    };

    loadResumes();
  }, []);


  const handleOptimize = async () => {
    if (!selectedResumeId) {
      toast.error(
        "Please select a resume."
      );

      return;
    }

    try {
      setLoading(true);
      setOptimization(null);
      setOptimizedResume(null);

      localStorage.removeItem(
        "jobatlas_optimized_resume"
      );

      const response =
        await optimizeResume(
          selectedResumeId,
          jobDescription
        );

      setOptimization(
        response.optimization
      );

      toast.success(
        "Resume optimized successfully!"
      );

    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to optimize your resume right now."
      );

    } finally {
      setLoading(false);
    }
  };


  const handleGenerateOptimizedResume =
    async () => {

      if (!selectedResumeId) {
        toast.error(
          "Please select a resume."
        );

        return;
      }

      try {
        setGeneratingResume(true);
        setOptimizedResume(null);

        const response =
          await generateOptimizedResume(
            selectedResumeId,
            jobDescription
          );

        setOptimizedResume(
          response.optimized_resume
        );

        localStorage.setItem(
          "jobatlas_optimized_resume",
          JSON.stringify(
            response.optimized_resume
          )
        );

        toast.success(
          "Optimized resume generated successfully!"
        );

      } catch (error) {
        console.error(error);

        toast.error(
          "Unable to generate the optimized resume right now."
        );

      } finally {
        setGeneratingResume(false);
      }
    };


  const handleDownloadOptimizedResume =
    async () => {

      if (!optimizedResume) {
        toast.error(
          "Generate an optimized resume first."
        );

        return;
      }

      try {
        setDownloadingResume(true);

        toast.loading(
          "Generating your PDF...",
          {
            id: "resume-pdf",
          }
        );

        await downloadOptimizedResume(
          optimizedResume
        );

        toast.success(
          "Optimized resume downloaded!",
          {
            id: "resume-pdf",
          }
        );

      } catch (error) {
        console.error(error);

        toast.error(
          "Unable to download the optimized resume.",
          {
            id: "resume-pdf",
          }
        );

      } finally {
        setDownloadingResume(false);
      }
    };


  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

        <div className="flex items-center gap-3">

          <Sparkles
            size={28}
            className="text-blue-500"
          />

          <div>

            <h2 className="text-xl font-semibold text-white">
              AI Resume Optimizer
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Improve your resume for ATS systems
              and real recruiters.
            </p>

          </div>

        </div>

      </div>


      {/* Resume Selection */}

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

        <label
          htmlFor="resume-select"
          className="flex items-center gap-2 text-lg font-semibold text-white"
        >

          <FileText
            size={20}
            className="text-blue-500"
          />

          Select Resume

        </label>

        <p className="mt-1 text-sm text-slate-400">
          Choose one of your previously uploaded
          resumes to optimize.
        </p>


        {loadingResumes ? (

          <p className="mt-4 text-sm text-slate-400">
            Loading resumes...
          </p>

        ) : resumes.length === 0 ? (

          <p className="mt-4 text-sm text-yellow-400">
            No resumes found. Upload a resume first.
          </p>

        ) : (

          <select
            id="resume-select"
            value={selectedResumeId}
            onChange={(event) => {

              setSelectedResumeId(
                event.target.value
              );

              setOptimization(null);
              setOptimizedResume(null);

              localStorage.removeItem(
                "jobatlas_optimized_resume"
              );

            }}
            className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none transition focus:border-blue-500"
          >

            {resumes.map((resume) => (

              <option
                key={resume.id}
                value={resume.id}
              >

                {resume.filename} — ATS Score:{" "}
                {resume.ats_score}%

              </option>

            ))}

          </select>

        )}

      </div>


      {/* Job Description */}

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

        <label
          htmlFor="job-description"
          className="text-lg font-semibold text-white"
        >
          Target Job Description
        </label>

        <p className="mt-1 text-sm text-slate-400">
          Optional. Paste a job description to get
          role-specific optimization suggestions.
        </p>

        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(event) =>
            setJobDescription(
              event.target.value
            )
          }
          placeholder="Paste the job description here..."
          rows={8}
          className="mt-4 w-full resize-y rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none transition focus:border-blue-500"
        />


        <button
          type="button"
          onClick={handleOptimize}
          disabled={
            loading ||
            generatingResume ||
            downloadingResume ||
            loadingResumes ||
            resumes.length === 0
          }
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >

          <Sparkles size={18} />

          {loading
            ? "Optimizing..."
            : "Optimize Resume"}

        </button>

      </div>


      {/* Loading */}

      {loading && (

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center">

          <p className="text-lg font-medium text-blue-400">
            🤖 AI is optimizing your resume...
          </p>

          <p className="mt-2 text-sm text-slate-400">
            This may take a few seconds.
          </p>

        </div>

      )}


      {/* Optimization Results */}

      {optimization && !loading && (

        <div className="space-y-6">

          {/* Score */}

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <CheckCircle2
                size={24}
                className="text-green-500"
              />

              <h2 className="text-xl font-semibold text-white">
                Resume Score
              </h2>

            </div>

            <div className="mt-5 text-5xl font-bold text-green-500">
              {optimization.overall_score}%
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">

              <div
                className="h-full rounded-full bg-green-500 transition-all duration-700"
                style={{
                  width: `${optimization.overall_score}%`,
                }}
              />

            </div>

            <p className="mt-5 leading-7 text-slate-300">
              {optimization.summary}
            </p>

          </div>


          {/* Weak Bullets */}

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <AlertTriangle
                size={24}
                className="text-yellow-500"
              />

              <h2 className="text-xl font-semibold text-white">
                Weak Bullet Points
              </h2>

            </div>

            <ul className="mt-5 space-y-3">

              {optimization.weak_bullets.map(
                (bullet, index) => (

                  <li
                    key={`${bullet}-${index}`}
                    className="rounded-lg bg-slate-800 p-4 text-slate-300"
                  >
                    {bullet}
                  </li>

                )
              )}

            </ul>

          </div>


          {/* Improved Bullets */}

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <FileEdit
                size={24}
                className="text-blue-500"
              />

              <h2 className="text-xl font-semibold text-white">
                Improved Bullet Points
              </h2>

            </div>

            <div className="mt-5 space-y-3">

              {optimization.improved_bullets.map(
                (bullet, index) => (

                  <div
                    key={`${bullet}-${index}`}
                    className="rounded-lg border border-blue-900/50 bg-blue-950/30 p-4 text-slate-300"
                  >
                    {bullet}
                  </div>

                )
              )}

            </div>

          </div>


          {/* Missing Keywords */}

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <Search
                size={24}
                className="text-purple-500"
              />

              <h2 className="text-xl font-semibold text-white">
                Missing Keywords
              </h2>

            </div>

            <div className="mt-5 flex flex-wrap gap-2">

              {optimization.missing_keywords.map(
                (keyword, index) => (

                  <span
                    key={`${keyword}-${index}`}
                    className="rounded-full bg-purple-600 px-3 py-1 text-sm text-white"
                  >
                    {keyword}
                  </span>

                )
              )}

            </div>

          </div>


          {/* ATS Improvements */}

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <Sparkles
                size={24}
                className="text-blue-500"
              />

              <h2 className="text-xl font-semibold text-white">
                ATS Improvements
              </h2>

            </div>

            <ul className="mt-5 space-y-3">

              {optimization.ats_improvements.map(
                (item, index) => (

                  <li
                    key={`${item}-${index}`}
                    className="text-slate-300"
                  >
                    • {item}
                  </li>

                )
              )}

            </ul>

          </div>


          {/* Section Recommendations */}

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <Lightbulb
                size={24}
                className="text-yellow-400"
              />

              <h2 className="text-xl font-semibold text-white">
                Section Recommendations
              </h2>

            </div>

            <ul className="mt-5 space-y-3">

              {optimization.section_recommendations.map(
                (item, index) => (

                  <li
                    key={`${item}-${index}`}
                    className="text-slate-300"
                  >
                    • {item}
                  </li>

                )
              )}

            </ul>

          </div>


          {/* Generate Optimized Resume */}

          <div className="rounded-xl border border-blue-900/60 bg-blue-950/20 p-6">

            <div className="flex items-center gap-3">

              <FileEdit
                size={26}
                className="text-blue-400"
              />

              <div>

                <h2 className="text-xl font-semibold text-white">
                  Generate Optimized Resume
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Generate a rewritten, ATS-friendly version
                  using the recommendations above.
                </p>

              </div>

            </div>


            <button
              type="button"
              onClick={
                handleGenerateOptimizedResume
              }
              disabled={
                generatingResume ||
                loading ||
                downloadingResume ||
                !selectedResumeId
              }
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <Sparkles size={18} />

              {generatingResume
                ? "Generating Resume..."
                : "Generate Optimized Resume"}

            </button>

          </div>

        </div>

      )}


      {/* Generated Resume Loading */}

      {generatingResume && (

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center">

          <p className="text-lg font-medium text-blue-400">
            ✨ AI is rewriting your resume...
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Your existing experience is being preserved
            while the wording is optimized.
          </p>

        </div>

      )}


      {/* Generated Resume */}

      {optimizedResume && !generatingResume && (

        <div className="space-y-6">

          {/* Resume Header */}

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-8">

            <div className="border-b border-slate-700 pb-6">

              <h2 className="text-3xl font-bold text-white">
                {optimizedResume.name}
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                {optimizedResume.email}
                {" • "}
                {optimizedResume.phone}
              </p>

            </div>


            {/* Summary */}

            {optimizedResume.summary && (

              <div className="mt-6">

                <div className="flex items-center gap-2">

                  <User
                    size={20}
                    className="text-blue-400"
                  />

                  <h3 className="text-lg font-semibold text-white">
                    Professional Summary
                  </h3>

                </div>

                <p className="mt-3 leading-7 text-slate-300">
                  {optimizedResume.summary}
                </p>

              </div>

            )}


            {/* Education */}

            {optimizedResume.education.length > 0 && (

              <div className="mt-8">

                <div className="flex items-center gap-2">

                  <GraduationCap
                    size={20}
                    className="text-blue-400"
                  />

                  <h3 className="text-lg font-semibold text-white">
                    Education
                  </h3>

                </div>

                <div className="mt-4 space-y-4">

                  {optimizedResume.education.map(
                    (education, index) => (

                      <div
                        key={`${education.institution}-${index}`}
                        className="rounded-lg bg-slate-800 p-4"
                      >

                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

                          <div>

                            <p className="font-semibold text-white">
                              {education.degree}
                            </p>

                            <p className="text-slate-300">
                              {education.institution}
                            </p>

                          </div>

                          <div className="text-sm text-slate-400 sm:text-right">

                            <p>
                              {education.duration}
                            </p>

                            <p>
                              {education.location}
                            </p>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}


            {/* Experience */}

            {optimizedResume.experience.length > 0 && (

              <div className="mt-8">

                <div className="flex items-center gap-2">

                  <Briefcase
                    size={20}
                    className="text-blue-400"
                  />

                  <h3 className="text-lg font-semibold text-white">
                    Experience
                  </h3>

                </div>

                <div className="mt-4 space-y-6">

                  {optimizedResume.experience.map(
                    (experience, index) => (

                      <div
                        key={`${experience.organization}-${index}`}
                      >

                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

                          <div>

                            <p className="font-semibold text-white">
                              {experience.title}
                            </p>

                            <p className="text-slate-300">
                              {experience.organization}
                            </p>

                          </div>

                          <div className="text-sm text-slate-400 sm:text-right">

                            <p>
                              {experience.duration}
                            </p>

                            <p>
                              {experience.location}
                            </p>

                          </div>

                        </div>

                        <ul className="mt-3 space-y-2">

                          {experience.highlights.map(
                            (highlight, highlightIndex) => (

                              <li
                                key={`${highlight}-${highlightIndex}`}
                                className="flex gap-3 text-slate-300"
                              >

                                <span className="text-blue-400">
                                  •
                                </span>

                                <span>
                                  {highlight}
                                </span>

                              </li>

                            )
                          )}

                        </ul>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}


            {/* Projects */}

            {optimizedResume.projects.length > 0 && (

              <div className="mt-8">

                <div className="flex items-center gap-2">

                  <Code2
                    size={20}
                    className="text-blue-400"
                  />

                  <h3 className="text-lg font-semibold text-white">
                    Projects
                  </h3>

                </div>

                <div className="mt-4 space-y-6">

                  {optimizedResume.projects.map(
                    (project, index) => (

                      <div
                        key={`${project.name}-${index}`}
                      >

                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

                          <p className="font-semibold text-white">
                            {project.name}
                          </p>

                          <p className="text-sm text-slate-400">
                            {project.year}
                          </p>

                        </div>

                        {project.tech_stack.length > 0 && (

                          <p className="mt-1 text-sm text-blue-400">
                            {project.tech_stack.join(
                              " • "
                            )}
                          </p>

                        )}

                        <ul className="mt-3 space-y-2">

                          {project.highlights.map(
                            (highlight, highlightIndex) => (

                              <li
                                key={`${highlight}-${highlightIndex}`}
                                className="flex gap-3 text-slate-300"
                              >

                                <span className="text-blue-400">
                                  •
                                </span>

                                <span>
                                  {highlight}
                                </span>

                              </li>

                            )
                          )}

                        </ul>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}


            {/* Skills */}

            {optimizedResume.skills.length > 0 && (

              <div className="mt-8">

                <div className="flex items-center gap-2">

                  <Code2
                    size={20}
                    className="text-blue-400"
                  />

                  <h3 className="text-lg font-semibold text-white">
                    Skills
                  </h3>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  {optimizedResume.skills.map(
                    (skill, index) => (

                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
                      >
                        {skill}
                      </span>

                    )
                  )}

                </div>

              </div>

            )}


            {/* Download PDF */}

            <div className="mt-10 border-t border-slate-700 pt-6">

              <button
                type="button"
                onClick={
                  handleDownloadOptimizedResume
                }
                disabled={downloadingResume}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                <FileText size={18} />

                {downloadingResume
                  ? "Generating PDF..."
                  : "Download Optimized Resume"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}