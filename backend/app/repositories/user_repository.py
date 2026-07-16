from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, user_data: UserCreate) -> User:
        user = User(
            **user_data.model_dump()
        )

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user

    def get_all(self) -> list[User]:
        return self.db.query(User).all()

    def update(
        self,
        user_id: str,
        user_data: UserUpdate,
    ):
        user = (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if not user:
            return None

        update_data = user_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(user, key, value)

        self.db.commit()
        self.db.refresh(user)

        return user

    def delete(self, user_id: str):
        user = (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if not user:
            return None

        self.db.delete(user)
        self.db.commit()

        return user