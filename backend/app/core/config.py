import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    PROJECT_NAME: str = "CreatorAi - Spider-Themed Creator Operating Platform"
    TAGLINE: str = "Your Content. Your Story. Your Spider-Sense."
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    JWT_SECRET: str = os.getenv("JWT_SECRET", "spider-sense-secret-super-key-99887722")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./creatorai.db")
    STORAGE_PROVIDER: str = os.getenv("STORAGE_PROVIDER", "local")
    
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "*"
    ]

settings = Settings()
