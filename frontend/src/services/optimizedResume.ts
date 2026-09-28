import { api } from "./api";

export interface OptimizedEducation {
  institution: string;
  degree: string;
  duration: string;
  location: string;
}

export interface OptimizedExperience {
  title: string;
  organization: string;
  duration: string;
  location: string;
  highlights: string[];
}

export interface OptimizedProject {
  name: string;
  tech_stack: string[];
  year: string;
  highlights: string[];
}

export interface OptimizedResume {
  name: string;
  email: string;
  phone: string;

  summary: string;

  education: OptimizedEducation[];

  experience: OptimizedExperience[];

  projects: OptimizedProject[];

  skills: string[];
}


export interface GenerateOptimizedResumeResponse {
  success: boolean;
  resume_id: string;
  optimized_resume: OptimizedResume;
}


export const generateOptimizedResume = async (
  resumeId: string,
  jobDescription?: string
): Promise<GenerateOptimizedResumeResponse> => {
  const params: Record<string, string> = {};

  if (jobDescription?.trim()) {
    params.job_description =
      jobDescription.trim();
  }

  const response = await api.post(
    `/resume/${resumeId}/generate`,
    null,
    {
      params,
    }
  );

  return response.data;
};


export const downloadOptimizedResume = async (
  optimizedResume: OptimizedResume
) => {
  const response = await api.post(
    "/resume/generate-pdf",
    optimizedResume,
    {
      responseType: "blob",
    }
  );

  const blob = new Blob(
    [response.data],
    {
      type: "application/pdf",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "optimized_resume.pdf";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};