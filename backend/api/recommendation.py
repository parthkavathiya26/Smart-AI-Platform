from fastapi import APIRouter
from backend.services.recommendation_service import get_recommendation

router = APIRouter()

@router.get("/")
def test_recommendation():
    return {"message": "Recommendation API running"}

@router.post("/recommend")
def recommend_item(user_id: int):
    # example function call
    recommended_items = get_recommendation(user_id)
    return {"user_id": user_id, "recommendations": recommended_items}
