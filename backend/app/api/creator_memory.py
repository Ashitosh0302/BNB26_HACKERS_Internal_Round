from fastapi import APIRouter
from app.models.schemas import CreatorMemory
from app.services.demo_data_service import DemoDataService

router = APIRouter(prefix="/creator-memory", tags=["Creator DNA"])

_memory = DemoDataService.get_demo_creator_memory()

@router.get("", response_model=CreatorMemory)
async def get_creator_memory():
    return _memory

@router.put("", response_model=CreatorMemory)
async def update_creator_memory(updated: CreatorMemory):
    global _memory
    _memory = updated
    return _memory
