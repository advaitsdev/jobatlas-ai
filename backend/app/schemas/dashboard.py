from pydantic import BaseModel


class SummaryResponse(BaseModel):
    total_applications: int
    applied: int
    interview: int
    hr: int
    offer: int
    rejected: int
    ghosted: int
    withdrawn: int


class SourceBreakdownResponse(BaseModel):
    source: str
    count: int


class StatusBreakdownResponse(BaseModel):
    status: str
    count: int


class MonthlyApplicationsResponse(BaseModel):
    month: str
    count: int


class DashboardResponse(BaseModel):
    summary: SummaryResponse
    source_breakdown: list[SourceBreakdownResponse]
    status_breakdown: list[StatusBreakdownResponse]
    monthly_applications: list[MonthlyApplicationsResponse]