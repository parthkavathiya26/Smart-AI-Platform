from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import chatbot, recommendation, prediction

app = FastAPI(title="Smart AI Platform")

# =========================
# CORS setup
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# API Routers
# =========================
app.include_router(chatbot.router, prefix="/chatbot")
app.include_router(recommendation.router, prefix="/recommendation")
app.include_router(prediction.router, prefix="/prediction")

# =========================
# Root Endpoint
# =========================
@app.get("/")
def home():
    return {"status": "Smart AI Platform running"}
