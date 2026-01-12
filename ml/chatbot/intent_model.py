import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression

# Load processed data
df = pd.read_csv("data/chatbot/processed/chatbot_cleaned.csv")

X = df['pattern']
y = df['intent']

# Encode intent labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Text vectorization
vectorizer = TfidfVectorizer()
X_vec = vectorizer.fit_transform(X)

# Train model
model = LogisticRegression()
model.fit(X_vec, y_encoded)

# Save model & encoders
with open("models/chatbot/intent_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("models/chatbot/label_encoder.pkl", "wb") as f:
    pickle.dump(label_encoder, f)

with open("models/chatbot/vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("✅ Chatbot model trained & saved")
