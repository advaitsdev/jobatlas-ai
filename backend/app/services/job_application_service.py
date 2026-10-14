from app.models.enums import OpportunityStatus


APPLICATION_TO_OPPORTUNITY_STATUS = {
    "Applied": OpportunityStatus.APPLIED,
    "Interview": OpportunityStatus.INTERVIEW,
    "Offer": OpportunityStatus.OFFER,
    "Rejected": OpportunityStatus.REJECTED,
    "Withdrawn": OpportunityStatus.WITHDRAWN,
    "HR": OpportunityStatus.INTERVIEW,
    "Ghosted": OpportunityStatus.REJECTED,
}


def get_opportunity_status(
    application_status: str,
) -> OpportunityStatus | None:
    return APPLICATION_TO_OPPORTUNITY_STATUS.get(
        application_status
    )