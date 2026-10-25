# JobAtlasAI 🚀
### An AI-Powered Job Search & Career Intelligence Platform

<p align="center">
  <strong>From resume analysis to job matching, optimized resumes, and application tracking — one connected career intelligence platform.</strong>
</p>

<p align="center">
  <a href="https://github.com/advaitsdev/jobatlas-ai">
    <img src="https://img.shields.io/badge/Project-JobAtlasAI-6C63FF?style=for-the-badge" alt="JobAtlasAI" />
  </a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/FastAPI-REST%20API-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Google%20Gemini-Generative%20AI-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Google Gemini" />
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-gemini-ai-integration">Gemini AI</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 🎯 Overview

**JobAtlasAI** is a full-stack job search and career intelligence platform that combines generative AI, resume analysis, job-description processing, skill matching, and application tracking.

A conventional job tracker tells you where you applied. JobAtlasAI aims to help answer the more important questions:

- How well does my resume align with a target role?
- Which skills, keywords, and qualifications are relevant to a job?
- How can I improve my resume without misrepresenting my experience?
- What should I focus on before applying?
- How do I keep my applications organized and measure my job-search activity?

The platform combines **Google Gemini-powered AI workflows** with deterministic skill analysis, structured PostgreSQL data, and a React-based interface.

### The core idea

Connect the entire job-search lifecycle:

**Analyze → Match → Improve → Apply → Track → Learn**

Rather than building disconnected tools for resumes, job descriptions, and application management, JobAtlasAI brings these capabilities into a shared workflow.

## ✨ Features

### 🤖 1. Gemini-Powered Resume Analysis

JobAtlasAI integrates Google's Gemini API through the `google-genai` Python SDK to analyze extracted resume content and return structured results.

The resume analysis service evaluates a resume across several dimensions:

- **Candidate information:** Name, email, and phone number.
- **Education:** Institutions, degrees, duration, and location.
- **Experience:** Roles, organizations, dates, and achievement highlights.
- **Projects:** Project names, technology stacks, and highlights.
- **Technical skills:** Skills extracted from the resume.
- **ATS-oriented evaluation:** An AI-generated score from 0–100.
- **Career direction:** A suggested role based on the resume.
- **Strengths and missing skills:** Areas of demonstrated capability and potential gaps.
- **Improvement recommendations:** Actionable suggestions for strengthening the resume.

The generated response is validated against a Pydantic schema before being used by the application.

Resume analyses are stored in the database and can be retrieved for later use by the skills profile and other resume intelligence features.

> AI-generated scores are estimates for decision support. They are not official scores from commercial applicant tracking systems.

### 🎯 2. AI-Powered Resume-to-Job Matching

The AI matching service compares a resume against a specific job description using Gemini.

The analysis returns structured information covering:

- Overall resume-to-job match score.
- ATS-oriented match score.
- Recommended role.
- Matching and missing skills.
- Keyword matches.
- Candidate strengths and weaknesses.
- Resume improvement recommendations.
- Five interview questions based on the resume and target job.

This workflow is designed to help candidates understand not only whether their resume appears relevant, but also **why it matches, what is missing, and how to prepare**.

The backend exposes the matching workflow through the `/ai-matching/match` endpoint.

### ✍️ 3. AI Resume Optimization

The resume optimization service uses Gemini to produce targeted, actionable recommendations for improving an existing resume.

Its structured analysis includes:

- An overall resume quality score.
- A summary of the resume's strengths and weaknesses.
- Weak or vague bullet points.
- Improved bullet-point suggestions.
- Missing keywords.
- ATS-oriented improvements.
- Section-specific recommendations.

When a target job description is supplied, the analysis can focus on relevant requirements and keywords. Without one, it can provide more general improvements aligned with the candidate's demonstrated career direction.

The optimizer is explicitly instructed to avoid inventing experience, projects, technologies, accomplishments, or metrics.

This separates **identifying improvements** from rewriting the complete resume.

### 📄 4. Generate an Optimized Resume

Beyond recommendations, JobAtlasAI includes a separate workflow for generating an improved resume with Gemini.

The optimized resume generation service can produce a structured resume containing:

- Contact information.
- A professional summary.
- Education.
- Experience.
- Projects and technology stacks.
- Technical skills.

The generation prompt emphasizes factual preservation, clear writing, stronger accomplishment statements, and ATS readability.

A target job description can be provided to guide the optimization toward relevant requirements without adding unsupported claims.

The resulting structured resume can then be rendered as a downloadable PDF through the resume PDF generation service.

**The distinction matters:** the optimization workflow provides feedback on the existing resume, while the optimized-resume workflow generates a revised resume artifact.

### 📊 5. Job Application Dashboard & Analytics

The dashboard brings job-search activity into a consolidated view.

It includes application-oriented metrics and breakdowns such as:

- Application totals and summary statistics.
- Application status distributions.
- Application sources.
- Monthly application trends.
- Company-level breakdowns.
- Recent application activity.
- Application-to-outcome metrics exposed by the analytics backend.

The application tracker also supports searching, filtering, sorting, and paginating records.

The dashboard is backed by API and database queries rather than relying solely on hardcoded frontend statistics.

### 🎯 6. Job Opportunity Management

Manage job opportunities independently from submitted applications.

Each opportunity can retain information such as:

- Job title and company.
- Location and employment type.
- Source and application URL.
- Salary information.
- Opportunity status.
- Application date and deadline.
- Notes.
- Job description and structured requirements.

The opportunity management interface supports creating, viewing, editing, and deleting records.

Opportunities can move through statuses such as `WISHLIST`, `APPLIED`, `ONLINE_ASSESSMENT`, `INTERVIEW`, `OFFER`, `REJECTED`, and `WITHDRAWN`.

This separates jobs worth pursuing from applications already in progress.

### 📝 7. Job Description Parsing

JobAtlasAI includes a local, rule-based job-description parser.

Rather than using Gemini for every parsing request, this service extracts structured fields from the supplied description, including:

- Required skills.
- Preferred skills.
- Responsibilities.
- Qualifications.
- Experience requirements.
- Education requirements.

Parsed information can be saved to an opportunity and used by the matching and skill-gap workflows.

The local parser and Gemini services serve different purposes: the parser extracts structured job information, while the generative AI workflows reason over resume and job-description content.

### 🧠 8. Resume Skills Profile

Skills extracted during resume analysis are persisted and exposed through the resume API.

The skills profile uses this information to help users understand their existing capabilities and compare them against the skills requested by job opportunities.

It supports the broader skill-intelligence workflow, including viewing extracted skills and identifying missing or underrepresented requirements.

### 🔍 9. Deterministic Skill Matching & Skill-Gap Analysis

Alongside Gemini-based analysis, JobAtlasAI implements a separate local skill-matching engine.

The opportunity skill-matching service compares:

- Skills extracted from a resume.
- Required skills associated with an opportunity.
- Preferred skills associated with an opportunity.

It returns matching and missing-skill information and supports opportunity-specific skill-gap analysis.

The skill-gap service also provides a broader view of the skills that may need attention across opportunities.

This hybrid approach combines generative AI for contextual analysis with structured, deterministic logic for explicit skill comparisons.

**Gemini analysis and local skill matching are complementary features, not the same engine.**

### 🔄 10. Application & Opportunity Synchronization

JobAtlasAI links an application to the opportunity it represents.

When a linked application is created or updated, the backend can synchronize the opportunity's status automatically.

| Application status | Opportunity status |
|---|---|
| `Applied` | `APPLIED` |
| `Interview` | `INTERVIEW` |
| `HR` | `INTERVIEW` |
| `Offer` | `OFFER` |
| `Rejected` | `REJECTED` |
| `Ghosted` | `REJECTED` |
| `Withdrawn` | `WITHDRAWN` |

When an application is created with the status `Applied`, the opportunity is updated to `APPLIED`, its applied date is synchronized, and the linked application ID becomes available in the opportunity response.

The interface also recognizes existing applications and allows users to open and edit them instead of creating another application for the same opportunity.

**Verified:** Application creation, linking, `Applied` synchronization, `Interview` synchronization, and the linked application ID were tested against the local PostgreSQL-backed API. Temporary test records were removed after validation.

### 🏢 11. Company & Application Organization

Company records are associated with opportunities, while applications retain company and role details.

This provides a foundation for richer company-level intelligence, including application history, recurring skill requirements, and future hiring insights.

---

## 🧠 Gemini AI Integration

Google Gemini is a central part of JobAtlasAI's resume intelligence layer.

### How it works

The backend uses Google's `google-genai` SDK and reads the API key from application configuration.

The AI services build prompts from extracted resume text and, when relevant, a target job description. Gemini generates a structured response, which the service parses and validates against the corresponding Pydantic schema.

```mermaid
flowchart TD
    A[Resume PDF] --> B[PDF Text Extraction]
    B --> C[Resume Text]
    C --> D[Gemini AI Service]
    J[Optional Job Description] --> D
    D --> E[Structured AI Response]
    E --> F[Pydantic Validation]
    F --> G[Resume Analysis or Match]
    F --> H[Resume Optimization]
    F --> I[Optimized Resume Generation]
    I --> K[PDF Export]
```

### AI services

| Service | Purpose |
|---|---|
| `AIResumeService` | Extract structured resume information and generate an AI-based resume assessment |
| `JobMatchService` | Compare a resume against a job description and generate match insights and interview questions |
| `AIResumeOptimizerService` | Identify resume weaknesses and return targeted improvement recommendations |
| `AIOptimizedResumeService` | Generate a structured, optimized version of the resume |

The repository's current AI services specify the model identifier `gemini-3.6-flash`. Model availability and API access depend on the Google AI account and its current supported models.

### Configuration

Set `GEMINI_API_KEY` in the backend environment configuration. Never expose the key in frontend code or commit it to version control.

AI requests may fail because of quota limits, rate limits, unavailable models, malformed responses, or temporary service errors. Some services explicitly translate these failures into API error responses; error handling is not yet fully unified across every AI workflow.

---

## 🏗️ Architecture

JobAtlasAI uses a React frontend, a FastAPI backend, and PostgreSQL for persistent application data.

```mermaid
flowchart TD
    U[User] --> FE[React + TypeScript Frontend]
    FE --> API[FastAPI REST API]

    API --> RES[Resume Services]
    API --> OPP[Opportunity Services]
    API --> APP[Application Services]
    API --> DASH[Dashboard & Analytics]

    RES --> PDF[PDF Text Extraction]
    RES --> GEM[Google Gemini API]
    RES --> SKILLS[Resume Skills]

    OPP --> PARSER[Local JD Parser]
    OPP --> MATCH[Local Skill Matching]
    OPP --> GAP[Skill-Gap Analysis]

    RES --> DB[(PostgreSQL)]
    OPP --> DB
    APP --> DB
    DASH --> DB
```

### Technology stack

| Layer | Technologies |
|---|---|
| Frontend framework | React 19, TypeScript |
| Build tooling | Vite |
| Styling | Tailwind CSS 4, shadcn/ui |
| Routing | React Router |
| Data fetching and caching | TanStack Query |
| HTTP client | Axios |
| Charts | Recharts |
| UI notifications | Sonner |
| Backend framework | Python, FastAPI |
| AI integration | Google Gemini API, `google-genai` |
| Request and response validation | Pydantic |
| ORM | SQLAlchemy 2 |
| Database | PostgreSQL |
| Migrations | Alembic |
| PDF text extraction | PyMuPDF |
| PDF generation | Custom resume PDF service |
| API documentation | FastAPI / Swagger UI |
| Version control | Git, GitHub |

### Backend architecture

The backend separates API routing, schemas, database models, repositories, and business services.

```text
backend/
├── alembic/
│   └── versions/
├── app/
│   ├── api/
│   │   ├── ai_matching.py
│   │   ├── companies.py
│   │   ├── dashboard.py
│   │   ├── job_application.py
│   │   ├── opportunities.py
│   │   ├── optimized_resume.py
│   │   ├── resume.py
│   │   ├── resume_optimizer.py
│   │   └── ...
│   ├── core/
│   │   └── config.py
│   ├── db/
│   ├── models/
│   ├── repositories/
│   ├── schemas/
│   ├── services/
│   │   ├── ai_resume_service.py
│   │   ├── ai_resume_optimizer_service.py
│   │   ├── ai_optimized_resume_service.py
│   │   ├── job_match_service.py
│   │   ├── job_description_parser.py
│   │   ├── skill_match_service.py
│   │   ├── skill_gap_service.py
│   │   └── ...
│   ├── main.py
│   └── ...
├── requirements.txt
└── .env
```

### Frontend architecture

```text
frontend/
├── src/
│   ├── components/
│   │   ├── applications/
│   │   ├── opportunities/
│   │   └── ...
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── ...
├── package.json
├── vite.config.ts
└── ...
```

These trees highlight important files and architectural areas rather than listing every file.

---

## 🔁 End-to-End Workflows

### Workflow A — Resume intelligence

1. Upload a resume PDF.
2. Extract its text using PyMuPDF.
3. Send the extracted text to the Gemini resume-analysis service.
4. Validate the structured response.
5. Persist the analysis and extracted skills.
6. Reuse the saved data in the skills profile and other analysis workflows.

### Workflow B — Job-specific matching

1. Upload a resume and provide a target job description.
2. Extract the resume text.
3. Send both inputs to Gemini through the AI matching endpoint.
4. Review match scores, missing skills, keyword matches, recommendations, and interview questions.

### Workflow C — Resume optimization

1. Select an analyzed resume.
2. Optionally provide a target job description.
3. Generate improvement recommendations or a complete optimized resume.
4. Review the structured output.
5. Generate a PDF from the optimized resume.

### Workflow D — Opportunity to application

1. Create an opportunity.
2. Parse its job description and inspect its skill requirements.
3. Compare the opportunity against a saved resume's extracted skills.
4. Create an application linked to the opportunity.
5. Track application status.
6. Synchronize application progress with the opportunity.
7. Review the resulting activity through the dashboard and analytics.

---

## 🔌 API Overview

The following routes are defined by the current backend. Request schemas and response formats are available through Swagger UI.

| Area | Endpoint | Purpose |
|---|---|---|
| Resume | `POST /resume/upload` | Upload and analyze a resume |
| Resume | `GET /resume/history` | Retrieve resume history |
| Resume | `GET /resume/{resume_id}` | Retrieve resume and analysis data |
| Resume | `GET /resume/{resume_id}/skills` | Retrieve extracted skills |
| Resume | `DELETE /resume/{resume_id}` | Delete a resume and its associated analysis |
| AI matching | `POST /ai-matching/match` | Match resume content against a job description using Gemini |
| Resume optimization | `POST /resume/{resume_id}/optimize` | Generate AI-driven resume improvement recommendations |
| Optimized resume | `POST /resume/{resume_id}/generate` | Generate an optimized resume |
| Optimized resume | `POST /resume/generate-pdf` | Generate a PDF from structured optimized-resume data |
| Opportunities | `POST /opportunities/parse-jd` | Parse a job description |
| Opportunities | `POST /opportunities` | Create an opportunity |
| Opportunities | `GET /opportunities` | List opportunities |
| Opportunities | `GET /opportunities/{opportunity_id}` | Retrieve an opportunity |
| Opportunities | `PATCH /opportunities/{opportunity_id}` | Update an opportunity |
| Opportunities | `GET /opportunities/{opportunity_id}/skill-match` | Compare opportunity requirements with resume skills |
| Opportunities | `GET /opportunities/skill-gaps` | Retrieve skill-gap information |
| Applications | `POST /applications` | Create an application |
| Applications | `GET /applications` | List applications |
| Applications | `GET /applications/{application_id}` | Retrieve an application |
| Applications | `PUT /applications/{application_id}` | Update an application |
| Applications | `DELETE /applications/{application_id}` | Delete an application |

The application also exposes company, dashboard, and analytics routes. The root API endpoint is `/`, and interactive API documentation is available at `/docs`.

---

## 🚀 Getting Started

### Prerequisites

- Git
- Python 3.10 or a compatible supported Python version
- Node.js and npm
- PostgreSQL
- A Google AI API key with access to the configured Gemini model

### 1. Clone the repository

```bash
git clone https://github.com/advaitsdev/jobatlas-ai.git
cd jobatlas-ai
```

### 2. Configure PostgreSQL

Create a PostgreSQL database for JobAtlasAI and note your local database credentials.

### 3. Set up the backend

From the repository root:

```powershell
cd backend

python -m venv .venv
.\.venv\Scripts\Activate.ps1

python -m pip install --upgrade pip
pip install -r requirements.txt
```

For macOS or Linux, activate the environment using:

```bash
source .venv/bin/activate
```

### 4. Configure environment variables

Create `backend/.env` with values appropriate for your local environment.

```dotenv
DATABASE_URL=postgresql+psycopg://USERNAME:PASSWORD@localhost:5432/jobatlasai
SECRET_KEY=replace_with_a_long_random_secret
GEMINI_API_KEY=your_google_gemini_api_key
DEBUG=True
ENVIRONMENT=development
```

Replace every placeholder with your own configuration. Confirm the database URL format against the current SQLAlchemy setup.

**Never commit `.env`, real API keys, or production secrets.**

### 5. Apply migrations

From the `backend` directory, with the virtual environment activated:

```powershell
alembic upgrade head
```

Make sure the configured database is correct before applying migrations.

### 6. Start the backend

```powershell
uvicorn app.main:app --reload
```

The backend should start at:

- API: `http://127.0.0.1:8000`
- Swagger documentation: `http://127.0.0.1:8000/docs`

### 7. Start the frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Vite typically serves the frontend at:

`http://localhost:5173`

Ensure the frontend API client points to the correct backend URL.

### 8. Available frontend checks

From `frontend/`:

```bash
npm run build
npm run lint
```

These scripts are defined in the current frontend `package.json`.

### First-run checklist

- [ ] PostgreSQL is running and the database exists.
- [ ] Backend dependencies are installed.
- [ ] `backend/.env` contains valid local settings.
- [ ] Database migrations have completed successfully.
- [ ] The Gemini API key is configured.
- [ ] The FastAPI server starts successfully.
- [ ] The frontend starts successfully.
- [ ] The dashboard and API endpoints can be accessed.

Some workflows require an existing uploaded resume, a completed resume analysis, or a job description.

---

## 🧪 Testing & Validation

Critical application/opportunity synchronization workflows have been manually tested through Swagger UI against the local PostgreSQL-backed API.

Verified scenarios include:

- Creating an application linked to an opportunity.
- Synchronizing `Applied` to `APPLIED`.
- Synchronizing `Interview` to `INTERVIEW`.
- Synchronizing the applied date during linked application creation.
- Returning the associated `application_id` in the opportunity response.
- Removing temporary records created for testing.

The AI workflows are implemented as separate services with structured Pydantic response schemas. The full backend still needs comprehensive automated test coverage for CRUD, upload validation, AI error handling, parsing, matching, analytics, and database integrity.

**Manual validation is not a substitute for a complete automated test suite.**

---

## 🔐 Security & Limitations

JobAtlasAI is an actively developed project, and several production-readiness improvements remain in progress.

Current hardening priorities include:

- Reconciling PostgreSQL constraints with SQLAlchemy models and migrations.
- Securing both resume upload paths with safe filenames, content validation, size limits, and path-traversal protection.
- Defining and consistently enforcing user ownership and access control.
- Consolidating database session and engine configuration.
- Adding automated backend tests and CI checks.
- Improving error handling across AI services.
- Strengthening deployment configuration and secret management.

Resume uploads and AI requests may involve sensitive personal information. Use only files and API credentials you are authorized to process, and avoid exposing personal data in logs or public test fixtures.

AI-generated scores and recommendations are estimates. They do not guarantee ATS compatibility, interviews, or job offers.

---

## 🗺️ Roadmap

### Implemented foundation

- [x] React and TypeScript frontend.
- [x] FastAPI REST backend.
- [x] PostgreSQL persistence and Alembic migrations.
- [x] Resume upload and PDF text extraction.
- [x] Gemini-powered structured resume analysis.
- [x] Gemini-powered resume-to-job matching.
- [x] Gemini-powered resume improvement recommendations.
- [x] Gemini-powered optimized resume generation.
- [x] Optimized resume PDF generation.
- [x] Local job-description parsing.
- [x] Resume skill extraction and skills profile.
- [x] Deterministic skill matching and skill-gap analysis.
- [x] Job application tracking and dashboard analytics.
- [x] Opportunity management.
- [x] Opportunity-to-application linking.
- [x] Application status synchronization.
- [x] Manual verification of critical synchronization workflows.

### Engineering hardening

- [ ] Reconcile `user_id` constraints, models, migrations, and request schemas.
- [ ] Secure both resume upload paths.
- [ ] Define the user ownership and access-control model.
- [ ] Consolidate database setup.
- [ ] Build an automated backend test suite.
- [ ] Standardize AI-service error handling.
- [ ] Improve frontend API configuration and error handling.
- [ ] Add CI checks for backend tests and frontend build/lint.
- [ ] Document architecture, configuration, and test procedures comprehensively.

### Future product direction

- [ ] Company intelligence and hiring insights.
- [ ] Personalized opportunity ranking and recommendations.
- [ ] Deeper job-specific resume tailoring.
- [ ] Broader career analytics.
- [ ] Browser-based job ingestion.
- [ ] Deployment and production operations.

---

## 💡 Engineering Principles

**Connected data, not disconnected tools.**  
Applications, opportunities, resumes, and job requirements share context across workflows.

**Hybrid intelligence.**  
Generative AI handles contextual analysis and writing, while deterministic services handle explicit skill comparisons and structured business logic.

**Structured AI outputs.**  
AI responses are parsed and validated against schemas before being consumed by downstream services.

**Truthful resume optimization.**  
The optimization prompts instruct the model not to invent achievements, skills, credentials, or metrics.

**Incremental development.**  
Features are built, tested, checkpointed in Git, and progressively hardened.

**Transparent limitations.**  
AI-generated scores and recommendations support decision-making; they are not guarantees of employment outcomes.

---

## 👨‍💻 About JobAtlasAI

JobAtlasAI is an independent full-stack engineering project exploring the intersection of generative AI, career intelligence, data modelling, and application lifecycle management.

It brings together:

- Full-stack application development.
- REST API design and service-layer architecture.
- Relational database design and migrations.
- Gemini API integration and structured generative AI.
- PDF processing and resume data extraction.
- Prompt design and Pydantic response validation.
- Resume-to-job matching and skill-gap analysis.
- Analytics-driven product design.
- Application/opportunity relationships and status synchronization.

The long-term vision is to build a unified platform that helps candidates **understand their fit for a role, improve how they present their experience, and manage the job search with greater clarity**.

---

## 📄 License

No license is documented here. Review the repository's licensing requirements before distributing or reusing the project.

---

<p align="center">
  <strong>Understand your fit. Improve your resume. Navigate your career with intelligence. 🚀</strong>
</p>
