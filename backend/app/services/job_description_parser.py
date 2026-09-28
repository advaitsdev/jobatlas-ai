import re


class JobDescriptionParser:
    """
    Rule-based parser for extracting structured information
    from raw job descriptions.

    This parser does not use AI or external APIs.
    """

    # ---------------------------------------------------------
    # Skill dictionary
    # ---------------------------------------------------------

    SKILL_ALIASES = {
        "python": "Python",
        "java": "Java",
        "c++": "C++",
        "c#": "C#",
        "javascript": "JavaScript",
        "typescript": "TypeScript",
        "sql": "SQL",

        "pandas": "Pandas",
        "numpy": "NumPy",
        "scikit-learn": "Scikit-learn",
        "sklearn": "Scikit-learn",
        "pytorch": "PyTorch",
        "tensorflow": "TensorFlow",
        "keras": "Keras",
        "opencv": "OpenCV",

        "fastapi": "FastAPI",
        "flask": "Flask",
        "django": "Django",
        "react": "React",
        "node.js": "Node.js",
        "nodejs": "Node.js",

        "postgresql": "PostgreSQL",
        "postgres": "PostgreSQL",
        "mysql": "MySQL",
        "mongodb": "MongoDB",
        "redis": "Redis",
        "sqlite": "SQLite",

        "git": "Git",
        "github": "GitHub",
        "docker": "Docker",
        "kubernetes": "Kubernetes",
        "linux": "Linux",

        "aws": "AWS",
        "amazon web services": "AWS",
        "azure": "Azure",
        "microsoft azure": "Azure",
        "gcp": "GCP",
        "google cloud": "GCP",
        "google cloud platform": "GCP",

        "bigquery": "BigQuery",
        "cloud storage": "Cloud Storage",
        "cloud functions": "Cloud Functions",
        "cloud scheduler": "Cloud Scheduler",

        "apache spark": "Apache Spark",
        "spark": "Apache Spark",
        "hadoop": "Hadoop",
        "kafka": "Kafka",
        "apache kafka": "Kafka",

        "airflow": "Apache Airflow",
        "apache airflow": "Apache Airflow",
        "dbt": "dbt",

        "etl": "ETL",
        "elt": "ELT",
        "rest api": "REST APIs",
        "rest apis": "REST APIs",
        "restful api": "REST APIs",
        "restful apis": "REST APIs",

        "machine learning": "Machine Learning",
        "deep learning": "Deep Learning",
        "computer vision": "Computer Vision",
        "natural language processing": "NLP",
        "nlp": "NLP",

        "tableau": "Tableau",
        "power bi": "Power BI",
        "looker": "Looker",
        "looker studio": "Looker Studio",

        "excel": "Excel",
        "microsoft excel": "Excel",

        "tensorflow": "TensorFlow",
        "transformers": "Transformers",
        "hugging face": "Hugging Face",
    }

    # ---------------------------------------------------------
    # Section headings
    # ---------------------------------------------------------

    SECTION_ALIASES = {
        "responsibilities": {
            "responsibilities",
            "roles and responsibilities",
            "key responsibilities",
            "what you will do",
            "what you'll do",
            "what you will be doing",
            "job responsibilities",
            "duties",
        },
        "qualifications": {
            "qualifications",
            "requirements",
            "required qualifications",
            "basic qualifications",
            "minimum qualifications",
            "what you bring",
            "who you are looking for",
            "candidate requirements",
        },
        "preferred": {
            "preferred qualifications",
            "preferred skills",
            "nice to have",
            "nice-to-have",
            "desired qualifications",
            "additional qualifications",
            "preferred experience",
        },
        "skills": {
            "skills",
            "technical skills",
            "required skills",
            "technical requirements",
            "technologies",
            "tech stack",
        },
        "education": {
            "education",
            "educational qualifications",
            "academic qualifications",
        },
    }

    # ---------------------------------------------------------
    # Public parser
    # ---------------------------------------------------------

    @classmethod
    def parse(cls, text: str) -> dict:
        """
        Parse raw job description text into structured data.
        """

        if not text or not text.strip():
            return {
                "title": None,
                "location": None,
                "employment_type": None,
                "required_skills": [],
                "preferred_skills": [],
                "responsibilities": [],
                "qualifications": [],
                "experience_required": None,
                "education_required": None,
            }

        normalized_text = cls._normalize_text(text)

        sections = cls._extract_sections(normalized_text)

        required_text = cls._combine_sections(
            sections,
            [
                "skills",
                "qualifications",
            ],
        )

        preferred_text = cls._combine_sections(
            sections,
            ["preferred"],
        )

        responsibilities = cls._extract_list_items(
            sections.get("responsibilities", "")
        )

        qualifications = cls._extract_list_items(
            sections.get("qualifications", "")
        )

        required_skills = cls._extract_skills(
            required_text
        )

        preferred_skills = cls._extract_skills(
            preferred_text
        )

        # If there is no explicit preferred section,
        # do not manufacture preferred skills.
        if not preferred_text:
            preferred_skills = []

        experience_required = cls._extract_experience(
            normalized_text
        )

        education_required = cls._extract_education(
            normalized_text
        )

        title = cls._extract_title(
            normalized_text
        )

        location = cls._extract_location(
            normalized_text
        )

        employment_type = cls._extract_employment_type(
            normalized_text
        )

        return {
            "title": title,
            "location": location,
            "employment_type": employment_type,
            "required_skills": required_skills,
            "preferred_skills": preferred_skills,
            "responsibilities": responsibilities,
            "qualifications": qualifications,
            "experience_required": experience_required,
            "education_required": education_required,
        }

    # ---------------------------------------------------------
    # Text normalization
    # ---------------------------------------------------------

    @staticmethod
    def _normalize_text(text: str) -> str:
        text = text.replace("\r\n", "\n")
        text = text.replace("\r", "\n")

        lines = [
            re.sub(r"[ \t]+", " ", line).strip()
            for line in text.split("\n")
        ]

        lines = [
            line
            for line in lines
            if line
        ]

        return "\n".join(lines)

    # ---------------------------------------------------------
    # Section extraction
    # ---------------------------------------------------------

    @classmethod
    def _extract_sections(
        cls,
        text: str,
    ) -> dict[str, str]:

        lines = text.splitlines()

        sections: dict[str, list[str]] = {}
        current_section: str | None = None

        for line in lines:
            heading = cls._identify_section_heading(line)

            if heading:
                current_section = heading

                if heading not in sections:
                    sections[heading] = []

                continue

            if current_section:
                sections[current_section].append(line)

        return {
            key: "\n".join(value).strip()
            for key, value in sections.items()
        }

    @classmethod
    def _identify_section_heading(
        cls,
        line: str,
    ) -> str | None:

        cleaned = line.strip()

        # Remove common heading punctuation.
        cleaned = re.sub(
            r"[:\-]+$",
            "",
            cleaned,
        ).strip()

        normalized = cleaned.lower()

        for section_name, aliases in cls.SECTION_ALIASES.items():
            if normalized in aliases:
                return section_name

        return None

    @staticmethod
    def _combine_sections(
        sections: dict[str, str],
        names: list[str],
    ) -> str:

        values = []

        for name in names:
            value = sections.get(name)

            if value:
                values.append(value)

        return "\n".join(values)

    # ---------------------------------------------------------
    # List extraction
    # ---------------------------------------------------------

    @staticmethod
    def _extract_list_items(
        text: str,
    ) -> list[str]:

        if not text:
            return []

        items = []

        for line in text.splitlines():
            cleaned = line.strip()

            cleaned = re.sub(
                r"^[•●▪◦*-]\s*",
                "",
                cleaned,
            )

            cleaned = re.sub(
                r"^\d+[\.\)]\s*",
                "",
                cleaned,
            )

            cleaned = cleaned.strip()

            if cleaned:
                items.append(cleaned)

        return items

    # ---------------------------------------------------------
    # Skill extraction
    # ---------------------------------------------------------

    @classmethod
    def _extract_skills(
        cls,
        text: str,
    ) -> list[str]:

        if not text:
            return []

        text_lower = text.lower()

        found: dict[str, None] = {}

        # Longest aliases first prevents shorter aliases
        # from interfering with multi-word skills.
        aliases = sorted(
            cls.SKILL_ALIASES.items(),
            key=lambda item: len(item[0]),
            reverse=True,
        )

        for alias, canonical_name in aliases:

            pattern = cls._skill_pattern(alias)

            if re.search(
                pattern,
                text_lower,
                flags=re.IGNORECASE,
            ):
                found[canonical_name] = None

        return list(found.keys())

    @staticmethod
    def _skill_pattern(
        skill: str,
    ) -> str:

        escaped = re.escape(skill)

        # Allow whitespace variants such as
        # "node.js" while avoiding partial word matches.
        return rf"(?<!\w){escaped}(?!\w)"

    # ---------------------------------------------------------
    # Experience extraction
    # ---------------------------------------------------------

    @staticmethod
    def _extract_experience(
        text: str,
    ) -> str | None:

        patterns = [
            r"\b\d+\s*[-–]\s*\d+\s*(?:years?|yrs?)\b",
            r"\b\d+\+?\s*(?:years?|yrs?)\s+(?:of\s+)?experience\b",
            r"\bminimum\s+of\s+\d+\s*(?:years?|yrs?)\b",
            r"\bat\s+least\s+\d+\s*(?:years?|yrs?)\b",
        ]

        for pattern in patterns:
            match = re.search(
                pattern,
                text,
                flags=re.IGNORECASE,
            )

            if match:
                return match.group(0).strip()

        return None

    # ---------------------------------------------------------
    # Education extraction
    # ---------------------------------------------------------

    @staticmethod
    def _extract_education(
        text: str,
    ) -> str | None:

        education_patterns = [
            r"\b(?:bachelor'?s?|master'?s?|ph\.?d\.?)"
            r"(?:\s+degree)?"
            r"(?:\s+in\s+[A-Za-z &/,-]+)?",

            r"\b(?:B\.?Tech|M\.?Tech|B\.?E\.?|M\.?E\.?)"
            r"(?:\s+in\s+[A-Za-z &/,-]+)?",

            r"\b(?:MBA|MCA|BCA|BBA)\b"
            r"(?:\s+in\s+[A-Za-z &/,-]+)?",
        ]

        for pattern in education_patterns:
            match = re.search(
                pattern,
                text,
                flags=re.IGNORECASE,
            )

            if match:
                return match.group(0).strip()

        return None

    # ---------------------------------------------------------
    # Title extraction
    # ---------------------------------------------------------

    @staticmethod
    def _extract_title(
        text: str,
    ) -> str | None:

        lines = text.splitlines()

        title_patterns = [
            r"^(?:job\s+title|position|role)\s*:\s*(.+)$",
            r"^(?:job\s+title|position|role)\s*-\s*(.+)$",
        ]

        for line in lines[:10]:

            for pattern in title_patterns:
                match = re.match(
                    pattern,
                    line,
                    flags=re.IGNORECASE,
                )

                if match:
                    return match.group(1).strip()

        # If no explicit label exists, look for common
        # job-title wording in the first few lines.
        for line in lines[:8]:

            if len(line) > 100:
                continue

            if re.search(
                r"\b(?:engineer|developer|analyst|scientist|"
                r"manager|designer|intern|consultant|"
                r"architect|administrator|specialist)\b",
                line,
                flags=re.IGNORECASE,
            ):
                return line.strip()

        return None

    # ---------------------------------------------------------
    # Location extraction
    # ---------------------------------------------------------

    @staticmethod
    def _extract_location(
        text: str,
    ) -> str | None:

        patterns = [
            r"^(?:location|locations|based in)\s*:\s*(.+)$",
            r"^(?:location|locations|based in)\s*-\s*(.+)$",
        ]

        for line in text.splitlines()[:20]:

            for pattern in patterns:
                match = re.match(
                    pattern,
                    line,
                    flags=re.IGNORECASE,
                )

                if match:
                    return match.group(1).strip()

        return None

    # ---------------------------------------------------------
    # Employment type extraction
    # ---------------------------------------------------------

    @staticmethod
    def _extract_employment_type(
        text: str,
    ) -> str | None:

        employment_types = [
            "full-time",
            "full time",
            "part-time",
            "part time",
            "contract",
            "internship",
            "intern",
            "temporary",
            "freelance",
        ]

        text_lower = text.lower()

        for employment_type in employment_types:

            if re.search(
                rf"(?<!\w){re.escape(employment_type)}(?!\w)",
                text_lower,
            ):
                return employment_type.title()

        return None