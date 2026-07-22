import ResumeUpload from "@/components/Resume/ResumeUpload";

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

      <ResumeUpload />
    </div>
  );
}