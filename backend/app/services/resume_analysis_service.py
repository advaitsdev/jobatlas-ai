from uuid import UUID
from app.services.ai_resume_service import AIResumeService
from sqlalchemy.orm import Session

from app.repositories.resume_analysis_repository import (
    ResumeAnalysisRepository,
)
from app.schemas.resume_analysis import (
    ResumeAnalysisResult,
)


class ResumeAnalysisService:
    def __init__(self, db: Session):
        self.repository = ResumeAnalysisRepository(db)
        self.ai_service = AIResumeService()



    def get_analysis(
        self,
        resume_id: UUID,
    ):
        return self.repository.get_by_resume(
            resume_id
        )

    def save_analysis(
        self,
        resume_id: UUID,
        analysis: ResumeAnalysisResult,
    ):
        existing = self.repository.get_by_resume(
            resume_id
        )

        if existing:
            return self.repository.update(
                resume_id,
                analysis,
            )

        return self.repository.create(
            resume_id,
            analysis,
        )

    def delete_analysis(
        self,
        resume_id: UUID,
    ):
        return self.repository.delete(
            resume_id
        )
    def analyze_resume(
    self,
    resume_id: UUID,
    resume_text: str,
):
        analysis_result = self.ai_service.analyze_resume(
            resume_text
        )

        return self.save_analysis(
            resume_id,
            analysis_result,
        )