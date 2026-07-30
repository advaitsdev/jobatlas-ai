from app.services.pdf_service import PDFService
from app.services.ai_resume_service import AIResumeService

pdf_path = "uploads/resumes/advaitsdev_resume (2).pdf"

text = PDFService.extract_text(pdf_path)

service = AIResumeService()

response = service.analyze_resume(text)

print(response)