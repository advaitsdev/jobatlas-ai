from __future__ import annotations

import re


class SkillMatchService:
    """
    Matches resume skills against job-description skills.

    This service is intentionally local and deterministic.
    No external AI/API calls are required.
    """

    SKILL_ALIASES = {
        "postgres": "postgresql",
        "postgresql": "postgresql",

        "js": "javascript",
        "javascript": "javascript",

        "ts": "typescript",
        "typescript": "typescript",

        "react.js": "react",
        "reactjs": "react",
        "react": "react",

        "node.js": "node.js",
        "nodejs": "node.js",
        "node": "node.js",

        "py": "python",
        "python": "python",

        "tf": "tensorflow",
        "tensorflow": "tensorflow",

        "pytorch": "pytorch",

        "aws": "aws",
        "amazon web services": "aws",

        "gcp": "gcp",
        "google cloud": "gcp",
        "google cloud platform": "gcp",

        "azure": "azure",
        "microsoft azure": "azure",

        "k8s": "kubernetes",
        "kubernetes": "kubernetes",

        "docker": "docker",

        "opencv": "opencv",

        "sql": "sql",

        "fastapi": "fastapi",

        "pandas": "pandas",
        "numpy": "numpy",

        "scikit-learn": "scikit-learn",
        "sklearn": "scikit-learn",

        "apache spark": "apache spark",
        "spark": "apache spark",

        "apache kafka": "apache kafka",
        "kafka": "apache kafka",
    }

    @classmethod
    def normalize_skill(
        cls,
        skill: str,
    ) -> str:
        """
        Normalize a single skill so aliases can match.
        """

        normalized = skill.strip().lower()

        normalized = re.sub(
            r"\s+",
            " ",
            normalized,
        )

        normalized = normalized.strip(
            ".,;:()[]{}"
        )

        return cls.SKILL_ALIASES.get(
            normalized,
            normalized,
        )

    @classmethod
    def normalize_skills(
        cls,
        skills: list[str] | None,
    ) -> dict[str, str]:
        """
        Return:

        {
            normalized_skill: original_skill
        }

        This lets us compare normalized values while
        returning the user's original skill names.
        """

        result: dict[str, str] = {}

        for skill in skills or []:
            if not skill or not skill.strip():
                continue

            normalized = cls.normalize_skill(
                skill
            )

            if normalized:
                result[normalized] = skill.strip()

        return result

    @classmethod
    def calculate_percentage(
        cls,
        matched: int,
        total: int,
    ) -> float:
        if total == 0:
            return 0.0

        return round(
            (matched / total) * 100,
            2,
        )

    @classmethod
    def match(
        cls,
        resume_skills: list[str] | None,
        required_skills: list[str] | None,
        preferred_skills: list[str] | None,
    ) -> dict:
        """
        Compare resume skills against required and
        preferred job skills.
        """

        resume = cls.normalize_skills(
            resume_skills
        )

        required = cls.normalize_skills(
            required_skills
        )

        preferred = cls.normalize_skills(
            preferred_skills
        )

        matched_required = (
            set(resume.keys())
            & set(required.keys())
        )

        matched_preferred = (
            set(resume.keys())
            & set(preferred.keys())
        )

        missing_required = (
            set(required.keys())
            - set(resume.keys())
        )

        missing_preferred = (
            set(preferred.keys())
            - set(resume.keys())
        )

        required_match_percentage = (
            cls.calculate_percentage(
                len(matched_required),
                len(required),
            )
        )

        preferred_match_percentage = (
            cls.calculate_percentage(
                len(matched_preferred),
                len(preferred),
            )
        )

        total_job_skills = (
            len(required)
            + len(preferred)
        )

        total_matched_skills = (
            len(matched_required)
            + len(matched_preferred)
        )

        overall_match_percentage = (
            cls.calculate_percentage(
                total_matched_skills,
                total_job_skills,
            )
        )

        return {
            "required_match_percentage": (
                required_match_percentage
            ),
            "preferred_match_percentage": (
                preferred_match_percentage
            ),
            "overall_match_percentage": (
                overall_match_percentage
            ),
            "matched_required_skills": [
                required[skill]
                for skill in required
                if skill in matched_required
            ],
            "missing_required_skills": [
                required[skill]
                for skill in required
                if skill in missing_required
            ],
            "matched_preferred_skills": [
                preferred[skill]
                for skill in preferred
                if skill in matched_preferred
            ],
            "missing_preferred_skills": [
                preferred[skill]
                for skill in preferred
                if skill in missing_preferred
            ],
        }
    