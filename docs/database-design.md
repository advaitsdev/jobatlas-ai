# JobAtlas AI Database Design

Version: 1.0

Author: Advait Sahadev

---

# Overview

The database is designed using relational database principles with PostgreSQL.

Primary goals:

- Normalize data
- Reduce redundancy
- Maintain scalability
- Support AI-powered features
- Enable analytics
- Support future Chrome Extension integration

---

# Core Entities

1. User

2. Company

3. Opportunity

4. Resume

5. Resume Version

6. Skill

7. Resume Skill

8. Opportunity Skill

9. Timeline Event

10. AI Analysis

11. Follow Up

12. Notification

---

# Entity Relationships

User
│
├── Opportunities
├── Resumes
└── Notifications

Opportunity
├── Company
├── Resume Version
├── Timeline Events
├── Opportunity Skills
├── AI Analyses
└── Follow Ups

Resume
└── Resume Versions

Resume Version
└── Resume Skills

Skill
├── Resume Skills
└── Opportunity Skills


# Opportunity Lifecycle

Saved

↓

Interested

↓

Resume Tailoring

↓

Applied

↓

Assessment

↓

Recruiter Contact

↓

Technical Interview

↓

HR Interview

↓

Offer

↓

Accepted / Rejected