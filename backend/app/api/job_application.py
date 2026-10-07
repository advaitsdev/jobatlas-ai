from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.opportunity import Opportunity
from app.repositories.job_application_repository import (
    JobApplicationRepository,
)
from app.schemas.enums import JobSource, JobStatus
from app.schemas.job_application import (
    JobApplicationCreate,
    JobApplicationResponse,
    JobApplicationUpdate,
    PaginatedJobApplicationResponse,
)
from app.services.job_application_service import (
    get_opportunity_status,
)


router = APIRouter(
    prefix="/applications",
    tags=["Job Applications"],
)


@router.post("", response_model=JobApplicationResponse)
def create_application(
    application: JobApplicationCreate,
    db: Session = Depends(get_db),
):
    opportunity = None

    if application.opportunity_id:
        opportunity = (
            db.query(Opportunity)
            .filter(Opportunity.id == application.opportunity_id)
            .first()
        )

        if opportunity is None:
            raise HTTPException(
                status_code=404,
                detail="Opportunity not found",
            )

    created = JobApplicationRepository.create(
        db=db,
        user_id=None,
        company=application.company,
        role=application.role,
        location=application.location,
        source=application.source,
        job_url=str(application.job_url) if application.job_url else None,
        salary=application.salary,
        status=application.status,
        notes=application.notes,
        date_applied=application.date_applied,
        opportunity_id=application.opportunity_id,
    )

    if opportunity:
        opportunity_status = get_opportunity_status(created.status)

        if opportunity_status:
            opportunity.status = opportunity_status

        if created.status == "Applied":
            opportunity.applied_date = created.date_applied

        db.commit()
        db.refresh(created)

    return created

@router.get(
    "",
    response_model=PaginatedJobApplicationResponse,
)
def get_applications(
    search: str | None = None,
    status: JobStatus | None = None,
    source: JobSource | None = None,
    page: int = 1,
    limit: int = 10,
    sort: str = "desc",
    db: Session = Depends(get_db),
):
    result = JobApplicationRepository.get_all(
        db=db,
        search=search,
        status=status,
        source=source,
        page=page,
        limit=limit,
        sort=sort,
    )

    total = result["total"]
    pages = (total + limit - 1) // limit

    return PaginatedJobApplicationResponse(
        items=result["items"],
        total=total,
        page=page,
        limit=limit,
        pages=pages,
    )


@router.get(
    "/{application_id}",
    response_model=JobApplicationResponse,
)
def get_application(
    application_id: UUID,
    db: Session = Depends(get_db),
):
    application = JobApplicationRepository.get_by_id(
        db,
        application_id,
    )

    if application is None:
        raise HTTPException(
            status_code=404,
            detail="Application not found",
        )

    return application


@router.put(
    "/{application_id}",
    response_model=JobApplicationResponse,
)
def update_application(
    application_id: UUID,
    application: JobApplicationUpdate,
    db: Session = Depends(get_db),
):
    existing = JobApplicationRepository.get_by_id(
        db,
        application_id,
    )

    if existing is None:
        raise HTTPException(
            status_code=404,
            detail="Application not found",
        )

    opportunity_id = (
        application.opportunity_id
        if application.opportunity_id
        else existing.opportunity_id
    )

    opportunity = None

    if opportunity_id:
        opportunity = (
            db.query(Opportunity)
            .filter(
                Opportunity.id == opportunity_id
            )
            .first()
        )

        if opportunity is None:
            raise HTTPException(
                status_code=404,
                detail="Opportunity not found",
            )

    updated = JobApplicationRepository.update(
        db,
        application_id,
        application,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Application not found",
        )

    if opportunity:
        opportunity_status = (
            get_opportunity_status(
                updated.status
            )
        )

        if opportunity_status:
            opportunity.status = opportunity_status

        if updated.status == "Applied":
            opportunity.applied_date = (
                updated.date_applied
            )

        db.commit()
        db.refresh(updated)

    return updated


@router.delete("/{application_id}")
def delete_application(
    application_id: UUID,
    db: Session = Depends(get_db),
):
    deleted = JobApplicationRepository.delete(
        db,
        application_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Application not found",
        )

    return {
        "success": True,
        "message": "Application deleted successfully.",
    }