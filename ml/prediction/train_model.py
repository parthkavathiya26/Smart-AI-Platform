import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib
from pathlib import Path

# Base directory (Smart-AI-Platform)
BASE_DIR = Path(__file__).resolve().parents[2]

# Correct CSV path
csv_path = BASE_DIR / "data" / "prediction" / "raw" / "sales.csv"

# Load data
df = pd.read_csv(csv_path)

# Features & target
X = df[["TV", "Radio", "Newspaper"]]
y = df["Sales"]

# Train model
model = LinearRegression()
model.fit(X, y)

# Save model
model_path = BASE_DIR / "models" / "prediction" / "sales_model.pkl"
joblib.dump(model, model_path)

print("✅ Prediction model trained successfully")
print("📁 Model saved at:", model_path)
