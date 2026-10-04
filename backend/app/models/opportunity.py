from datetime import date
from uuid import UUID

from sqlalchemy import Date, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import (
    ENUM as PGEnum,
    JSONB,
    UUID as PGUUID,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel
from app.models.enums import OpportunityStatus
from app.models.mixins import UUIDMixin, TimestampMixin


class Opportunity(
    UUIDMixin,
    TimestampMixin,
    BaseModel,
):
    __tablename__ = "opportunities"

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    company_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("companies.id"),
        nullable=False,
    )

    user_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )

    location: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    employment_type: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    source: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    status: Mapped[OpportunityStatus] = mapped_column(
        PGEnum(
            OpportunityStatus,
            name="opportunitystatus",
            create_type=False,
        ),
        default=OpportunityStatus.WISHLIST,
        nullable=False,
    )

    application_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    salary: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    applied_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    deadline: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    job_description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    required_skills: Mapped[list | None] = mapped_column(
        JSONB,
        nullable=True,
    )

    preferred_skills: Mapped[list | None] = mapped_column(
        JSONB,
        nullable=True,
    )

    responsibilities: Mapped[list | None] = mapped_column(
        JSONB,
        nullable=True,
    )

    qualifications: Mapped[list | None] = mapped_column(
        JSONB,
        nullable=True,
    )

    experience_required: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    education_required: Mapped[str | None] = mapped_column(
        String(250),
        nullable=True,
    )

    company = relationship(
        "Company",
        back_populates="opportunities",
    )

    user = relationship(
        "User",
        back_populates="opportunities",
    )