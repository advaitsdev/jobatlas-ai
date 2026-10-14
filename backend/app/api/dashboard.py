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
    status_breakdown = (
        DashboardRepository.get_status_breakdown(db)
    )

    conversion_metrics = (
        DashboardRepository.get_conversion_metrics(db)
    )

    return DashboardResponse(
        summary=DashboardRepository.get_summary(
            status_breakdown
        ),
        source_breakdown=(
            DashboardRepository.get_source_breakdown(db)
        ),
        status_breakdown=status_breakdown,
        monthly_applications=(
            DashboardRepository.get_monthly_applications(db)
        ),
        company_breakdown=(
            DashboardRepository.get_company_breakdown(db)
        ),
        applications_last_30_days=(
            DashboardRepository.get_applications_last_30_days(db)
        ),
        application_to_rejection_ratio=(
            conversion_metrics[
                "application_to_rejection_ratio"
            ]
        ),
        application_to_interview_ratio=(
            conversion_metrics[
                "application_to_interview_ratio"
            ]
        ),
        application_to_offer_ratio=(
            conversion_metrics[
                "application_to_offer_ratio"
            ]
        ),
    )