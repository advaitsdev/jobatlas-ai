export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
}

export interface Experience {
  title: string;
  organization: string;
  duration: string;
  location: string;
  highlights: string[];
}

export interface Project {
  name: string;
  tech_stack: string[];
  year: string;
  highlights: string[];
}

export interface ResumeAnalysis {
  name: string;
  email: string;
  phone: string;

  education: Education[];
  experience: Experience[];
  projects: Project[];

  skills: string[];

  ats_score: number;

  best_role: string;

  strengths: string[];

  missing_skills: string[];

  recommendations: string[];
}
export interface ResumeUploadResponse {
  success: boolean;
  analysis: ResumeAnalysis;
}