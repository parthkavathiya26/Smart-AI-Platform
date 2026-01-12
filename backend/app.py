from backend.api import chatbot

app.include_router(chatbot.router, prefix="/chatbot")
