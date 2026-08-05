from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class Education(BaseModel):
    institution: str
    degree: str
    duration: str
    location: str


class Experience(BaseModel):
    title: str
    organization: str
    duration: str
    location: str
    highlights: list[str]


class Project(BaseModel):
    name: str
    tech_stack: list[str]
    year: str
    highlights: list[str]


class ResumeAnalysisResult(BaseModel):
    name: str

    email: str

    phone: str

    education: list[Education]

    experience: list[Experience]

    projects: list[Project]

    skills: list[str]

    ats_score: float

    best_role: str

    strengths: list[str]

    missing_skills: list[str]

    recommendations: list[str]


class ResumeAnalysisResponse(BaseModel):
    id: UUID

    resume_id: UUID

    name: str | None

    email: str | None

    phone: str | None

    education: list

    experience: list

    projects: list

    skills: list[str]

    ats_score: float

    best_role: str | None

    strengths: list[str]

    missing_skills: list[str]

    recommendations: list[str]

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )