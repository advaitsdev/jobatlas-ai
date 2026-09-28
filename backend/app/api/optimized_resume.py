from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.optimized_resume import OptimizedResume
from app.services.optimized_resume_service import (
    OptimizedResumeService,
)
from app.services.resume_pdf_service import (
    ResumePDFService,
)


router = APIRouter(
    prefix="/resume",
    tags=["Optimized Resume"],
)


@router.post("/{resume_id}/generate")
def generate_optimized_resume(
    resume_id: UUID,
    job_description: str | None = None,
    db: Session = Depends(get_db),
):
    service = OptimizedResumeService(db)

    return service.generate_optimized_resume(
        resume_id=resume_id,
        job_description=job_description,
    )


@router.post("/generate-pdf")
def generate_pdf_from_optimized_resume(
    resume: OptimizedResume,
):
    pdf_buffer = ResumePDFService.generate_pdf(
        resume
    )

    filename = "optimized_resume.pdf"

    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": (
                f'attachment; filename="{filename}"'
            )
        },
    )