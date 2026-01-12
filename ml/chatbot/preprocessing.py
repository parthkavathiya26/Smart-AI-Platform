import pandas as pd
import re

# Load raw data
df = pd.read_csv("data/chatbot/raw/intents.csv")

# Lowercase
df['pattern'] = df['pattern'].str.lower()

# Remove special characters
df['pattern'] = df['pattern'].apply(
    lambda x: re.sub(r'[^a-zA-Z0-9\s]', '', x)
)

# Remove extra spaces
df['pattern'] = df['pattern'].str.strip()

# Save cleaned data
df.to_csv("data/chatbot/processed/chatbot_cleaned.csv", index=False)

print("✅ Chatbot data cleaned & saved")
