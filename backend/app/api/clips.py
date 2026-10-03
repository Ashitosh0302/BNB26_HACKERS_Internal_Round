from fastapi import APIRouter
from typing import List
from app.models.schemas import ClipCandidate
from app.agents.creator_agents import ClipDiscoveryAgent, QualityAgent

router = APIRouter(prefix="/projects/{project_id}/clips", tags=["Clip Discovery & Candidates"])

@router.get("", response_model=List[ClipCandidate])
async def list_clips(project_id: str):
    return await ClipDiscoveryAgent.discover_candidates(recording_id="rec_rag_01")

@router.post("/scan")
async def scan_clips(project_id: str):
    clips = await ClipDiscoveryAgent.discover_candidates(recording_id="rec_rag_01")
    return {
        "status": "success",
        "message": f"Spider-Sense scanned 45:12 footage and identified {len(clips)} high-value clip candidates.",
        "candidates": clips
    }

@router.get("/{clip_id}/quality-check")
async def check_clip_quality(project_id: str, clip_id: str):
    clips = await ClipDiscoveryAgent.discover_candidates(recording_id="rec_rag_01")
    target = next((c for c in clips if c.id == clip_id), clips[0])
    return QualityAgent.validate_clip_candidate(target)
