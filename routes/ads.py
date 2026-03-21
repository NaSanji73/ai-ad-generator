from fastapi import APIRouter
from database import ads_collection
from services.ai_generator import generate_ad
from services.image_generator import generate_image
import base64

router = APIRouter()


# ✅ SAVE AD
@router.post("/save-ad")
def save_ad(ad: dict):

    result = ads_collection.insert_one(ad)

    return {
        "message": "Ad saved successfully",
        "id": str(result.inserted_id)
    }


# ✅ GET ALL ADS
@router.get("/ads")
def get_ads():

    ads = []

    for ad in ads_collection.find():
        ad["_id"] = str(ad["_id"])
        ads.append(ad)

    return ads 

# ✅ GENERATE AD + IMAGE
@router.post("/generate-ad")
def generate_ad_api(prompt: dict):

    # Generate ad text (existing logic)
    ad = generate_ad(prompt["prompt"])

    image_base64 = None
    image_bytes = None

    # 🔥 Generate image using headline
    if ad and "headline" in ad:
        image_bytes = generate_image(ad["headline"])

    if image_bytes:
        import base64
        image_base64 = base64.b64encode(image_bytes).decode("utf-8")

    return {
        "ad": ad,
        "image": image_base64
    }