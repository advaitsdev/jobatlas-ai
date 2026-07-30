from uuid import UUID

from sqlalchemy.orm import Session

from app.models.resume_analysis import ResumeAnalysis


class ResumeAnalysisRepository:

    @staticmethod
    def create(
        db: Session,
        resume_id: UUID,
        ats_score: int,
        analysis_json: dict,
    ) -> ResumeAnalysis:

        analysis = ResumeAnalysis(
            resume_id=resume_id,
            ats_score=ats_score,
            analysis_json=analysis_json,
        )

        db.add(analysis)
        db.commit()
        db.refresh(analysis)

        return analysis

    @staticmethod
    def get_by_resume(
        db: Session,
        resume_id: UUID,
    ) -> list[ResumeAnalysis]:

        return (
            db.query(ResumeAnalysis)
            .filter(
                ResumeAnalysis.resume_id == resume_id
            )
            .order_by(
                ResumeAnalysis.created_at.desc()
            )
            .all()
        )

    @staticmethod
    def get_latest_by_resume(
        db: Session,
        resume_id: UUID,
    ) -> ResumeAnalysis | None:

        return (
            db.query(ResumeAnalysis)
            .filter(
                ResumeAnalysis.resume_id == resume_id
            )
            .order_by(
                ResumeAnalysis.created_at.desc()
            )
            .first()
        )

    @staticmethod
    def delete(
        db: Session,
        analysis_id: int,
    ) -> bool:

        analysis = (
            db.query(ResumeAnalysis)
            .filter(
                ResumeAnalysis.id == analysis_id
            )
            .first()
        )

        if not analysis:
            return False

        db.delete(analysis)
        db.commit()
    
        return True
    @staticmethod
    def get_latest_map(db: Session) -> dict:

        analyses = (
            db.query(ResumeAnalysis)
            .order_by(
                ResumeAnalysis.created_at.desc()
            )
            .all()
        )

        latest = {}

        for analysis in analyses:
            if analysis.resume_id not in latest:
                latest[analysis.resume_id] = analysis

        return latest
    @staticmethod
    def get_latest(
        db: Session,
        resume_id: UUID,
    ) -> ResumeAnalysis | None:

        return (
            db.query(ResumeAnalysis)
            .filter(
                ResumeAnalysis.resume_id == resume_id
            )
            .order_by(
                ResumeAnalysis.created_at.desc()
            )
            .first()
        )
    @staticmethod
    def delete_by_resume(
        db: Session,
        resume_id: UUID,
    ) -> None:

        analyses = (
            db.query(ResumeAnalysis)
            .filter(
                ResumeAnalysis.resume_id == resume_id
            )
            .all()
        )

        for analysis in analyses:
            db.delete(analysis)

        db.commit()