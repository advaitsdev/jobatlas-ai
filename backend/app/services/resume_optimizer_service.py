from pathlib import Path
from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.resume_repository import ResumeRepository
from app.services.pdf_service import PDFService
from app.services.ai_resume_optimizer_service import (
    AIResumeOptimizerService,
)


class ResumeOptimizerService:
    def __init__(self, db: Session):
        self.db = db
        self.ai_service = AIResumeOptimizerService()

    def optimize_resume(
        self,
        resume_id: UUID,
        job_description: str | None = None,
    ):
        resume = ResumeRepository.get_by_id(
            self.db,
            resume_id,
        )

        if resume is None:
            raise HTTPException(
                status_code=404,
                detail="Resume not found.",
            )

        file_path = Path(resume.filepath)

        if not file_path.exists():
            raise HTTPException(
                status_code=404,
                detail="Resume PDF file not found.",
            )

        resume_text = PDFService.extract_text(
            str(file_path)
        )

        if not resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from resume.",
            )

        result = self.ai_service.optimize_resume(
            resume_text=resume_text,
            job_description=job_description,
        )

        return {
            "success": True,
            "resume_id": str(resume.id),
            "optimization": result,
        }