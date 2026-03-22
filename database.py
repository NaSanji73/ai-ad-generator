import os
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["ai_ads"]

users_collection = db["users"]
ads_collection = db["ads"]