from uuid import UUID

from sqlalchemy.orm import Session

from app.models.resume import Resume


class ResumeRepository:

    @staticmethod
    def create(
        db: Session,
        user_id: UUID | None,
        filename: str,
        filepath: str,
        filesize: str,
    ) -> Resume:

        resume = Resume(
            user_id=user_id,
            filename=filename,
            filepath=filepath,
            filesize=filesize,
        )

        db.add(resume)
        db.commit()
        db.refresh(resume)

        return resume

    @staticmethod
    def get_all(
        db: Session,
    ) -> list[Resume]:

        return (
            db.query(Resume)
            .order_by(
                Resume.uploaded_at.desc()
            )
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        resume_id: UUID,
    ) -> Resume | None:

        return (
            db.query(Resume)
            .filter(
                Resume.id == resume_id
            )
            .first()
        )

    @staticmethod
    def delete(
        db: Session,
        resume_id: UUID,
    ) -> bool:

        resume = (
            db.query(Resume)
            .filter(
                Resume.id == resume_id
            )
            .first()
        )

        if resume is None:
            return False

        db.delete(resume)
        db.commit()

        return True