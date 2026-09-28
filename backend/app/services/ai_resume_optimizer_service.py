import json

from fastapi import HTTPException
from google import genai
from google.genai import errors

from app.core.config import settings
from app.schemas.resume_optimizer import (
    ResumeOptimizationResult,
)


class AIResumeOptimizerService:
    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def optimize_resume(
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
You are an expert ATS resume optimizer,
technical recruiter, hiring manager, and career coach.

Your task is to analyze the candidate's resume and provide
specific, actionable improvements that make the resume
stronger for Applicant Tracking Systems and human recruiters.

RESUME:

{resume_text}

------------------------------------------------------------

TARGET JOB DESCRIPTION:

{target_job}

------------------------------------------------------------

Evaluate the resume for:

1. Overall resume quality and ATS readiness.
2. Weak or vague resume bullet points.
3. How existing bullet points can be rewritten
   using strong action verbs and measurable impact.
4. Important keywords missing from the resume.
5. ATS formatting and keyword improvements.
6. Recommendations for individual resume sections.
7. General improvements that make the resume clearer,
   more concise, and more relevant to the target role.

IMPORTANT:

- Return ONLY valid JSON.
- Do NOT return markdown.
- Do NOT wrap the JSON in ```json.
- Do NOT add explanations outside the JSON.
- Do NOT invent experience, projects, education,
  technologies, achievements, or metrics.
- Improved bullets must remain truthful to the
  information contained in the resume.
- If a bullet cannot be improved confidently,
  keep the improvement conservative.
- Always return arrays.
- Scores must be integers between 0 and 100.

For weak_bullets:

Include the original weak bullet exactly as it appears
in the resume whenever possible.

For improved_bullets:

Provide the corresponding improved version.
Keep the same underlying accomplishment.

For missing_keywords:

Only include keywords that are genuinely relevant
to the target job description or the candidate's
existing career direction.

Return EXACTLY this schema:

{{
  "overall_score": 0,

  "summary": "",

  "weak_bullets": [],

  "improved_bullets": [],

  "missing_keywords": [],

  "ats_improvements": [],

  "section_recommendations": []
}}
"""

        try:
            response = self.client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt,
            )

        except errors.ClientError as error:

            print("\n" + "=" * 80)
            print("GEMINI CLIENT ERROR")
            print("=" * 80)

            print(
                f"Status code: "
                f"{getattr(error, 'status_code', 'unknown')}"
            )

            print(
                f"Error type: "
                f"{type(error).__name__}"
            )

            print(
                f"Full error: {error}"
            )

            print("=" * 80 + "\n")

            status_code = getattr(
                error,
                "status_code",
                None,
            )

            error_message = str(error)

            if (
                status_code == 429
                or "RESOURCE_EXHAUSTED" in error_message
                or "quota" in error_message.lower()
            ):
                raise HTTPException(
                    status_code=429,
                    detail=(
                        "Gemini API quota/rate limit "
                        "was reached. Check the FastAPI "
                        "terminal for the detailed Gemini error."
                    ),
                ) from error

            raise HTTPException(
                status_code=502,
                detail=(
                    "The AI service rejected the request. "
                    "Check the FastAPI terminal for details."
                ),
            ) from error

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
            return ResumeOptimizationResult.model_validate(
                result
            )

        except Exception as error:
            raise HTTPException(
                status_code=502,
                detail=(
                    "The AI service returned an unexpected "
                    "response format."
                ),
            ) from error