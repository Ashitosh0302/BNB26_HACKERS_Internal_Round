# CreatorAi REST & WebSocket API Reference

Base URL: `http://localhost:8000/api`

---

## Authentication
- `POST /auth/login` - Authenticate creator and receive JWT token.
- `POST /auth/signup` - Register new creator profile and bootstrap Creator DNA.
- `GET /auth/me` - Retrieve authenticated creator profile.

---

## Missions & Projects
- `GET /projects` - List all creator missions.
- `GET /projects/{id}` - Retrieve mission details by ID.
- `POST /projects` - Initialize new content mission.

---

## Script Studio
- `GET /projects/{id}/scripts` - Retrieve structured script sections.
- `POST /projects/{id}/scripts/analyze-hook` - Run Spider-Sense curiosity gap scoring on hook.
- `POST /projects/{id}/scripts/generate-hooks` - Generate high-converting hook variations.
- `PUT /projects/{id}/scripts/sections/{sec_id}` - Update script paragraph content.

---

## Recordings & Alignment
- `GET /projects/{id}/recordings` - Get master recording metadata.
- `POST /projects/{id}/recordings/upload` - Trigger multi-stage ingestion pipeline.
- `GET /projects/{id}/recordings/scenes` - Retrieve optical scene detections.
- `GET /projects/{id}/alignment` - Fetch Script ↔ Footage alignment matches with confidence breakdown.

---

## Web Studio & Clips
- `GET /projects/{id}/clips` - List discovered clip candidates with 6-metric scores.
- `POST /projects/{id}/clips/scan` - Trigger Spider-Sense autonomous footage scan.
- `GET /projects/{id}/editor/plan` - Retrieve non-destructive `edit_plan.json`.
- `POST /projects/{id}/editor/plan/ai-copilot` - Submit natural language request to AI editor copilot.
- `PUT /projects/{id}/editor/plan` - Save creator adjustments and increment version history.
- `POST /projects/{id}/editor/plan/render` - Render final video.

---

## Repurposing & Vault
- `GET /projects/{id}/repurpose` - Get 5-platform adapted content pack.
- `GET /assets` - Browse visual media vault.
- `POST /assets/search` - Natural language semantic search across embeddings.

---

## WebSockets
- `WS /ws/spider-sense` - Real-time stream for opportunity alerts and processing pulses.
