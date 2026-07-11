from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import BaseModel
from app.models.mixins import UUIDMixin, TimestampMixin


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