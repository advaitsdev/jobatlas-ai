from enum import Enum


class JobStatus(str, Enum):
    APPLIED = "Applied"
    OA = "Online Assessment"
    INTERVIEW = "Interview"
    HR = "HR"
    OFFER = "Offer"
    REJECTED = "Rejected"
    GHOSTED = "Ghosted"
    WITHDRAWN = "Withdrawn"


class JobSource(str, Enum):
    LINKEDIN = "LinkedIn"
    INDEED = "Indeed"
    NAUKRI = "Naukri"
    FOUNDIT = "Foundit"
    COMPANY = "Company Career Page"
    REFERRAL = "Referral"
    CAMPUS = "Campus"
    OTHER = "Other"