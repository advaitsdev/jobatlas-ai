import ResumeMatcher from "@/components/Resume/ResumeMatcher";

export default function ResumeMatcherPage() {
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Resume Matcher
        </h1>

        <p className="mt-2 text-slate-400">
          Compare your resume against a job description using AI.
        </p>

      </div>

      <ResumeMatcher />

    </div>
  );
}