# JobAtlasAI 🚀
### Your AI-Powered Job Search & Career Intelligence Platform

<p align="center">
  <strong>Track applications. Understand job requirements. Identify skill gaps. Make smarter career decisions.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Frontend-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 🎯 Overview

**JobAtlasAI** is a full-stack job search and career intelligence platform designed to bring the entire job application lifecycle into one place.

Traditional job trackers help you remember where you applied. JobAtlasAI goes a step further by connecting job opportunities, job-description analysis, resume skills, skill-gap identification, application progress, and analytics into a unified workflow.

Instead of treating every application as an isolated entry, the platform connects the dots between **what a job requires, what your resume demonstrates, and how your application progresses**.

### The problem

Job seekers often manage applications across spreadsheets, job boards, bookmarks, and scattered notes. This makes it difficult to:

- Keep track of applications and their changing statuses.
- Understand the skills employers repeatedly request.
- Identify gaps between a resume and a target role.
- Compare opportunities before investing time in an application.
- Measure application activity and understand job-search patterns.

### The solution

JobAtlasAI combines application management with resume and job-description intelligence, creating a foundation for a more structured, measurable, and data-driven job search.

## ✨ Features

### 📊 1. Application Dashboard & Analytics

Get a consolidated view of your job search.

- Application statistics and summary metrics.
- Application status breakdowns.
- Application sources and activity trends.
- Company-level and monthly breakdowns.
- Recent application activity.
- Search, filtering, sorting, and pagination for application records.

The goal is to turn application history into useful information rather than leaving it as a list of entries.

### 🎯 2. Job Opportunity Management

Maintain a dedicated collection of opportunities you're considering or pursuing.

- Create, view, edit, and delete opportunities.
- Store company, role, location, source, salary, application URL, and notes.
- Track opportunity status, deadlines, and application dates.
- Associate opportunities with company records.
- Link opportunities to their corresponding job applications.

The opportunity and application records are connected, allowing the system to represent the difference between a job you're considering and one you've actually applied for.

### 📝 3. Job Description Parsing

Turn a job description into structured information.

The JD parser extracts information such as:

- Required skills.
- Preferred skills.
- Responsibilities.
- Qualifications.
- Experience requirements.
- Education requirements.

The current parser uses local, rule-based extraction rather than depending on a paid external LLM API.

Structured job requirements also provide the input needed for resume-to-opportunity matching and skill-gap analysis.

### 🧠 4. Resume Skills Intelligence

Extract skills from analyzed resumes and make them available for downstream analysis.

The skills profile supports:

- Viewing extracted resume skills.
- Understanding which skills appear in analyzed job descriptions.
- Identifying missing or underrepresented skills.
- Examining skill gaps across opportunities.
- Comparing resume skills against job requirements.

This creates a foundation for understanding the relationship between a candidate's existing skill set and their target roles.

### 🔍 5. Resume-to-Job Skill Matching

Compare a resume's extracted skills against the requirements of an individual opportunity.

- Identify matching skills.
- Highlight missing required skills.
- Examine the relationship between resume skills and job requirements.
- Use skill-gap results to inform preparation and resume improvement.

The matching workflow is designed to make job requirements more actionable than a simple keyword list.

> **Note:** Skill overlap is a useful signal, not a guarantee of ATS performance, recruiter interest, or interview selection.

### 🔄 6. Application & Opportunity Synchronization

JobAtlasAI connects application progress with the corresponding opportunity.

The backend synchronizes application statuses with the linked opportunity:

| Application status | Opportunity status |
|---|---|
| Applied | `APPLIED` |
| Interview | `INTERVIEW` |
| HR | `INTERVIEW` |
| Offer | `OFFER` |
| Rejected | `REJECTED` |
| Ghosted | `REJECTED` |
| Withdrawn | `WITHDRAWN` |

When a linked application is created with the status `Applied`, the opportunity is updated to `APPLIED` and its application date is synchronized.

The relationship also allows the opportunity interface to identify an existing application and open it for editing instead of creating a duplicate.

**Verified workflow:** Application creation, opportunity linking, `Applied` synchronization, `Interview` synchronization, and the linked application ID were tested against the local PostgreSQL-backed API.

### 🏢 7. Company & Application Organization

Applications and opportunities retain company and role information, providing the data foundation for future company-level intelligence.

Planned extensions include company-level application conversion metrics, recurring skill requirements, and hiring activity insights.

---

## 🏗️ Architecture

JobAtlasAI follows a frontend/backend architecture with a relational database.

```mermaid
flowchart TD
    U[User] --> FE[React + TypeScript Frontend]
    FE --> API[FastAPI REST API]
    API --> S[Service Layer]
    S --> R[Repository Layer]
    R --> DB[(PostgreSQL)]
    S --> JD[JD Parsing]
    S --> SM[Resume Skill Matching]
    S --> GAP[Skill Gap Analysis]
    S --> AN[Dashboard Analytics]
    JD --> DB
    SM --> DB
    GAP --> DB
    AN --> DB
```

### Technology stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| Styling & UI | Tailwind CSS, shadcn/ui |
| Data fetching | TanStack Query |
| API communication | Axios |
| Charts | Recharts |
| Backend | Python, FastAPI |
| Data validation | Pydantic |
| ORM | SQLAlchemy |
| Database | PostgreSQL |
| Database migrations | Alembic |
| API documentation | FastAPI / Swagger UI |
| Version control | Git, GitHub |

### Backend structure

```text
backend/
├── alembic/
│   └── versions/          # Database migrations
├── app/
│   ├── api/               # REST API routes
│   ├── core/              # Application configuration
│   ├── db/                # Database session and connection setup
│   ├── models/             # SQLAlchemy models
│   ├── repositories/       # Database access operations
│   ├── schemas/            # Pydantic request/response schemas
│   ├── services/           # Business logic and analysis
│   └── main.py             # FastAPI application entry point
├── requirements.txt
└── .env                    # Local environment configuration
```

### Frontend structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── applications/  # Application management UI
│   │   └── opportunities/ # Opportunity and matching UI
│   ├── pages/             # Dashboard and application pages
│   ├── services/          # API service functions
│   ├── types/             # TypeScript interfaces
│   └── ...
├── package.json
└── vite.config.ts
```

The directory trees above show the main architectural areas, not every file in the repository.

---

## 🔁 Core Workflow

The central workflow connects job discovery to application tracking and career analysis.

```mermaid
flowchart TD
    A[Create Job Opportunity] --> B[Parse Job Description]
    B --> C[Extract Job Requirements]
    C --> D[Compare Against Resume Skills]
    D --> E[Identify Skill Gaps]
    E --> F[Create Linked Application]
    F --> G[Track Application Status]
    G --> H[Synchronize Opportunity Status]
    H --> I[Review Dashboard Analytics]
```

This architecture separates opportunity management, application tracking, and skill intelligence while allowing them to work together.

---

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- Git
- Python 3.10 or a compatible supported version
- Node.js and npm
- PostgreSQL
- A terminal such as PowerShell, Bash, or your preferred shell

### 1. Clone the repository

```bash
git clone https://github.com/advaitsdev/jobatlas-ai.git
cd jobatlas-ai
```

### 2. Set up the backend

Create and activate a virtual environment.

**Windows PowerShell**

```powershell
cd backend

python -m venv .venv
.\.venv\Scripts\Activate.ps1

python -m pip install --upgrade pip
pip install -r requirements.txt
```

On macOS or Linux, activate the environment with:

```bash
source .venv/bin/activate
```

### 3. Configure environment variables

Create or update `backend/.env` using the variables expected by the project's current configuration.

For example, a typical local configuration may contain:

```dotenv
DATABASE_URL=postgresql+psycopg://USERNAME:PASSWORD@localhost:5432/jobatlasai
SECRET_KEY=replace_with_a_long_random_secret
```

Replace the placeholders with your local PostgreSQL credentials and a securely generated secret.

**Important:** Check the database URL format expected by the current SQLAlchemy configuration before using this example. Never commit real credentials, secret keys, or production environment files.

Create the PostgreSQL database if it does not already exist.

### 4. Apply database migrations

From the `backend` directory, with the virtual environment activated:

```powershell
alembic upgrade head
```

Ensure your database connection is configured correctly before applying migrations.

### 5. Start the backend

From `backend/`:

```powershell
uvicorn app.main:app --reload
```

The local API should be available at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

Use Swagger UI to inspect endpoints and exercise supported API workflows.

### 6. Start the frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Vite will display the local frontend URL, typically:

```text
http://localhost:5173
```

Ensure the frontend API configuration points to the running backend.

### 7. Verify the application

After starting both services:

1. Open the frontend in your browser.
2. Verify the dashboard loads.
3. Create or inspect a job application.
4. Create an opportunity and parse a job description.
5. Run skill matching where resume data is available.
6. Link an application to an opportunity.
7. Change the application status and verify synchronization through the API.

These are manual smoke-test steps; a complete automated test suite remains part of the hardening roadmap.

---

## 🧪 Testing & Validation

The application has undergone manual API validation through Swagger UI.

Verified scenarios include:

- Creating and retrieving applications.
- Linking an application to an opportunity.
- Updating application status.
- Synchronizing `Applied` to `APPLIED`.
- Synchronizing `Interview` to `INTERVIEW`.
- Synchronizing the application date when creating an `Applied` application.
- Returning the linked application's ID in the opportunity response.
- Removing temporary test records after validation.

### Planned automated coverage

The next testing phase will introduce repeatable automated coverage for:

- Application and opportunity CRUD operations.
- Application/opportunity relationship integrity.
- Status synchronization and date updates.
- Job-description parsing.
- Resume skill extraction and matching.
- Skill-gap calculations.
- Dashboard analytics.
- Invalid, oversized, and unsafe resume uploads.

Until that suite is implemented, manual verification should not be mistaken for automated test coverage.

---

## 🔐 Security & Engineering Considerations

Security and reliability are active areas of improvement.

Planned hardening includes:

- Reconciling database constraints with ORM models, migrations, and request schemas.
- Validating resume uploads by file content, not just filename or MIME type.
- Generating safe server-side filenames and enforcing upload-size limits.
- Preventing path traversal and unsafe file access.
- Defining and enforcing a deliberate data ownership model.
- Consolidating database engine and session configuration.
- Adding automated backend tests and CI checks.
- Improving deployment configuration and secret management.

**Current scope:** JobAtlasAI is a development-stage project. Do not assume production-grade authentication, multi-user isolation, deployment automation, or complete security hardening unless those capabilities are verified in the current codebase.

---

## 🗺️ Roadmap

### Current foundation

- [x] Full-stack frontend and backend foundation.
- [x] Job application CRUD and tracking.
- [x] Opportunity management.
- [x] Structured job-description parsing.
- [x] Resume skills profile.
- [x] Resume-to-opportunity skill matching.
- [x] Skill-gap analysis.
- [x] Dashboard analytics.
- [x] Opportunity-to-application linking.
- [x] Application status synchronization.
- [x] Manual API validation of critical workflows.

### Next priorities

- [ ] Reconcile `user_id` database constraints, ORM models, and migrations.
- [ ] Secure both resume upload paths.
- [ ] Define and enforce user ownership and access control.
- [ ] Consolidate database setup.
- [ ] Build an automated backend test suite.
- [ ] Write comprehensive setup and architecture documentation.
- [ ] Clean up frontend routing and API configuration.
- [ ] Add CI checks for backend tests and frontend build/lint.
- [ ] Develop richer company intelligence.
- [ ] Improve opportunity ranking and personalized recommendations.
- [ ] Expand resume tailoring and job-specific preparation.
- [ ] Explore browser-based job ingestion.
- [ ] Prepare for deployment and production operations.

---

## 💡 Design Principles

JobAtlasAI is being developed around a few core principles:

**1. Connected workflows**

Applications, opportunities, resumes, and skill requirements should share relevant context instead of operating as isolated modules.

**2. Actionable information**

Extracted skills and analytics should help users decide what to improve and where to focus.

**3. Modular architecture**

API routes, business logic, database access, and frontend services should have clear responsibilities.

**4. Incremental engineering**

Build features, verify critical workflows, checkpoint changes in Git, and harden the system progressively.

**5. Transparent limitations**

A match score or extracted skill is a decision-support signal, not a promise of hiring success.

---

## 👨‍💻 About the Project

JobAtlasAI is an independent full-stack engineering project focused on combining job application management with practical career intelligence.

It explores:

- REST API design with FastAPI.
- Relational data modelling and database migrations.
- Frontend/backend integration with React and TypeScript.
- Resume and job-description processing.
- Skill matching and gap analysis.
- Application lifecycle modelling and synchronization.
- Analytics-driven product design.
- Incremental development and engineering validation.

The long-term vision is to evolve JobAtlasAI from a job application tracker into a unified platform for **understanding opportunities, improving candidate-role alignment, and making the job search more measurable**.

---

## 📄 License

A license has not yet been specified. Check the repository's licensing requirements before publishing or reusing this project.

---

<p align="center">
  <strong>Built to make job searching more structured, measurable, and intelligent. 🚀</strong>
</p>
