from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import chatbot, recommendation, prediction
from backend.api import recommendation, prediction

app = FastAPI(title="Smart AI Platform")

# CORS setup for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(chatbot.router, prefix="/chatbot")
app.include_router(recommendation.router, prefix="/recommendation")
app.include_router(prediction.router, prefix="/prediction")

@app.get("/")
def home():
    return {"status": "Smart AI Platform running"}
