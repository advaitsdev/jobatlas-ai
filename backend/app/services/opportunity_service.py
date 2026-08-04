from uuid import UUID

from sqlalchemy.orm import Session

from app.models.enums import OpportunityStatus
from app.repositories.opportunity_repository import OpportunityRepository
from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityUpdate,
)


class OpportunityService:
    def __init__(self, db: Session):
        self.repository = OpportunityRepository(db)

    def create_opportunity(
        self,
        opportunity_data: OpportunityCreate,
    ):
        return self.repository.create(opportunity_data)

    def get_opportunities(
        self,
        search: str | None = None,
        status: OpportunityStatus | None = None,
        page: int = 1,
        limit: int = 10,
    ):
        return self.repository.get_all(
            search=search,
            status=status,
            page=page,
            limit=limit,
        )

    def get_opportunity(
        self,
        opportunity_id: UUID,
    ):
        return self.repository.get_by_id(
            opportunity_id
        )

    def update_opportunity(
        self,
        opportunity_id: UUID,
        opportunity_data: OpportunityUpdate,
    ):
        return self.repository.update(
            opportunity_id,
            opportunity_data,
        )

    def delete_opportunity(
        self,
        opportunity_id: UUID,
    ):
        return self.repository.delete(
            opportunity_id,
        )
