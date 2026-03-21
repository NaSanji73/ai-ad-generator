import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

system_prompt = """
You are a professional advertising strategist.

Return ONLY valid JSON:

{
 "headline": "",
 "ad_copy": "",
 "caption": "",
 "cta": "",
 "hashtags": ""
}
"""

def generate_ad(prompt):

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )

        content = response.choices[0].message.content.strip()

        # 🔥 Extract JSON safely
        start = content.find("{")
        end = content.rfind("}") + 1

        json_string = content[start:end]

        ad_data = json.loads(json_string)

        return {
            "headline": ad_data.get("headline", "No headline generated"),
            "ad_copy": ad_data.get("ad_copy", "No ad copy generated"),
            "caption": ad_data.get("caption", ""),
            "cta": ad_data.get("cta", ""),
            "hashtags": ad_data.get("hashtags", "")
        }

    except Exception as e:
        print("ERROR IN AI:", e)

        # ✅ ALWAYS return valid structure
        return {
            "headline": "Ad generation failed",
            "ad_copy": "Please try again",
            "caption": "",
            "cta": "",
            "hashtags": ""
        }