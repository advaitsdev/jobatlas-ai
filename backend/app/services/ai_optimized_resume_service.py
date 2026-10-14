import json

from fastapi import HTTPException
from google import genai
from google.genai import errors

from app.core.config import settings
from app.schemas.optimized_resume import OptimizedResume


class AIOptimizedResumeService:
    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def generate_optimized_resume(
        self,
        resume_text: str,
        job_description: str | None = None,
    ):
        target_job = (
            job_description.strip()
            if job_description
            else "No specific job description provided."
        )

        prompt = f"""
You are an expert resume writer, ATS specialist,
technical recruiter, and hiring manager.

Your task is to create an optimized version of the
candidate's resume using the information provided.

IMPORTANT RULES:

1. Preserve all factual information from the resume.
2. NEVER invent companies, jobs, degrees, projects,
   technologies, achievements, certifications, metrics,
   dates, or responsibilities.
3. You may improve wording and structure.
4. You may rewrite weak bullet points using stronger
   action verbs.
5. You may make existing accomplishments clearer
   and more concise.
6. Do not add a metric unless that metric already exists
   in the original resume.
7. Keep the candidate's actual technical skills.
8. Remove unnecessary repetition where appropriate.
9. Optimize the resume for ATS readability.
10. Keep the resume suitable for an entry-level candidate.
11. If a target job description is provided, prioritize
    relevant keywords from it only when they are supported
    by the candidate's existing experience or skills.
12. If no target job description is provided, optimize
    toward the candidate's demonstrated career direction.

TARGET JOB DESCRIPTION:

{target_job}

------------------------------------------------------------

ORIGINAL RESUME:

{resume_text}

------------------------------------------------------------

Create the optimized resume using EXACTLY this JSON schema:

{{
  "name": "",
  "email": "",
  "phone": "",

  "summary": "",

  "education": [
    {{
      "institution": "",
      "degree": "",
      "duration": "",
      "location": ""
    }}
  ],

  "experience": [
    {{
      "title": "",
      "organization": "",
      "duration": "",
      "location": "",
      "highlights": [
        ""
      ]
    }}
  ],

  "projects": [
    {{
      "name": "",
      "tech_stack": [],
      "year": "",
      "highlights": [
        ""
      ]
    }}
  ],

  "skills": []
}}

REQUIREMENTS:

- Return ONLY valid JSON.
- Do NOT return markdown.
- Do NOT wrap the response in ```json.
- Do NOT add explanations outside the JSON.
- Always return arrays.
- Keep every section grounded in the original resume.
- Preserve important technical details.
- Improve clarity, impact, and ATS compatibility.
"""

        try:
            response = self.client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt,
            )

        except errors.ServerError as error:
            print(
                f"Gemini ServerError: "
                f"status={getattr(error, 'status_code', 'unknown')} "
                f"error={error}"
            )

            raise HTTPException(
                status_code=503,
                detail=(
                    "The AI service is temporarily unavailable. "
                    "Please try again in a few moments."
                ),
            ) from error

        if not response.text:
            raise HTTPException(
                status_code=502,
                detail="The AI service returned an empty response.",
            )

        cleaned = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        try:
            result = json.loads(cleaned)

        except json.JSONDecodeError as error:
            raise HTTPException(
                status_code=502,
                detail="The AI service returned invalid JSON.",
            ) from error

        try:
            return OptimizedResume.model_validate(
                result
            )

        except Exception as error:
            raise HTTPException(
                status_code=502,
                detail=(
                    "The AI service returned an "
                    "unexpected resume format."
                ),
            ) from error