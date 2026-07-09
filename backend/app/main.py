from fastapi import FastAPI

app = FastAPI(
    title="JobAtlas AI API",
    description="Backend API for JobAtlas AI",
    version="1.0.0",
)

@app.get("/")
def root():
    return {
        "message": "Welcome to JobAtlas AI 🚀",
        "status": "running"
    }