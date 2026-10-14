from pathlib import Path
import shutil

from fastapi import (
    APIRouter,
    File,
    Form,
    HTTPException,
    UploadFile,
)

from app.services.pdf_service import PDFService
from app.services.job_match_service import JobMatchService

router = APIRouter(
    prefix="/ai-matching",
    tags=["AI Matching"],
)

UPLOAD_DIR = Path("uploads/job_matching")
UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


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

    if file_path.exists():
        file_path.unlink()

    return {
        "success": True,
        "analysis": result,
    }