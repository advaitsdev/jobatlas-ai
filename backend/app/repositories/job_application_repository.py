import math
from uuid import UUID

from sqlalchemy.orm import Session

from app.models.job_application import JobApplication
from sqlalchemy import or_
from app.schemas.enums import JobSource, JobStatus


class JobApplicationRepository:

    @staticmethod
    def create(
        db: Session,
        user_id: UUID | None,
        company: str,
        role: str,
        location: str | None,
        source: str,
        job_url: str | None,
        salary: str | None,
        status: str,
        notes: str | None,
        date_applied,
    ) -> JobApplication:

        application = JobApplication(
            user_id=user_id,
            company=company,
            role=role,
            location=location,
            source=source,
            job_url=job_url,
            salary=salary,
            status=status,
            notes=notes,
            date_applied=date_applied,
        )

        db.add(application)
        db.commit()
        db.refresh(application)

        return application

    from math import ceil

    from sqlalchemy import func, or_


    @staticmethod
    def get_all(
        db: Session,
        search: str | None = None,
        status: JobStatus | None = None,
        source: JobSource | None = None,
        page: int = 1,
        limit: int = 10,
        sort: str = "desc",
    ):
        query = db.query(JobApplication)

        if search:
            query = query.filter(
                or_(
                    JobApplication.company.ilike(f"%{search}%"),
                    JobApplication.role.ilike(f"%{search}%"),
                )
            )

        if status:
            query = query.filter(
                JobApplication.status == status
            )

        if source:
            query = query.filter(
                JobApplication.source == source
            )

        total = query.count()

        if sort == "asc":
             query = query.order_by(JobApplication.date_applied.asc())
        else:
            query = query.order_by(JobApplication.date_applied.desc())

        applications = (
            query.offset((page - 1) * limit)
            .limit(limit)
            .all()
)

        return {
            "items": applications,
            "total": total,
            "page": page,
            "limit": limit,
            "pages": math.ceil(total / limit),
        }
    @staticmethod
    def get_by_id(
        db: Session,
        application_id: UUID,
    ) -> JobApplication | None:
        return (
            db.query(JobApplication)
            .filter(JobApplication.id == application_id)
            .first()
        )
    @staticmethod
    def update(
        db: Session,
        application_id: UUID,
        application_data,
    ):
        application = (
            db.query(JobApplication)
            .filter(JobApplication.id == application_id)
            .first()
        )

        if application is None:
            return None

        update_data = application_data.model_dump(
    exclude_unset=True
)

        if "job_url" in update_data and update_data["job_url"] is not None:
            update_data["job_url"] = str(update_data["job_url"])
        

        for key, value in update_data.items():
            setattr(application, key, value)

        db.commit()
        db.refresh(application)

        return application
    @staticmethod
    def delete(
        db: Session,
        application_id: UUID,
    ) -> bool:

        application = (
            db.query(JobApplication)
            .filter(JobApplication.id == application_id)
            .first()
        )

        if application is None:
            return False

        db.delete(application)
        db.commit()

        return True