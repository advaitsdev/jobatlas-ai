class User(UUIDMixin, TimestampMixin, BaseModel):
    __tablename__ = "users"

    full_name: Mapped[str] = mapped_column(String(100))

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
    )

    is_active: Mapped[bool] = mapped_column(
        default=True
    )