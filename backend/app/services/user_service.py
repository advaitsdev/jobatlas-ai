from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserUpdate


class UserService:
    def __init__(self, db: Session):
        self.repository = UserRepository(db)

    def create_user(self, user_data: UserCreate):
        return self.repository.create(user_data)

    def get_users(self):
        return self.repository.get_all()

    def update_user(
        self,
        user_id: str,
        user_data: UserUpdate,
    ):
        return self.repository.update(
            user_id,
            user_data,
        )

    def delete_user(self, user_id: str):
        return self.repository.delete(user_id)