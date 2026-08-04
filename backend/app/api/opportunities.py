from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.enums import OpportunityStatus
from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityResponse,
    OpportunityUpdate,
    PaginatedOpportunityResponse,
)
from app.services.opportunity_service import OpportunityService

router = APIRouter(
    prefix="/opportunities",
    tags=["Opportunities"],
)


@router.post(
    "",
    response_model=OpportunityResponse,
    status_code=201,
)
def create_opportunity(
    opportunity: OpportunityCreate,
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)
    return service.create_opportunity(opportunity)


@router.get(
    "",
    response_model=PaginatedOpportunityResponse,
)
def get_opportunities(
    search: str | None = None,
    status: OpportunityStatus | None = None,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)

    return service.get_opportunities(
        search=search,
        status=status,
        page=page,
        limit=limit,
    )


@router.get(
    "/{opportunity_id}",
    response_model=OpportunityResponse,
)
def get_opportunity(
    opportunity_id: UUID,
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)

    opportunity = service.get_opportunity(
        opportunity_id
    )

    if opportunity is None:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return opportunity


@router.patch(
    "/{opportunity_id}",
    response_model=OpportunityResponse,
)
def update_opportunity(
    opportunity_id: UUID,
    opportunity: OpportunityUpdate,
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)

    updated = service.update_opportunity(
        opportunity_id,
        opportunity,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return updated


@router.delete("/{opportunity_id}")
def delete_opportunity(
    opportunity_id: UUID,
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)

    deleted = service.delete_opportunity(
        opportunity_id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return {
        "success": True,
        "message": "Opportunity deleted successfully.",
    }