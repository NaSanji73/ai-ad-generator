import os
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise Exception("MONGO_URI is not set")

client = MongoClient(MONGO_URI)

db = client["ai_ads"]

users_collection = db["users"]
ads_collection = db["ads"]