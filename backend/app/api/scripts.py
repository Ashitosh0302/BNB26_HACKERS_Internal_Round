from fastapi import APIRouter
from app.models.schemas import Script, ScriptSection
from app.services.demo_data_service import DemoDataService
from app.agents.creator_agents import ScriptAgent

router = APIRouter(prefix="/projects/{project_id}/scripts", tags=["Scripts"])

_script = DemoDataService.get_demo_script()

@router.get("", response_model=Script)
async def get_project_script(project_id: str):
    return _script

@router.post("/analyze-hook")
async def analyze_hook(data: dict):
    hook_text = data.get("hook_text", "")
    return await ScriptAgent.analyze_hook(hook_text)

@router.post("/generate-hooks")
async def generate_hooks(data: dict):
    topic = data.get("topic", "RAG Systems")
    from app.ai.mock_providers import SpiderSenseMockLLM
    llm = SpiderSenseMockLLM()
    hooks = await llm.generate_hooks(topic=topic, count=5)
    return {"hooks": hooks}

@router.put("/sections/{section_id}")
async def update_script_section(project_id: str, section_id: str, data: dict):
    for sec in _script.sections:
        if sec.id == section_id:
            if "content" in data:
                sec.content = data["content"]
            if "title" in data:
                sec.title = data["title"]
            return sec
    return _script.sections[0]
