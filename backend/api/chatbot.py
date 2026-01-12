from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat_bot(req: ChatRequest):
    user_msg = req.message.lower()

    if "hello" in user_msg or "hi" in user_msg:
        reply = "Hello! 😊 How can I help you today?"

    elif "help" in user_msg:
        reply = "I can help you with Chatbot, Recommendation System, and Prediction."

    elif "recommend" in user_msg:
        reply = "Sure! Go to Recommendation section to get suggestions."

    elif "predict" in user_msg:
        reply = "Prediction module is ready. Please enter values."

    elif "bye" in user_msg:
        reply = "Goodbye! 👋 Have a great day."

    else:
        reply = "Sorry, I didn't understand that. Can you rephrase?"

    return {"response": reply}
