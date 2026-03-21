from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client["ai_ads"]

users_collection = db["users"]
ads_collection = db["ads"]