from fastapi import APIRouter
from app.models.schemas import AnalyticsData
from app.services.demo_data_service import DemoDataService

router = APIRouter(prefix="/analytics", tags=["Spider-Sense Analytics"])

@router.get("", response_model=AnalyticsData)
async def get_analytics():
    return DemoDataService.get_demo_analytics()
