import json


from google import genai

from app.core.config import settings
from app.schemas.job_match import JobMatchResult

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
You are an expert ATS recruiter, hiring manager, and career coach.

Your job is to compare a candidate's resume against the provided job description.

Evaluate:

1. Overall resume-job match
2. ATS compatibility
3. Matching skills
4. Missing skills
5. Important keyword matches
6. Candidate strengths
7. Candidate weaknesses
8. Resume improvement recommendations
9. Recommended job role
10. Five interview questions based on the resume and job description

Resume:

{resume_text}

------------------------------------------------------------

Job Description:

{job_description}

------------------------------------------------------------

Return ONLY valid JSON.

Use EXACTLY this schema:

{{
  "overall_match": 0,
  "ats_match": 0,
  "recommended_role": "",

  "matched_skills": [],
  "missing_skills": [],
  "keyword_matches": [],

  "strengths": [],
  "weaknesses": [],

  "recommendations": [],

  "interview_questions": []
}}

Rules:

- Return ONLY JSON.
- No markdown.
- No explanations.
- Scores must be integers between 0 and 100.
- Always return arrays, even if empty.
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

        result = json.loads(cleaned)
        return JobMatchResult.model_validate(result)
    