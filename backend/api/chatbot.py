from fastapi import APIRouter
from pydantic import BaseModel
from ml.chatbot.response_engine import get_response

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):
    reply = get_response(request.message)
    return {"response": reply}
