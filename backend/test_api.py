import sys
from fastapi.testclient import TestClient
from app.main import app

# Ensure utf-8 output
sys.stdout.reconfigure(encoding='utf-8')

client = TestClient(app)

endpoints = [
    ("GET", "/"),
    ("GET", "/health"),
    ("POST", "/api/auth/login", {"email": "alex@creatorai.com", "password": "password123"}),
    ("POST", "/api/auth/signup", {"name": "Peter Parker", "email": "peter@bugle.com", "password": "pass"}),
    ("GET", "/api/auth/me"),
    ("GET", "/api/projects"),
    ("GET", "/api/projects/proj_001"),
    ("POST", "/api/projects", {"title": "Test Mission", "niche": "Tech", "description": "Test"}),
    ("GET", "/api/projects/proj_001/scripts"),
    ("POST", "/api/projects/proj_001/scripts/analyze-hook", {"hook_text": "Stop using LangChain blindly. Here is why."}),
    ("POST", "/api/projects/proj_001/scripts/generate-hooks", {"topic": "AI Agents"}),
    ("PUT", "/api/projects/proj_001/scripts/sections/sec_01", {"content": "Updated hook content"}),
    ("GET", "/api/projects/proj_001/recordings"),
    ("POST", "/api/projects/proj_001/recordings/upload", None),
    ("GET", "/api/projects/proj_001/recordings/scenes"),
    ("GET", "/api/projects/proj_001/alignment"),
    ("POST", "/api/projects/proj_001/alignment/realign", None),
    ("GET", "/api/projects/proj_001/clips"),
    ("POST", "/api/projects/proj_001/clips/scan", None),
    ("GET", "/api/projects/proj_001/clips/clip_001/quality-check"),
    ("GET", "/api/projects/proj_001/editor/plan?clip_id=clip_001"),
    ("POST", "/api/projects/proj_001/editor/plan/ai-copilot", {"prompt": "Tighten pacing"}),
    ("POST", "/api/projects/proj_001/editor/plan/render", {"clip_id": "clip_001"}),
    ("GET", "/api/projects/proj_001/repurpose"),
    ("POST", "/api/projects/proj_001/repurpose/generate", {"clip_id": "clip_001"}),
    ("GET", "/api/assets"),
    ("GET", "/api/assets?category=video"),
    ("POST", "/api/assets/search", {"query": "vector database"}),
    ("GET", "/api/analytics"),
    ("GET", "/api/creator-memory"),
    ("GET", "/api/projects/proj_001/content-graph"),
    ("GET", "/api/notifications"),
]

passed = 0
failed = 0

for item in endpoints:
    method = item[0]
    path = item[1]
    payload = item[2] if len(item) > 2 else None
    
    try:
        if method == "GET":
            res = client.get(path)
        elif method == "POST":
            res = client.post(path, json=payload if payload else {})
        elif method == "PUT":
            res = client.put(path, json=payload if payload else {})
        
        if res.status_code in [200, 201]:
            print(f"✓ [{method}] {path} -> {res.status_code}")
            passed += 1
        else:
            print(f"✗ [{method}] {path} -> {res.status_code} FAIL: {res.text}")
            failed += 1
    except Exception as e:
        print(f"✗ [{method}] {path} -> EXCEPTION: {e}")
        failed += 1

print(f"\nResults: {passed} passed, {failed} failed out of {len(endpoints)} tested.")
if failed > 0:
    sys.exit(1)
