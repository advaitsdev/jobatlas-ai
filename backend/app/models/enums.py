from enum import Enum


class OpportunityStatus(str, Enum):
    WISHLIST = "wishlist"
    APPLIED = "applied"
    ONLINE_ASSESSMENT = "online_assessment"
    INTERVIEW = "interview"
    OFFER = "offer"
    REJECTED = "rejected"
    WITHDRAWN = "withdrawn"