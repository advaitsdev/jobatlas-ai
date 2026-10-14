from typing import TYPE_CHECKING
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel
from app.models.mixins import UUIDMixin, TimestampMixin
if TYPE_CHECKING:
    from app.models.opportunity import Opportunity

class Company(UUIDMixin, TimestampMixin, BaseModel):
    __tablename__ = "companies"

    name: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        index=True,
    )

    website: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    industry: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )
    opportunities: Mapped[list["Opportunity"]] = relationship(
    back_populates="company",
)
    