from collections import Counter
from datetime import date, timedelta

from sqlalchemy.orm import Session

from app.models.job_application import JobApplication


class AnalyticsService:
    @staticmethod
    def get_application_analytics(
        db: Session,
    ) -> dict:
        applications = (
            db.query(JobApplication)
            .order_by(JobApplication.date_applied.asc())
            .all()
        )

        total_applications = len(applications)

        status_counts = Counter(
            application.status
            for application in applications
        )

        application_to_rejection_ratio = (
            round(
                (
                    status_counts.get("Rejected", 0)
                    / total_applications
                )
                * 100,
                2,
            )
            if total_applications
            else 0
        )

        interview_count = status_counts.get(
            "Interview",
            0,
        )

        offer_count = status_counts.get(
            "Offer",
            0,
        )

        application_to_interview_ratio = (
            round(
                (
                    (
                        interview_count
                        + offer_count
                    )
                    / total_applications
                )
                * 100,
                2,
            )
            if total_applications
            else 0
        )

        application_to_offer_ratio = (
            round(
                (
                    offer_count
                    / total_applications
                )
                * 100,
                2,
            )
            if total_applications
            else 0
        )

        status_breakdown = [
            {
                "status": status,
                "count": count,
            }
            for status, count
            in status_counts.most_common()
        ]

        source_counter = Counter(
            application.source.strip()
            if application.source
            else "Unknown"
            for application in applications
        )

        source_breakdown = [
            {
                "source": source,
                "count": count,
            }
            for source, count
            in source_counter.most_common()
        ]

        company_counter = Counter(
            application.company.strip()
            if application.company
            else "Unknown"
            for application in applications
        )

        company_breakdown = [
            {
                "company": company,
                "count": count,
            }
            for company, count
            in company_counter.most_common()
        ]

        applications_by_date = Counter(
            application.date_applied.isoformat()
            for application in applications
            if application.date_applied is not None
        )

        application_timeline = [
            {
                "date": applied_date,
                "count": count,
            }
            for applied_date, count
            in sorted(
                applications_by_date.items()
            )
        ]

        today = date.today()
        thirty_days_ago = (
            today - timedelta(days=30)
        )

        applications_last_30_days = sum(
            1
            for application in applications
            if application.date_applied
            and application.date_applied
            >= thirty_days_ago
        )

        return {
            "total_opportunities": (
                total_applications
            ),
            "total_applications": (
                total_applications
            ),
            "applications_last_30_days": (
                applications_last_30_days
            ),
            "status_breakdown": (
                status_breakdown
            ),
            "source_breakdown": (
                source_breakdown
            ),
            "company_breakdown": (
                company_breakdown
            ),
            "application_timeline": (
                application_timeline
            ),
            "application_to_rejection_ratio": (
                application_to_rejection_ratio
            ),
            "application_to_interview_ratio": (
                application_to_interview_ratio
            ),
            "application_to_offer_ratio": (
                application_to_offer_ratio
            ),
        }