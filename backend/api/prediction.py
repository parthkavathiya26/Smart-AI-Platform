from fastapi import APIRouter
from backend.services.prediction_service import predict_sales

router = APIRouter()

@router.get("/")
def test_prediction():
    return {"message": "Prediction API running"}

@router.post("/predict")
def predict(data: dict):
    result = predict_sales(data)
    return {"prediction": result}
