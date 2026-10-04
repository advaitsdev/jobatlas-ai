from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.analytics_service import (
    AnalyticsService,
)


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get("/applications")
def get_application_analytics(
    db: Session = Depends(get_db),
):
    return AnalyticsService.get_application_analytics(
        db,
    )