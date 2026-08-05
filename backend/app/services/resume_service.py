from pathlib import Path
import shutil

from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.repositories.resume_repository import ResumeRepository
from app.services.pdf_service import PDFService
from app.services.resume_analysis_service import ResumeAnalysisService
from app.schemas.resume_analysis import ResumeAnalysisResult

class ResumeService:
    def __init__(self, db: Session):
        self.db = db
        self.analysis_service = ResumeAnalysisService(db)

    async def upload_resume(
        self,
        file: UploadFile,
        upload_dir: Path,
    ):
        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed.",
            )

        upload_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

        file_path = upload_dir / file.filename

        with file_path.open("wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

        resume = ResumeRepository.create(
            db=self.db,
            user_id=None,
            filename=file.filename,
            filepath=str(file_path),
            filesize=str(file_path.stat().st_size),
        )

        resume_text = PDFService.extract_text(
            str(file_path)
        )

        analysis = self.analysis_service.analyze_resume(
            resume.id,
            resume_text,
        )

        return {
            "success": True,
            "resume_id": str(resume.id),
            "analysis": analysis,
        }