from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.enums import OpportunityStatus


class OpportunityCreate(BaseModel):
    title: str
    company_id: UUID
    user_id: UUID | None = None

    location: str | None = None
    employment_type: str | None = None
    source: str | None = None
    status: OpportunityStatus = OpportunityStatus.WISHLIST
    application_url: str | None = None
    salary: str | None = None
    applied_date: date | None = None
    deadline: date | None = None
    notes: str | None = None

    # Job Description
    job_description: str | None = None
    required_skills: list[str] | None = None
    preferred_skills: list[str] | None = None
    responsibilities: list[str] | None = None
    qualifications: list[str] | None = None
    experience_required: str | None = None
    education_required: str | None = None


class OpportunityUpdate(BaseModel):
    title: str | None = None
    location: str | None = None
    employment_type: str | None = None
    source: str | None = None
    status: OpportunityStatus | None = None
    application_url: str | None = None
    salary: str | None = None
    applied_date: date | None = None
    deadline: date | None = None
    notes: str | None = None

    # Job Description
    job_description: str | None = None
    required_skills: list[str] | None = None
    preferred_skills: list[str] | None = None
    responsibilities: list[str] | None = None
    qualifications: list[str] | None = None
    experience_required: str | None = None
    education_required: str | None = None


class JobDescriptionParseRequest(BaseModel):
    job_description: str


class JobDescriptionParseResponse(BaseModel):
    title: str | None = None
    location: str | None = None
    employment_type: str | None = None

    required_skills: list[str] = []
    preferred_skills: list[str] = []

    responsibilities: list[str] = []
    qualifications: list[str] = []

    experience_required: str | None = None
    education_required: str | None = None


class CompanySummary(BaseModel):
    id: UUID
    name: str

    model_config = ConfigDict(
        from_attributes=True,
    )


class OpportunityResponse(BaseModel):
    id: UUID

    title: str
    company: CompanySummary
    user_id: UUID | None

    location: str | None
    employment_type: str | None
    source: str | None

    status: OpportunityStatus

    application_url: str | None
    salary: str | None

    applied_date: date | None
    deadline: date | None

    notes: str | None

    # Job Description
    job_description: str | None
    required_skills: list[str] | None
    preferred_skills: list[str] | None
    responsibilities: list[str] | None
    qualifications: list[str] | None
    experience_required: str | None
    education_required: str | None

    model_config = ConfigDict(
        from_attributes=True,
    )


class PaginatedOpportunityResponse(BaseModel):
    items: list[OpportunityResponse]
    total: int
    page: int
    limit: int
    pages: int