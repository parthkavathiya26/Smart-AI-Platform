from fastapi import FastAPI
from backend.api import chatbot  # ye import ho

app = FastAPI(title="Smart AI Platform")

app.include_router(chatbot.router, prefix="/chatbot")  # router include

@app.get("/")
def home():
    return {"status": "Smart AI Platform running"}
