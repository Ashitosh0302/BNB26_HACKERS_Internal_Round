from fastapi import APIRouter
from app.models.schemas import Recording
from app.services.demo_data_service import DemoDataService

router = APIRouter(prefix="/projects/{project_id}/recordings", tags=["Recordings & Uploads"])

_recording = DemoDataService.get_demo_recording()

@router.get("", response_model=Recording)
async def get_project_recording(project_id: str):
    return _recording

@router.post("/upload")
async def upload_recording(project_id: str):
    return {
        "status": "success",
        "message": "Recording uploaded into the Web. Triggered multi-modal pipeline.",
        "recording_id": _recording.id,
        "stages": [
            "Uploading",
            "Audio extraction",
            "Transcription",
            "Scene detection",
            "Visual analysis",
            "Script alignment",
            "Clip discovery"
        ]
    }

@router.get("/scenes")
async def get_recording_scenes(project_id: str):
    from app.models.schemas import Scene
    return [
        Scene(
            id="sc_01",
            scene_number=1,
            start=0.0,
            end=42.0,
            duration=42.0,
            description="Talking head: Alex Carter introduces the core premise and hook.",
            visual_tags=["speaker", "talking_head", "direct_eye_contact"],
            energy_score=94.5
        ),
        Scene(
            id="sc_02",
            scene_number=2,
            start=42.0,
            end=125.0,
            duration=83.0,
            description="Screen Share: 3D vector embedding cluster animation and cosine distance formula.",
            visual_tags=["diagram", "whiteboard", "vector_space"],
            energy_score=88.2
        ),
        Scene(
            id="sc_03",
            scene_number=3,
            start=125.0,
            end=280.0,
            duration=155.0,
            description="Live coding session: Python LangChain ParentDocumentRetriever implementation.",
            visual_tags=["terminal", "vscode", "python", "code"],
            energy_score=92.0
        ),
        Scene(
            id="sc_04",
            scene_number=4,
            start=280.0,
            end=410.0,
            duration=130.0,
            description="Terminal output: Latency benchmarks showing p99 dropping from 240ms to 14ms.",
            visual_tags=["benchmark", "metrics", "terminal"],
            energy_score=96.1
        )
    ]
