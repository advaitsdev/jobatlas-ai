# JobAtlas AI - Architecture

## Vision

JobAtlas AI is an AI-powered Career Operating System that helps users manage their entire job search from one platform.

Instead of only tracking applications, JobAtlas AI provides:

- Application Tracking
- Resume Management
- AI Resume Parsing
- AI Job Description Parsing
- Semantic Skill Matching
- Analytics
- Google Sheets Synchronization
- Chrome Extension
- AI Career Insights

---

## Technology Stack

Frontend
- React
- TypeScript
- Vite
- TailwindCSS v4
- shadcn/ui
- React Router
- TanStack Query

Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic

AI
- OpenAI API
- Sentence Transformers
- pgvector

Extension
- Chrome Extension (Manifest V3)

Deployment
- Vercel
- Railway
- Docker

---

## System Architecture

Chrome Extension
        │
        ▼
Backend API
        │
 ┌──────┼──────────┐
 ▼      ▼          ▼
 Resume JD      Analytics
 Parser Parser
        │
        ▼
 AI Matching Engine
        │
        ▼
 PostgreSQL
        │
        ▼
 React Dashboard