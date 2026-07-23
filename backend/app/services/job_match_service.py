import json

from google import genai

from app.core.config import settings


class JobMatchService:
    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def match_resume(
        self,
        resume_text: str,
        job_description: str,
    ):

        prompt = f"""
You are an expert ATS recruiter.

Compare the following resume against the job description.

Resume:

{resume_text}

--------------------------------

Job Description:

{job_description}

--------------------------------

Return ONLY valid JSON.

Use this schema exactly:

{{
    "match_score": 0,
    "matched_skills": [],
    "missing_skills": [],
    "keyword_matches": [],
    "recommendations": []
}}

Do not include markdown.
Do not explain anything.
"""

        response = self.client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
        )

        cleaned = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(cleaned)