import joblib
import numpy as np
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
model = joblib.load(BASE_DIR / "models" / "prediction" / "sales_model.pkl")

def predict_sales(data: dict):
    tv = data["tv"]
    radio = data["radio"]
    newspaper = data["newspaper"]

    X = np.array([[tv, radio, newspaper]])
    prediction = model.predict(X)[0]

    return round(float(prediction), 2)
