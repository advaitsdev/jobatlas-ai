from app.services.job_match_service import JobMatchService

service = JobMatchService()

resume = """
Python
SQL
BigQuery
ETL
Cloud Functions
"""

job = """
Looking for a Data Engineer.

Requirements

Python

SQL

Kafka

Airflow

Docker

BigQuery
"""

response = service.match_resume(
    resume,
    job,
)

print(response)