import math
from uuid import UUID

from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.models.company import Company
from app.models.enums import OpportunityStatus
from app.models.opportunity import Opportunity
from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityUpdate,
)


class OpportunityRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        opportunity_data: OpportunityCreate,
    ) -> Opportunity:
        opportunity = Opportunity(
            **opportunity_data.model_dump()
        )

        self.db.add(opportunity)
        self.db.commit()
        self.db.refresh(opportunity)

        return opportunity

    def get_all(
        self,
        search: str | None = None,
        status: OpportunityStatus | None = None,
        page: int = 1,
        limit: int = 10,
    ):
        query = (
            self.db.query(Opportunity)
            .join(Company)
            .options(joinedload(Opportunity.company))
        )

        if search:
            query = query.filter(
                or_(
                    Opportunity.title.ilike(f"%{search}%"),
                    Company.name.ilike(f"%{search}%"),
                    Opportunity.location.ilike(f"%{search}%"),
                )
            )

        if status:
            query = query.filter(
                Opportunity.status == status
            )

        total = query.count()

        opportunities = (
            query.order_by(Opportunity.created_at.desc())
            .offset((page - 1) * limit)
            .limit(limit)
            .all()
        )

        return {
            "items": opportunities,
            "total": total,
            "page": page,
            "limit": limit,
            "pages": math.ceil(total / limit),
        }

    def get_by_id(
        self,
        opportunity_id: UUID,
    ):
        return (
            self.db.query(Opportunity)
            .options(joinedload(Opportunity.company))
            .filter(Opportunity.id == opportunity_id)
            .first()
        )

    def update(
        self,
        opportunity_id: UUID,
        opportunity_data: OpportunityUpdate,
    ):
        opportunity = self.get_by_id(
            opportunity_id
        )

        if opportunity is None:
            return None

        update_data = opportunity_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(opportunity, key, value)

        self.db.commit()
        self.db.refresh(opportunity)

        return opportunity

    def delete(
        self,
        opportunity_id: UUID,
    ):
        opportunity = self.get_by_id(
            opportunity_id
        )

        if opportunity is None:
            return None

        self.db.delete(opportunity)
        self.db.commit()

        return opportunity