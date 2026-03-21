from pydantic import BaseModel

class User(BaseModel):
    email: str
    password: str


class Ad(BaseModel):
    title: str
    caption: str
    hashtags: str
    script: str