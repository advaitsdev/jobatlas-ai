from uuid import uuid4
from datetime import datetime

from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class Resume(BaseModel):
    __tablename__ = "resumes"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
    )

    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=True,
    )

    filename: Mapped[str] = mapped_column(String)

    filepath: Mapped[str] = mapped_column(String)

    filesize: Mapped[str] = mapped_column(String)

    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    analyses = relationship(
        "ResumeAnalysis",
        back_populates="resume",
        cascade="all, delete-orphan",
    )