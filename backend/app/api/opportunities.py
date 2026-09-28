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

    return service.create_opportunity(
        opportunity
    )


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

    return service.get_opportunities(
        search=search,
        status=status,
        page=page,
        limit=limit,
    )


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

    return opportunity


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

    return updated


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