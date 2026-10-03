from fastapi import APIRouter
from typing import List, Optional
from app.models.schemas import Asset
from app.services.demo_data_service import DemoDataService

router = APIRouter(prefix="/assets", tags=["Web Vault & Assets"])

_assets = DemoDataService.get_demo_assets()

@router.get("", response_model=List[Asset])
async def list_assets(category: Optional[str] = None):
    if category and category != "all":
        return [a for a in _assets if a.category.lower() == category.lower()]
    return _assets

@router.post("/search")
async def semantic_search_assets(data: dict):
    query = data.get("query", "").lower()
    results = []
    for a in _assets:
        score = 0
        if any(tag in query for tag in a.tags):
            score += 40
        if query in a.title.lower() or query in a.embedding_summary.lower():
            score += 50
        results.append({
            "asset": a,
            "relevance_score": min(98, score + 45) if score > 0 else 60
        })
    results.sort(key=lambda x: x["relevance_score"], reverse=True)
    return results
