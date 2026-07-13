from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends

from app.db.session import get_db
from app.schemas.opportunity import (
    OpportunityCreate,
    OpportunityResponse,
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
