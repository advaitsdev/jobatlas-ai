from fastapi import FastAPI

from app.api.opportunities import router as opportunity_router

app = FastAPI(
    title="JobAtlas AI API",
    description="Backend API for JobAtlas AI",
    version="1.0.0",
)

app.include_router(opportunity_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to JobAtlas AI 🚀",
        "status": "running",
    }