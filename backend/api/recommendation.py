from fastapi import APIRouter
from backend.services.recommendation_service import get_recommendation

router = APIRouter()

@router.get("/")
def test_recommendation():
    return {"message": "Recommendation API running"}

@router.post("/recommend")
def recommend_item(data: dict):
    query = data.get("query", "")

    # abhi simple recommendation logic
    recommendations = get_recommendation(query)

    return {
        "query": query,
        "recommendations": recommendations
    }
