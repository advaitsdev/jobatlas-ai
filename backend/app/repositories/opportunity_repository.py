from sqlalchemy.orm import Session

from app.models.opportunity import Opportunity
from app.schemas.opportunity import OpportunityCreate


class OpportunityRepository:
    def __init__(self, db: Session):
        self.db = db
        

    def create(self, opportunity_data: OpportunityCreate) -> Opportunity:
        opportunity = Opportunity(
            **opportunity_data.model_dump()
        )

        self.db.add(opportunity)
        self.db.commit()
        self.db.refresh(opportunity)

        return opportunity
    
    def get_all(self) -> list[Opportunity]:
        return self.db.query(Opportunity).all()
    
    def delete(self, opportunity_id: str):
        opportunity = (
        self.db.query(Opportunity)
        .filter(Opportunity.id == opportunity_id)
        .first()
    )

        if not opportunity:
            return None

        self.db.delete(opportunity)
        self.db.commit()

        return opportunity
    
