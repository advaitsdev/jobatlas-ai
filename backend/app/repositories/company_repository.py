from sqlalchemy.orm import Session

from app.models.company import Company
from app.schemas.company import CompanyCreate, CompanyUpdate


class CompanyRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, company_data: CompanyCreate) -> Company:
        company = Company(
            **company_data.model_dump()
        )

        self.db.add(company)
        self.db.commit()
        self.db.refresh(company)

        return company

    def get_all(self) -> list[Company]:
        return self.db.query(Company).all()

    def update(
        self,
        company_id: str,
        company_data: CompanyUpdate,
    ):
        company = (
            self.db.query(Company)
            .filter(Company.id == company_id)
            .first()
        )

        if not company:
            return None

        update_data = company_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(company, key, value)

        self.db.commit()
        self.db.refresh(company)

        return company

    def delete(self, company_id: str):
        company = (
            self.db.query(Company)
            .filter(Company.id == company_id)
            .first()
        )

        if not company:
            return None

        self.db.delete(company)
        self.db.commit()

        return company