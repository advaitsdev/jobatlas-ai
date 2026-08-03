from datetime import date, datetime
from uuid import UUID

from pydantic import BaseModel, HttpUrl

from app.schemas.enums import JobSource, JobStatus


class JobApplicationCreate(BaseModel):
    company: str
    role: str
    location: str | None = None
    source: JobSource
    job_url: HttpUrl | None = None
    salary: str | None = None
    status: JobStatus = JobStatus.APPLIED
    notes: str | None = None
    date_applied: date


class JobApplicationUpdate(BaseModel):
    company: str
    role: str
    location: str | None = None
    source: JobSource
    job_url: HttpUrl | None = None
    salary: str | None = None
    status: JobStatus
    notes: str | None = None
    date_applied: date


class JobApplicationResponse(BaseModel):
    id: UUID
    company: str
    role: str
    location: str | None
    source: JobSource
    job_url: str | None
    salary: str | None
    status: JobStatus
    notes: str | None
    date_applied: date
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }
class PaginatedJobApplicationResponse(BaseModel):
    items: list[JobApplicationResponse]
    total: int
    page: int
    limit: int
    pages: int