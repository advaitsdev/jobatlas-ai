export interface JobMatchAnalysis {
  overall_match: number;

  ats_match: number;

  recommended_role: string;

  matched_skills: string[];

  missing_skills: string[];

  keyword_matches: string[];

  strengths: string[];

  weaknesses: string[];

  recommendations: string[];

  interview_questions: string[];
}

export interface JobMatchResponse {
  success: boolean;

  analysis: JobMatchAnalysis;
}