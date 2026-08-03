from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.job_application import JobApplication
from app.schemas.enums import JobStatus


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
                func.count(JobApplication.id)
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
                func.count(JobApplication.id)
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
                func.extract("month", JobApplication.date_applied).label("month"),
                func.count(JobApplication.id).label("count"),
            )
            .group_by(
                func.extract("month", JobApplication.date_applied)
            )
            .order_by(
                func.extract("month", JobApplication.date_applied)
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