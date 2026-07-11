from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import BaseModel
from app.models.mixins import UUIDMixin, TimestampMixin


class User(UUIDMixin, TimestampMixin, BaseModel):
    __tablename__ = "users"

    full_name: Mapped[str] = mapped_column(String(100))

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )