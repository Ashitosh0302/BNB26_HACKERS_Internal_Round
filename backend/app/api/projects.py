from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import Project
from app.services.demo_data_service import DemoDataService
from datetime import datetime

router = APIRouter(prefix="/projects", tags=["Missions & Projects"])

# In-memory store initialized with demo project
_projects = [
    DemoDataService.get_demo_project(),
    Project(
        id="proj_agents_prod",
        title="Autonomous AI Agent Loops in Production",
        niche="AI Systems",
        description="Architecture guide to multi-agent communication, tool use failure states, and deterministic checkpointing.",
        thumbnail_url="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&fit=crop",
        duration_formatted="32:10",
        status="ready",
        analysis_progress=100,
        clips_count=8,
        repurposed_count=10,
        created_at=datetime(2026, 9, 20),
        updated_at=datetime(2026, 9, 25)
    ),
    Project(
        id="proj_local_llm",
        title="Running 70B Models Locally on Apple Silicon",
        niche="Hardware & AI",
        description="MLX and llama.cpp performance benchmarks, memory bandwidth optimization, and quantization tradeoffs.",
        thumbnail_url="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&fit=crop",
        duration_formatted="28:45",
        status="in_progress",
        analysis_progress=85,
        clips_count=6,
        repurposed_count=6,
        created_at=datetime(2026, 9, 28),
        updated_at=datetime(2026, 10, 2)
    )
]

@router.get("", response_model=List[Project])
async def list_projects():
    return _projects

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str):
    for p in _projects:
        if p.id == project_id:
            return p
    return _projects[0]

@router.post("", response_model=Project)
async def create_project(project_data: dict):
    new_proj = Project(
        id=f"proj_{datetime.now().strftime('%Y%m%d%H%M%S')}",
        title=project_data.get("title", "New Content Mission"),
        niche=project_data.get("niche", "AI & Technology"),
        description=project_data.get("description", "Mission created in Spider HQ"),
        thumbnail_url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop",
        duration_formatted="00:00",
        status="analyzing",
        analysis_progress=10,
        clips_count=0,
        repurposed_count=0,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    _projects.insert(0, new_proj)
    return new_proj
