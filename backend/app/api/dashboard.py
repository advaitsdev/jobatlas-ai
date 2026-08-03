from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.repositories.dashboard_repository import DashboardRepository
from app.schemas.dashboard import DashboardResponse

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "",
    response_model=DashboardResponse,
)
def get_dashboard(
    db: Session = Depends(get_db),
):
    status_breakdown = DashboardRepository.get_status_breakdown(db)

    return DashboardResponse(
        summary=DashboardRepository.get_summary(status_breakdown),
        source_breakdown=DashboardRepository.get_source_breakdown(db),
        status_breakdown=status_breakdown,
        monthly_applications=DashboardRepository.get_monthly_applications(db),
    )