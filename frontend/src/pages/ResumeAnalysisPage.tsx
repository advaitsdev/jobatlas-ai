import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ResumeAnalysis from "@/components/Resume/ResumeAnalysis";
import { getResume } from "@/services/resume";

export default function ResumeAnalysisPage() {
  const { id } = useParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      loadResume();
    }
  }, [id]);

  async function loadResume() {
    const response = await getResume(id!);

    setData(response);
  }

  if (!data) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  return (
    <ResumeAnalysis
      analysis={data.analysis}
    />
  );
}