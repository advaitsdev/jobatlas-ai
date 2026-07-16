from uuid import UUID

from pydantic import BaseModel, ConfigDict


class UserCreate(BaseModel):
    full_name: str
    email: str
    is_active: bool = True


class UserUpdate(BaseModel):
    full_name: str | None = None
    email: str | None = None
    is_active: bool | None = None


class UserResponse(BaseModel):
    id: UUID

    full_name: str
    email: str
    is_active: bool

    model_config = ConfigDict(from_attributes=True)