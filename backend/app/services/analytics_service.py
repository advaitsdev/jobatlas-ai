from collections import Counter
from datetime import date, timedelta

from sqlalchemy.orm import Session

from app.models.enums import OpportunityStatus
from app.models.opportunity import Opportunity


class AnalyticsService:
    @staticmethod
    def get_application_analytics(
        db: Session,
    ) -> dict:
        opportunities = (
            db.query(Opportunity)
            .order_by(Opportunity.applied_date.asc())
            .all()
        )

        total_opportunities = len(opportunities)

        status_counts = Counter(
            opportunity.status.value
            for opportunity in opportunities
        )

        applied_opportunities = [
            opportunity
            for opportunity in opportunities
            if opportunity.applied_date is not None
        ]

        total_applications = len(
            applied_opportunities
        )

        rejected_count = status_counts.get(
            OpportunityStatus.REJECTED.value,
            0,
        )

        offer_count = status_counts.get(
            OpportunityStatus.OFFER.value,
            0,
        )

        interview_count = status_counts.get(
            OpportunityStatus.INTERVIEW.value,
            0,
        )

        application_to_rejection_ratio = (
            round(
                (
                    rejected_count
                    / total_applications
                )
                * 100,
                2,
            )
            if total_applications
            else 0
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

        status_breakdown = []

        for status in OpportunityStatus:
            status_breakdown.append(
                {
                    "status": status.value,
                    "count": status_counts.get(
                        status.value,
                        0,
                    ),
                }
            )

        source_counter = Counter(
            opportunity.source.strip()
            if opportunity.source
            else "Unknown"
            for opportunity in applied_opportunities
        )

        source_breakdown = [
            {
                "source": source,
                "count": count,
            }
            for source, count
            in source_counter.most_common()
        ]

        applications_by_date = Counter(
            opportunity.applied_date.isoformat()
            for opportunity in applied_opportunities
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
            for opportunity
            in applied_opportunities
            if opportunity.applied_date
            >= thirty_days_ago
        )

        return {
            "total_opportunities": (
                total_opportunities
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