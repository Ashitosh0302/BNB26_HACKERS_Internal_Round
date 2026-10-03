from fastapi import APIRouter
from typing import List
from app.models.schemas import RepurposedContentItem
from app.agents.creator_agents import RepurposeAgent

router = APIRouter(prefix="/projects/{project_id}/repurpose", tags=["Multi-Platform Repurposing"])

@router.get("", response_model=List[RepurposedContentItem])
async def get_repurposed_pack(project_id: str):
    return RepurposeAgent.generate_multiplatform_pack(project_id=project_id, clip_id="clip_001")

@router.post("/generate")
async def generate_repurposed_pack(project_id: str, data: dict):
    clip_id = data.get("clip_id", "clip_001")
    items = RepurposeAgent.generate_multiplatform_pack(project_id=project_id, clip_id=clip_id)
    return {
        "status": "success",
        "generated_count": len(items),
        "platforms": ["YouTube Shorts", "Instagram Reels", "TikTok", "LinkedIn", "X Thread"],
        "items": items
    }
