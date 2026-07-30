
from pathlib import Path
import shutil
from sqlalchemy.orm import Session
from fastapi import Depends
from app.services.job_match_service import JobMatchService
from app.db.session import get_db
from app.repositories.resume_repository import ResumeRepository
from app.repositories.resume_analysis_repository import ResumeAnalysisRepository
from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)

from app.services.pdf_service import PDFService
from app.services.ai_resume_service import AIResumeService

router = APIRouter(
    prefix="/resume",
    tags=["Resume"],
)

UPLOAD_DIR = Path("uploads/resumes")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Save resume metadata
    resume = ResumeRepository.create(
        db=db,
        user_id=None,  # Temporary until authentication is implemented
        filename=file.filename,
        filepath=str(file_path),
        filesize=str(file_path.stat().st_size),
    )

    # Extract resume text
    text = PDFService.extract_text(
        str(file_path)
    )

    # Run AI analysis
    ai_service = AIResumeService()
    analysis = ai_service.analyze_resume(text)

    # Save analysis
    ResumeAnalysisRepository.create(
        db=db,
        resume_id=resume.id,
        ats_score=analysis.get("ats_score", 0),
        analysis_json=analysis,
    )

    return {
        "success": True,
        "resume_id": str(resume.id),
        "analysis": analysis,
    }

@router.post("/match")
async def match_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...),
):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = PDFService.extract_text(
        str(file_path)
    )

    service = JobMatchService()

    result = service.match_resume(
        resume_text,
        job_description,
    )

    return {
        "success": True,
        "analysis": result,
    }
@router.get("/history")
def get_resume_history(
    db: Session = Depends(get_db),
):
    resumes = ResumeRepository.get_all(db)

    latest = ResumeAnalysisRepository.get_latest_map(db)

    history = []

    for resume in resumes:
        analysis = latest.get(resume.id)

        history.append(
            {
                "id": resume.id,
                "filename": resume.filename,
                "uploaded_at": resume.uploaded_at,
                "ats_score": analysis.ats_score if analysis else 0,
            }
        )

    return history
from uuid import UUID
@router.get("/{resume_id}")
def get_resume(
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

    analysis = ResumeAnalysisRepository.get_latest(
        db,
        resume_id,
    )

    return {
        "resume": {
            "id": resume.id,
            "filename": resume.filename,
            "filepath": resume.filepath,
            "filesize": resume.filesize,
            "uploaded_at": resume.uploaded_at,
        },
        "analysis": analysis.analysis_json if analysis else None,
    }
@router.delete("/{resume_id}")
def delete_resume(
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

    # Delete all analysis records first
    ResumeAnalysisRepository.delete_by_resume(
        db,
        resume_id,
    )

    # Delete uploaded PDF if it exists
    file_path = Path(resume.filepath)

    if file_path.exists():
        file_path.unlink()

    # Delete the resume record
    ResumeRepository.delete(
        db,
        resume_id,
    )

    return {
        "success": True,
        "message": "Resume deleted successfully.",
    }
