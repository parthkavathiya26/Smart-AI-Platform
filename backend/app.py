from fastapi import FastAPI
from backend.api import chatbot

app = FastAPI()

app.include_router(chatbot.router, prefix="/chatbot")

@app.get("/")
def home():
    return {"status": "Smart AI Platform running"}

