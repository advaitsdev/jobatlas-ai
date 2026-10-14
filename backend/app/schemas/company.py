from uuid import UUID

from pydantic import BaseModel, ConfigDict


class CompanyCreate(BaseModel):
    name: str
    website: str | None = None
    industry: str | None = None


class CompanyUpdate(BaseModel):
    name: str | None = None
    website: str | None = None
    industry: str | None = None


class CompanyResponse(BaseModel):
    id: UUID

    name: str
    website: str | None
    industry: str | None

    model_config = ConfigDict(from_attributes=True)


class PaginatedCompanyResponse(BaseModel):
    items: list[CompanyResponse]
    total: int
    page: int
    limit: int
    pages: int