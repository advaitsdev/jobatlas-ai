from uuid import UUID

from sqlalchemy.orm import Session

from app.repositories.company_repository import CompanyRepository
from app.schemas.company import (
    CompanyCreate,
    CompanyUpdate,
)


class CompanyService:
    def __init__(self, db: Session):
        self.repository = CompanyRepository(db)

    def create_company(
        self,
        company_data: CompanyCreate,
    ):
        return self.repository.create(company_data)

    def get_companies(
        self,
        search: str | None = None,
        page: int = 1,
        limit: int = 10,
    ):
        return self.repository.get_all(
            search=search,
            page=page,
            limit=limit,
        )

    def get_company(
        self,
        company_id: UUID,
    ):
        return self.repository.get_by_id(
            company_id,
        )

    def update_company(
        self,
        company_id: UUID,
        company_data: CompanyUpdate,
    ):
        return self.repository.update(
            company_id,
            company_data,
        )

    def delete_company(
        self,
        company_id: UUID,
    ):
        return self.repository.delete(
            company_id,
        )