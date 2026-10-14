import ResumeUpload from "@/components/Resume/ResumeUpload";
import ResumeOptimizer from "@/components/Resume/ResumeOptimizer";

export default function Resume() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Resume
        </h1>

        <p className="mt-2 text-slate-400">
          Upload your resume to unlock AI-powered insights.
        </p>
      </div>

      <div className="space-y-12">
        <ResumeUpload />

        <div className="border-t border-slate-800 pt-10">
          <ResumeOptimizer />
        </div>
      </div>
    </div>
  );
}