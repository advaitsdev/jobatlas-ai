from pydantic import BaseModel


class ResumeOptimizationResult(BaseModel):
    overall_score: int

    summary: str

    weak_bullets: list[str]

    improved_bullets: list[str]

    missing_keywords: list[str]

    ats_improvements: list[str]

    section_recommendations: list[str]