from sqlalchemy.orm import Session

from app.repositories.opportunity_repository import OpportunityRepository
from app.schemas.opportunity import OpportunityCreate


class OpportunityService:
    def __init__(self, db: Session):
        self.repository = OpportunityRepository(db)

    def create_opportunity(self, opportunity_data: OpportunityCreate):
        return self.repository.create(opportunity_data)
    
    def get_opportunities(self):
        return self.repository.get_all()