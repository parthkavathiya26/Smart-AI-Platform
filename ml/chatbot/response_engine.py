import pandas as pd
import pickle

# Load resources
model = pickle.load(open("models/chatbot/intent_model.pkl", "rb"))
label_encoder = pickle.load(open("models/chatbot/label_encoder.pkl", "rb"))
vectorizer = pickle.load(open("models/chatbot/vectorizer.pkl", "rb"))

df = pd.read_csv("data/chatbot/processed/chatbot_cleaned.csv")

def get_response(user_input):
    user_input = user_input.lower()
    X = vectorizer.transform([user_input])
    intent_id = model.predict(X)[0]
    intent = label_encoder.inverse_transform([intent_id])[0]

    responses = df[df['intent'] == intent]['response'].tolist()
    return responses[0] if responses else "Sorry, I didn't understand."
