from pathlib import Path
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# =====================================
# BASE DIRECTORY (SmartAIPlatform)
# =====================================
BASE_DIR = Path(__file__).resolve().parents[2]

DATA_DIR = BASE_DIR / "data" / "recommendation" / "raw"

MOVIES_CSV = DATA_DIR / "movies.csv"
TAGS_CSV = DATA_DIR / "tags.csv"

# =====================================
# LOAD DATA
# =====================================
movies = pd.read_csv(MOVIES_CSV)
tags = pd.read_csv(TAGS_CSV)

# =====================================
# MERGE TAGS WITH MOVIES
# =====================================
movie_tags = (
    tags.groupby("movieId")["tag"]
    .apply(lambda x: " ".join(x.astype(str)))
    .reset_index()
)

movies = movies.merge(movie_tags, on="movieId", how="left")
movies["tag"] = movies["tag"].fillna("")

movies["content"] = movies["genres"] + " " + movies["tag"]

# =====================================
# TF-IDF + COSINE SIMILARITY
# =====================================
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(movies["content"])
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# =====================================
# RECENT SEARCH MEMORY
# =====================================
recent_searches = []

# =====================================
# MAIN FUNCTION
# =====================================
def get_recommendation(query: str):
    query = query.strip()

    if query == "":
        return {"recommended": [], "recent_searches": recent_searches}

    if query not in recent_searches:
        recent_searches.insert(0, query)

    if len(recent_searches) > 5:
        recent_searches.pop()

    if query not in movies["title"].values:
        return {
            "recommended": [],
            "recent_searches": recent_searches,
            "error": "Movie not found"
        }

    idx = movies[movies["title"] == query].index[0]

    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:6]

    recommended = [movies.iloc[i[0]]["title"] for i in sim_scores]

    return {
        "recommended": recommended,
        "recent_searches": recent_searches
    }
