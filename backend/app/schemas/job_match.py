from pydantic import BaseModel


class JobMatchResult(BaseModel):
    overall_match: int

    ats_match: int

    recommended_role: str

    matched_skills: list[str]

    missing_skills: list[str]

    keyword_matches: list[str]

    strengths: list[str]

    weaknesses: list[str]

    recommendations: list[str]

    interview_questions: list[str]