from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import Float, ForeignKey, JSON, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel
from app.models.mixins import TimestampMixin, UUIDMixin

if TYPE_CHECKING:
    from app.models.resume import Resume


class ResumeAnalysis(
    UUIDMixin,
    TimestampMixin,
    BaseModel,
):
    __tablename__ = "resume_analyses"

    resume_id: Mapped[UUID] = mapped_column(
        ForeignKey("resumes.id"),
        nullable=False,
        unique=True,
    )

    resume: Mapped["Resume"] = relationship(
        back_populates="analysis",
    )

    name: Mapped[str | None] = mapped_column(
        nullable=True,
    )

    email: Mapped[str | None] = mapped_column(
        nullable=True,
    )

    phone: Mapped[str | None] = mapped_column(
        nullable=True,
    )

    education: Mapped[list] = mapped_column(
        JSON,
        default=list,
    )

    experience: Mapped[list] = mapped_column(
        JSON,
        default=list,
    )

    projects: Mapped[list] = mapped_column(
        JSON,
        default=list,
    )

    skills: Mapped[list] = mapped_column(
        JSON,
        default=list,
    )

    ats_score: Mapped[float] = mapped_column(
        Float,
        default=0,
    )

    best_role: Mapped[str | None] = mapped_column(
        nullable=True,
    )

    strengths: Mapped[list] = mapped_column(
        JSON,
        default=list,
    )

    missing_skills: Mapped[list] = mapped_column(
        JSON,
        default=list,
    )

    recommendations: Mapped[list] = mapped_column(
        JSON,
        default=list,
    )