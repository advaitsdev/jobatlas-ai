from typing import TYPE_CHECKING
from uuid import UUID
from datetime import date

from sqlalchemy import Date, Enum, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel
from app.models.enums import OpportunityStatus
from app.models.mixins import TimestampMixin, UUIDMixin
if TYPE_CHECKING:
    from app.models.company import Company


class Opportunity(UUIDMixin, TimestampMixin, BaseModel):
    __tablename__ = "opportunities"

    title: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    company_id: Mapped[UUID] = mapped_column(
    ForeignKey("companies.id"),
    nullable=False,
)
    company: Mapped["Company"] = relationship(
    back_populates="opportunities",
)

    user_id: Mapped[UUID] = mapped_column(
    ForeignKey("users.id"),
    nullable=False,
)

    location: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    employment_type: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    status: Mapped[OpportunityStatus] = mapped_column(
        Enum(OpportunityStatus),
        default=OpportunityStatus.WISHLIST,
        nullable=False,
    )

    application_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    salary: Mapped[str | None] = mapped_column(
        String(100),
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