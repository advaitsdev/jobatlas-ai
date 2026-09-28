export interface ResumeOptimization {
  overall_score: number;
  summary: string;
  weak_bullets: string[];
  improved_bullets: string[];
  missing_keywords: string[];
  ats_improvements: string[];
  section_recommendations: string[];
}

export interface ResumeOptimizationResponse {
  success: boolean;
  resume_id: string;
  optimization: ResumeOptimization;
}