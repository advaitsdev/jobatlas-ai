from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.enums import OpportunityStatus
from app.repositories.resume_analysis_repository import (
    ResumeAnalysisRepository,
)
from app.repositories.resume_repository import (
    ResumeRepository,
)
from app.schemas.opportunity import (
    JobDescriptionParseRequest,
    JobDescriptionParseResponse,
    OpportunityCreate,
    OpportunityResponse,
    OpportunityUpdate,
    PaginatedOpportunityResponse,
)
from app.services.job_description_parser import (
    JobDescriptionParser,
)
from app.services.opportunity_service import (
    OpportunityService,
)
from app.services.skill_gap_service import (
    SkillGapService,
)
from app.services.skill_match_service import (
    SkillMatchService,
)


router = APIRouter(
    prefix="/opportunities",
    tags=["Opportunities"],
)


def build_opportunity_response(
    opportunity,
) -> OpportunityResponse:
    return OpportunityResponse(
        id=opportunity.id,
        title=opportunity.title,
        company=opportunity.company,
        user_id=opportunity.user_id,
        location=opportunity.location,
        employment_type=opportunity.employment_type,
        source=opportunity.source,
        status=opportunity.status,
        application_url=opportunity.application_url,
        salary=opportunity.salary,
        applied_date=opportunity.applied_date,
        deadline=opportunity.deadline,
        notes=opportunity.notes,
        application_id=(
            opportunity.application.id
            if opportunity.application
            else None
        ),
        job_description=opportunity.job_description,
        required_skills=opportunity.required_skills,
        preferred_skills=opportunity.preferred_skills,
        responsibilities=opportunity.responsibilities,
        qualifications=opportunity.qualifications,
        experience_required=opportunity.experience_required,
        education_required=opportunity.education_required,
    )


@router.post(
    "/parse-jd",
    response_model=JobDescriptionParseResponse,
)
def parse_job_description(
    request: JobDescriptionParseRequest,
):
    return JobDescriptionParser.parse(
        request.job_description
    )


@router.post(
    "",
    response_model=OpportunityResponse,
    status_code=201,
)
def create_opportunity(
    opportunity: OpportunityCreate,
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)

    created = service.create_opportunity(
        opportunity
    )

    return build_opportunity_response(created)


@router.get(
    "",
    response_model=PaginatedOpportunityResponse,
)
def get_opportunities(
    search: str | None = None,
    status: OpportunityStatus | None = None,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)

    result = service.get_opportunities(
        search=search,
        status=status,
        page=page,
        limit=limit,
    )

    return {
        **result,
        "items": [
            build_opportunity_response(
                opportunity
            )
            for opportunity in result["items"]
        ],
    }


@router.get(
    "/skill-gaps",
)
def get_skill_gaps(
    resume_id: UUID,
    db: Session = Depends(get_db),
):
    resume = ResumeRepository.get_by_id(
        db,
        resume_id,
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    resume_analysis = (
        ResumeAnalysisRepository(
            db
        ).get_by_resume(resume_id)
    )

    if resume_analysis is None:
        raise HTTPException(
            status_code=404,
            detail="Resume analysis not found",
        )

    return SkillGapService.get_skill_gaps(
        db,
        resume_id,
    )


@router.get(
    "/{opportunity_id}/skill-match",
)
def match_opportunity_skills(
    opportunity_id: UUID,
    resume_id: UUID,
    db: Session = Depends(get_db),
):
    opportunity = (
        OpportunityService(db)
        .get_opportunity(opportunity_id)
    )

    if opportunity is None:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    resume = ResumeRepository.get_by_id(
        db,
        resume_id,
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    resume_analysis = (
        ResumeAnalysisRepository(
            db
        ).get_by_resume(resume_id)
    )

    if resume_analysis is None:
        raise HTTPException(
            status_code=404,
            detail="Resume analysis not found",
        )

    result = SkillMatchService.match(
        resume_skills=resume_analysis.skills,
        required_skills=(
            opportunity.required_skills
            or []
        ),
        preferred_skills=(
            opportunity.preferred_skills
            or []
        ),
    )

    return {
        "opportunity_id": opportunity.id,
        "resume_id": resume.id,
        **result,
    }


@router.get(
    "/{opportunity_id}",
    response_model=OpportunityResponse,
)
def get_opportunity(
    opportunity_id: UUID,
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)

    opportunity = service.get_opportunity(
        opportunity_id
    )

    if opportunity is None:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return build_opportunity_response(
        opportunity
    )


@router.patch(
    "/{opportunity_id}",
    response_model=OpportunityResponse,
)
def update_opportunity(
    opportunity_id: UUID,
    opportunity: OpportunityUpdate,
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)

    updated = service.update_opportunity(
        opportunity_id,
        opportunity,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return build_opportunity_response(
        updated
    )


@router.delete(
    "/{opportunity_id}"
)
def delete_opportunity(
    opportunity_id: UUID,
    db: Session = Depends(get_db),
):
    service = OpportunityService(db)

    deleted = service.delete_opportunity(
        opportunity_id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Opportunity not found",
        )

    return {
        "success": True,
        "message": "Opportunity deleted successfully.",
    }