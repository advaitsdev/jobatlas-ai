from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.opportunities import router as opportunity_router

app = FastAPI(
    title="JobAtlas AI API",
    description="Backend API for JobAtlas AI",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(opportunity_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to JobAtlas AI 🚀",
        "status": "running",
    }