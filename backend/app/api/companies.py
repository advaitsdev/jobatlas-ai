from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.company import (
    CompanyCreate,
    CompanyResponse,
    CompanyUpdate,
    PaginatedCompanyResponse,
)
from app.services.company_service import CompanyService

router = APIRouter(
    prefix="/companies",
    tags=["Companies"],
)


@router.post(
    "",
    response_model=CompanyResponse,
    status_code=201,
)
def create_company(
    company: CompanyCreate,
    db: Session = Depends(get_db),
):
    service = CompanyService(db)
    return service.create_company(company)


@router.get(
    "",
    response_model=PaginatedCompanyResponse,
)
def get_companies(
    search: str | None = None,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    service = CompanyService(db)

    return service.get_companies(
        search=search,
        page=page,
        limit=limit,
    )


@router.get(
    "/{company_id}",
    response_model=CompanyResponse,
)
def get_company(
    company_id: UUID,
    db: Session = Depends(get_db),
):
    service = CompanyService(db)

    company = service.get_company(company_id)

    if company is None:
        raise HTTPException(
            status_code=404,
            detail="Company not found",
        )

    return company


@router.patch(
    "/{company_id}",
    response_model=CompanyResponse,
)
def update_company(
    company_id: UUID,
    company: CompanyUpdate,
    db: Session = Depends(get_db),
):
    service = CompanyService(db)

    updated = service.update_company(
        company_id,
        company,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Company not found",
        )

    return updated


@router.delete("/{company_id}")
def delete_company(
    company_id: UUID,
    db: Session = Depends(get_db),
):
    service = CompanyService(db)

    deleted = service.delete_company(company_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Company not found",
        )

    return {
        "success": True,
        "message": "Company deleted successfully.",
    }