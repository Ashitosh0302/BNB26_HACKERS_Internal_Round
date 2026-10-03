from fastapi import APIRouter
from app.models.schemas import EditPlan
from app.agents.creator_agents import EditorAgent, ClipDiscoveryAgent
from datetime import datetime

router = APIRouter(prefix="/projects/{project_id}/editor", tags=["Web Studio & Edit Plans"])

# Cache of edit plans
_edit_plans = {}

@router.get("/plan", response_model=EditPlan)
async def get_edit_plan(project_id: str, clip_id: str = "clip_001"):
    if clip_id not in _edit_plans:
        clips = await ClipDiscoveryAgent.discover_candidates(recording_id="rec_rag_01")
        target = next((c for c in clips if c.id == clip_id), clips[0])
        _edit_plans[clip_id] = EditorAgent.generate_edit_plan(target)
    return _edit_plans[clip_id]

@router.post("/plan/ai-copilot")
async def run_ai_copilot(project_id: str, data: dict):
    prompt = data.get("prompt", "Make this more engaging")
    return {
        "suggestions": [
            {
                "id": "sug_01",
                "label": "Trim 1.8s dead air at start",
                "description": "Removes hesitation to hook viewer in under 2 seconds.",
                "type": "trim",
                "applied": False
            },
            {
                "id": "sug_02",
                "label": "Insert Vector Architecture Diagram B-Roll",
                "description": "Places visual asset at 00:08 when discussing high-dimensional embeddings.",
                "type": "b_roll",
                "applied": False
            },
            {
                "id": "sug_03",
                "label": "Add Spider Red Kinetic Word Highlights",
                "description": "Pops keywords 'Chunking', 'Vector DB', 'Hallucination' in #E5092F.",
                "type": "captions",
                "applied": False
            },
            {
                "id": "sug_04",
                "label": "Punch-in Zoom (1.18x) on Key Thesis",
                "description": "Reframes camera framing for emphasis.",
                "type": "zoom",
                "applied": False
            }
        ],
        "summary": "Spider-Sense generated 4 editable enhancements. Creator retains full timeline authority."
    }

@router.put("/plan", response_model=EditPlan)
async def save_edit_plan(project_id: str, plan: EditPlan):
    plan.version += 1
    plan.author = "Creator"
    plan.updated_at = datetime.now()
    plan.changelog = f"Manual adjustment by Creator: tracks updated (Version {plan.version})"
    _edit_plans[plan.clip_candidate_id or "clip_001"] = plan
    return plan

@router.post("/plan/render")
async def render_edit_plan(project_id: str, data: dict):
    return {
        "status": "rendering",
        "job_id": "job_render_web_studio_998",
        "target_format": "9:16 MP4",
        "estimated_seconds": 6,
        "download_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    }
