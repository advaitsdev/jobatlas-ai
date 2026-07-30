from datetime import datetime
from uuid import UUID

from sqlalchemy import DateTime, ForeignKey, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class ResumeAnalysis(BaseModel):
    __tablename__ = "resume_analyses"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    resume_id: Mapped[UUID] = mapped_column(
        ForeignKey("resumes.id"),
        nullable=False,
    )

    ats_score: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    analysis_json: Mapped[dict] = mapped_column(
        JSON,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow,
    )

    resume = relationship(
        "Resume",
        back_populates="analyses",
    )