from app.services.job_description_parser import (
    JobDescriptionParser,
)


sample_job_description = """
Software Engineer

Location: Bengaluru

Full-time

Responsibilities:
• Build backend services using Python and FastAPI
• Design and maintain PostgreSQL databases
• Develop REST APIs
• Work with cloud infrastructure

Qualifications:
• Bachelor's degree in Computer Science or related field
• 2-4 years of experience
• Strong Python and SQL skills
• Experience building backend applications

Preferred Qualifications:
• Experience with Docker
• Knowledge of AWS
• Familiarity with Apache Kafka

Technical Skills:
Python, FastAPI, PostgreSQL, SQL, Docker, AWS, Kafka
"""


result = JobDescriptionParser.parse(
    sample_job_description
)


print("\n" + "=" * 60)
print("PARSED JOB DESCRIPTION")
print("=" * 60)

for key, value in result.items():
    print(f"\n{key}:")
    print(value)

print("\n" + "=" * 60)