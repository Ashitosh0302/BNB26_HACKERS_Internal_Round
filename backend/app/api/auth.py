from fastapi import APIRouter, HTTPException, status
from app.models.schemas import UserLogin, UserCreate, Token, User
from app.services.demo_data_service import DemoDataService

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    user = DemoDataService.get_demo_user()
    return Token(
        access_token="spider-jwt-token-alex-carter-demo-prod",
        token_type="bearer",
        user=user
    )

@router.post("/signup", response_model=Token)
async def signup(user_data: UserCreate):
    from datetime import datetime
    user = User(
        id=f"usr_{user_data.name.lower().replace(' ', '_')}",
        email=user_data.email,
        name=user_data.name,
        niche=user_data.niche or "Tech & AI",
        preferred_platforms=user_data.preferred_platforms or ["YouTube", "LinkedIn"],
        created_at=datetime.now()
    )
    return Token(
        access_token="spider-jwt-token-new-user",
        token_type="bearer",
        user=user
    )

@router.get("/me", response_model=User)
async def get_current_user():
    return DemoDataService.get_demo_user()
