from sqlalchemy.orm import Session
from fastapi import HTTPException

from fastapi import APIRouter, Depends

from app.db.session import get_db
from app.schemas.opportunity import (OpportunityCreate,OpportunityResponse,)
from app.services.opportunity_service import OpportunityService
from app.schemas.opportunity import (OpportunityCreate,OpportunityResponse,OpportunityUpdate,)

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

from typing import List

@router.get(
    "",
    response_model=List[OpportunityResponse],
)
def get_opportunities(
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)
    return service.get_opportunities()

@router.delete("/{opportunity_id}")
def delete_opportunity(
    opportunity_id: str,
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)

    deleted = service.delete_opportunity(opportunity_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return {
        "message": "Opportunity deleted successfully"
    }

@router.patch(
    "/{opportunity_id}",
    response_model=OpportunityResponse,
)
def update_opportunity(
    opportunity_id: str,
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