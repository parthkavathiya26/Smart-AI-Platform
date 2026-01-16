from fastapi import APIRouter
from backend.services.recommendation_service import get_recommendation

router = APIRouter()

@router.get("/")
def test():
    return {"status": "Recommendation API working"}

@router.post("/recommend")
def recommend(data: dict):
    query = data.get("query", "")
    return get_recommendation(query)
