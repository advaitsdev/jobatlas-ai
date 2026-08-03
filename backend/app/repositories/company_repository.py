import math
from uuid import UUID

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.company import Company
from app.schemas.company import CompanyCreate, CompanyUpdate


class CompanyRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        company_data: CompanyCreate,
    ) -> Company:
        company = Company(
            **company_data.model_dump()
        )

        self.db.add(company)
        self.db.commit()
        self.db.refresh(company)

        return company

    def get_all(
        self,
        search: str | None = None,
        page: int = 1,
        limit: int = 10,
    ):
        query = self.db.query(Company)

        if search:
            query = query.filter(
                or_(
                    Company.name.ilike(f"%{search}%"),
                    Company.industry.ilike(f"%{search}%"),
                )
            )

        total = query.count()

        companies = (
            query.order_by(Company.created_at.desc())
            .offset((page - 1) * limit)
            .limit(limit)
            .all()
        )

        return {
            "items": companies,
            "total": total,
            "page": page,
            "limit": limit,
            "pages": math.ceil(total / limit),
        }

    def get_by_id(
        self,
        company_id: UUID,
    ):
        return (
            self.db.query(Company)
            .filter(Company.id == company_id)
            .first()
        )

    def update(
        self,
        company_id: UUID,
        company_data: CompanyUpdate,
    ):
        company = self.get_by_id(company_id)

        if company is None:
            return None

        update_data = company_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(company, key, value)

        self.db.commit()
        self.db.refresh(company)

        return company

    def delete(
        self,
        company_id: UUID,
    ):
        company = self.get_by_id(company_id)

        if company is None:
            return None

        self.db.delete(company)
        self.db.commit()

        return company