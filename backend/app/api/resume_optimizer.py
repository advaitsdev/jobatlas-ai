from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.resume_optimizer_service import (
    ResumeOptimizerService,
)

router = APIRouter(
    prefix="/resume",
    tags=["Resume Optimizer"],
)


@router.post("/{resume_id}/optimize")
def optimize_resume(
    resume_id: UUID,
    job_description: str | None = None,
    db: Session = Depends(get_db),
):
    service = ResumeOptimizerService(db)

    return service.optimize_resume(
        resume_id=resume_id,
        job_description=job_description,
    ) 