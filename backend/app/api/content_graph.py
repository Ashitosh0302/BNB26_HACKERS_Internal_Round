from fastapi import APIRouter
from app.models.schemas import ContentGraph, SpiderSenseNotification
from app.services.demo_data_service import DemoDataService
from typing import List

router = APIRouter(prefix="", tags=["Content Graph & Notifications"])

@router.get("/projects/{project_id}/content-graph", response_model=ContentGraph)
async def get_content_graph(project_id: str):
    return DemoDataService.get_demo_content_graph()

@router.get("/notifications", response_model=List[SpiderSenseNotification])
async def get_notifications():
    return DemoDataService.get_demo_notifications()
