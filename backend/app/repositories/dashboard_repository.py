from collections import Counter
from datetime import date, timedelta

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.job_application import JobApplication


class DashboardRepository:

    @staticmethod
    def get_summary(status_breakdown: list[dict]):
        summary = {
            "total_applications": 0,
            "applied": 0,
            "interview": 0,
            "hr": 0,
            "offer": 0,
            "rejected": 0,
            "ghosted": 0,
            "withdrawn": 0,
        }

        status_mapping = {
            "Applied": "applied",
            "Interview": "interview",
            "HR": "hr",
            "Offer": "offer",
            "Rejected": "rejected",
            "Ghosted": "ghosted",
            "Withdrawn": "withdrawn",
        }

        for item in status_breakdown:
            status = item["status"]
            count = item["count"]

            summary["total_applications"] += count

            if status in status_mapping:
                summary[status_mapping[status]] = count

        return summary

    @staticmethod
    def get_source_breakdown(db: Session):
        results = (
            db.query(
                JobApplication.source,
                func.count(JobApplication.id),
            )
            .group_by(JobApplication.source)
            .all()
        )

        return [
            {
                "source": source,
                "count": count,
            }
            for source, count in results
        ]

    @staticmethod
    def get_status_breakdown(db: Session):
        results = (
            db.query(
                JobApplication.status,
                func.count(JobApplication.id).label("count"),
            )
            .group_by(JobApplication.status)
            .all()
        )

        return [
            {
                "status": status,
                "count": count,
            }
            for status, count in results
        ]

    @staticmethod
    def get_monthly_applications(db: Session):
        results = (
            db.query(
                func.extract(
                    "month",
                    JobApplication.date_applied,
                ).label("month"),
                func.count(JobApplication.id).label("count"),
            )
            .group_by(
                func.extract(
                    "month",
                    JobApplication.date_applied,
                )
            )
            .order_by(
                func.extract(
                    "month",
                    JobApplication.date_applied,
                )
            )
            .all()
        )

        month_names = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec",
        }

        return [
            {
                "month": month_names[int(month)],
                "count": count,
            }
            for month, count in results
        ]

    @staticmethod
    def get_company_breakdown(db: Session):
        results = (
            db.query(
                JobApplication.company,
                func.count(JobApplication.id).label("count"),
            )
            .group_by(JobApplication.company)
            .order_by(
                func.count(JobApplication.id).desc()
            )
            .all()
        )

        return [
            {
                "company": company,
                "count": count,
            }
            for company, count in results
        ]

    @staticmethod
    def get_applications_last_30_days(db: Session):
        today = date.today()
        thirty_days_ago = today - timedelta(days=30)

        return (
            db.query(JobApplication)
            .filter(
                JobApplication.date_applied >= thirty_days_ago,
                JobApplication.date_applied <= today,
            )
            .count()
        )

    @staticmethod
    def get_conversion_metrics(db: Session):
        total_applications = (
            db.query(JobApplication.id).count()
        )

        rejected_count = (
            db.query(JobApplication.id)
            .filter(JobApplication.status == "Rejected")
            .count()
        )

        interview_count = (
            db.query(JobApplication.id)
            .filter(JobApplication.status == "Interview")
            .count()
        )

        offer_count = (
            db.query(JobApplication.id)
            .filter(JobApplication.status == "Offer")
            .count()
        )

        if total_applications == 0:
            return {
                "application_to_rejection_ratio": 0,
                "application_to_interview_ratio": 0,
                "application_to_offer_ratio": 0,
            }

        return {
            "application_to_rejection_ratio": round(
                (rejected_count / total_applications) * 100,
                2,
            ),
            "application_to_interview_ratio": round(
                (
                    (interview_count + offer_count)
                    / total_applications
                )
                * 100,
                2,
            ),
            "application_to_offer_ratio": round(
                (offer_count / total_applications) * 100,
                2,
            ),
        }