import { api } from "./api";

export interface ResumeOptimizationRequest {
  resumeId: string;
  jobDescription?: string;
}

export const optimizeResume = async (
  resumeId: string,
  jobDescription?: string
) => {
  const params: Record<string, string> = {};

  if (jobDescription?.trim()) {
    params.job_description =
      jobDescription.trim();
  }

  const response = await api.post(
    `/resume/${resumeId}/optimize`,
    null,
    {
      params,
    }
  );

  return response.data;
};