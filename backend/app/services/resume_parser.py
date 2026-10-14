import re


class ResumeParser:
    @staticmethod
    def parse(text: str):
        lines = [
            line.strip()
            for line in text.split("\n")
            if line.strip()
        ]

        name = lines[0] if lines else ""

        email = ""
        phone = ""

        for line in lines:
            email_match = re.search(
                r'[\w\.-]+@[\w\.-]+',
                line,
            )

            if email_match:
                email = email_match.group()

            phone_match = re.search(
                r'(\+?\d[\d\s-]{8,}\d)',
                line,
            )

            if phone_match:
                phone = phone_match.group()

        sections = {
            "summary": "",
            "education": "",
            "experience": "",
            "skills": "",
            "projects": "",
        }

        current_section = None

        for line in lines:

            lower = line.lower()

            if "summary" in lower:
                current_section = "summary"
                continue

            elif "education" in lower:
                current_section = "education"
                continue

            elif (
                "experience" in lower
                or "leadership" in lower
            ):
                current_section = "experience"
                continue

            elif (
                "technical skills" in lower
                or "skills" in lower
            ):
                current_section = "skills"
                continue

            elif "project" in lower:
                current_section = "projects"
                continue

            if current_section:
                sections[current_section] += line + "\n"

        return {
            "name": name,
            "email": email,
            "phone": phone,
            **sections,
        }