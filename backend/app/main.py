import logging
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# Import API routers
from app.api.auth import router as auth_router
from app.api.projects import router as projects_router
from app.api.scripts import router as scripts_router
from app.api.recordings import router as recordings_router
from app.api.alignment import router as alignment_router
from app.api.clips import router as clips_router
from app.api.editor import router as editor_router
from app.api.repurpose import router as repurpose_router
from app.api.assets import router as assets_router
from app.api.analytics import router as analytics_router
from app.api.creator_memory import router as creator_memory_router
from app.api.content_graph import router as content_graph_router

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("creatorai")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Your Content. Your Story. Your Spider-Sense. AI-powered creator operating platform.",
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers under /api
api_prefix = settings.API_V1_STR
app.include_router(auth_router, prefix=api_prefix)
app.include_router(projects_router, prefix=api_prefix)
app.include_router(scripts_router, prefix=api_prefix)
app.include_router(recordings_router, prefix=api_prefix)
app.include_router(alignment_router, prefix=api_prefix)
app.include_router(clips_router, prefix=api_prefix)
app.include_router(editor_router, prefix=api_prefix)
app.include_router(repurpose_router, prefix=api_prefix)
app.include_router(assets_router, prefix=api_prefix)
app.include_router(analytics_router, prefix=api_prefix)
app.include_router(creator_memory_router, prefix=api_prefix)
app.include_router(content_graph_router, prefix=api_prefix)

@app.get("/")
async def root():
    return {
        "app": settings.PROJECT_NAME,
        "tagline": settings.TAGLINE,
        "version": settings.VERSION,
        "status": "operational",
        "docs": "/docs",
        "spider_sense": "ACTIVE 🕷⚡"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "CreatorAi Backend Core"}

# WebSocket for real-time Spider-Sense updates
@app.websocket("/ws/spider-sense")
async def websocket_spider_sense(websocket: WebSocket):
    await websocket.accept()
    logger.info("Client connected to Spider-Sense WebSocket")
    try:
        while True:
            data = await websocket.receive_text()
            # Echo or stream real-time events
            await websocket.send_json({
                "event": "spider_sense_pulse",
                "status": "synchronized",
                "message": f"Processed: {data[:50]}"
            })
    except WebSocketDisconnect:
        logger.info("Client disconnected from Spider-Sense WebSocket")
