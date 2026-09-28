from pydantic import BaseModel


class OptimizedEducation(BaseModel):
    institution: str
    degree: str
    duration: str
    location: str


class OptimizedExperience(BaseModel):
    title: str
    organization: str
    duration: str
    location: str
    highlights: list[str]


class OptimizedProject(BaseModel):
    name: str
    tech_stack: list[str]
    year: str
    highlights: list[str]


class OptimizedResume(BaseModel):
    name: str
    email: str
    phone: str

    education: list[OptimizedEducation]

    experience: list[OptimizedExperience]

    projects: list[OptimizedProject]

    skills: list[str]

    summary: str