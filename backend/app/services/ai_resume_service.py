import json

from google import genai

from app.core.config import settings


class AIResumeService:
    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def analyze_resume(self, resume_text: str):

        prompt = f"""
You are an expert ATS Resume Reviewer and Career Coach.

Below is the COMPLETE text extracted from a PDF resume.

Your tasks are:

1. Extract:
- Full Name
- Email
- Phone

2. Extract Education.

3. Extract Experience.

4. Extract Projects.

5. Extract Technical Skills.

6. Calculate an ATS score from 0–100.

7. Suggest the best suited job role.

8. List the top strengths.

9. List missing skills.

10. Give resume improvement recommendations.

IMPORTANT:

- Return ONLY valid JSON.
- Do NOT wrap the response inside ```json.
- Do NOT add explanations.
- Do NOT rename any fields.
- Never use the key "description".
- Always use "highlights".
- Always return arrays even if they contain only one item.
- If information is missing, return an empty string or an empty array.

Return EXACTLY this schema:

{{
  "name": "",
  "email": "",
  "phone": "",

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

  "skills": [],

  "ats_score": 0,

  "best_role": "",

  "strengths": [],

  "missing_skills": [],

  "recommendations": []
}}

Resume:

{resume_text}
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

# ---------- Normalize Experience ----------
        for experience in result.get("experience", []):
            if "description" in experience:
                experience["highlights"] = experience.pop("description")

# ---------- Normalize Projects ----------
        for project in result.get("projects", []):
            if "description" in project:
                project["highlights"] = project.pop("description")

        return result