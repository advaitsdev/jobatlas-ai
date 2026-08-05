from uuid import UUID

from sqlalchemy.orm import Session

from app.models.resume_analysis import ResumeAnalysis
from app.schemas.resume_analysis import ResumeAnalysisResult


class ResumeAnalysisRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        resume_id: UUID,
        analysis: ResumeAnalysisResult,
    ) -> ResumeAnalysis:
        resume_analysis = ResumeAnalysis(
            resume_id=resume_id,
            **analysis.model_dump(),
        )

        self.db.add(resume_analysis)
        self.db.commit()
        self.db.refresh(resume_analysis)

        return resume_analysis

    def get_by_resume(
        self,
        resume_id: UUID,
    ) -> ResumeAnalysis | None:
        return (
            self.db.query(ResumeAnalysis)
            .filter(
                ResumeAnalysis.resume_id == resume_id
            )
            .first()
        )

    def update(
        self,
        resume_id: UUID,
        analysis: ResumeAnalysisResult,
    ) -> ResumeAnalysis | None:
        resume_analysis = self.get_by_resume(
            resume_id
        )

        if resume_analysis is None:
            return None

        update_data = analysis.model_dump()

        for key, value in update_data.items():
            setattr(
                resume_analysis,
                key,
                value,
            )

        self.db.commit()
        self.db.refresh(resume_analysis)

        return resume_analysis

    def delete(
        self,
        resume_id: UUID,
    ) -> bool:
        resume_analysis = self.get_by_resume(
            resume_id
        )

        if resume_analysis is None:
            return False

        self.db.delete(resume_analysis)
        self.db.commit()

        return True