import requests
import os
from dotenv import load_dotenv

load_dotenv()

STABILITY_API_KEY = os.getenv("STABILITY_API_KEY")

def generate_image(prompt: str):
    try:
        response = requests.post(
            "https://api.stability.ai/v2beta/stable-image/generate/sd3",
            headers={
                "Authorization": f"Bearer {STABILITY_API_KEY}",
                "Accept": "image/*"
            },
            files={
                "prompt": (None, prompt),
                "output_format": (None, "png"),
                "width": (None, "512"),
                "height": (None, "512"),
                "steps": (None, "20")   # 🔥 important
            }
        )

        if response.status_code == 200:
            return response.content
        else:
            print("STABILITY ERROR:", response.text)
            return None

    except Exception as e:
        print("IMAGE ERROR:", e)
        return None