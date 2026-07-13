from sqlalchemy.orm import Session

from app.models.opportunity import Opportunity
from app.schemas.opportunity import OpportunityCreate


class OpportunityRepository:
    def __init__(self, db: Session):
        self.db = db
        print("Methods on repository:", dir(self))

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
    
