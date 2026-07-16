from sqlalchemy.orm import Session

from app.repositories.company_repository import CompanyRepository
from app.schemas.company import CompanyCreate, CompanyUpdate


class CompanyService:
    def __init__(self, db: Session):
        self.repository = CompanyRepository(db)

    def create_company(self, company_data: CompanyCreate):
        return self.repository.create(company_data)

    def get_companies(self):
        return self.repository.get_all()

    def update_company(
        self,
        company_id: str,
        company_data: CompanyUpdate,
    ):
        return self.repository.update(
            company_id,
            company_data,
        )

    def delete_company(self, company_id: str):
        return self.repository.delete(company_id)