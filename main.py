from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.ads import router as ads_router


app = FastAPI(
    title="AI Ad Generator API",
    version="1.0.0"
)

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "https://ai-ad-generator-inky.vercel.app"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include route modules
app.include_router(auth_router)
app.include_router(ads_router)


@app.get("/")
def home():
    return {"message": "AI Ad Generator API running"}