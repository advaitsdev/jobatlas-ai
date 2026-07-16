from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserUpdate,
)
from app.services.user_service import UserService

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post(
    "",
    response_model=UserResponse,
    status_code=201,
)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    service = UserService(db)
    return service.create_user(user)


@router.get(
    "",
    response_model=List[UserResponse],
)
def get_users(
    db: Session = Depends(get_db),
):
    service = UserService(db)
    return service.get_users()


@router.patch(
    "/{user_id}",
    response_model=UserResponse,
)
def update_user(
    user_id: str,
    user: UserUpdate,
    db: Session = Depends(get_db),
):
    service = UserService(db)

    updated = service.update_user(
        user_id,
        user,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return updated


@router.delete("/{user_id}")
def delete_user(
    user_id: str,
    db: Session = Depends(get_db),
):
    service = UserService(db)

    deleted = service.delete_user(user_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "message": "User deleted successfully"
    }