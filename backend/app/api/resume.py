from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile, HTTPException

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
    file: UploadFile = File(...)
):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = PDFService.extract_text(
        str(file_path)
    )

    ai_service = AIResumeService()

    analysis = ai_service.analyze_resume(text)

    return {
    "success": True,
    "analysis": analysis,
}
from fastapi import Form

from app.services.job_match_service import JobMatchService


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