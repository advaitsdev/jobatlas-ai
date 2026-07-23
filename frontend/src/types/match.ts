export interface MatchAnalysis {
  match_score: number;

  matched_skills: string[];

  missing_skills: string[];

  keyword_matches: string[];

  recommendations: string[];
}