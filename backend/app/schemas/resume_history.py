from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class ResumeHistoryItem(BaseModel):
    id: UUID
    filename: str
    uploaded_at: datetime
    ats_score: int