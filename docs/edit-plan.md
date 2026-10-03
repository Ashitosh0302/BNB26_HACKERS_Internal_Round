# CreatorAi Edit Plan Schema Specification

## Schema Design: Non-Destructive Multimodal Video Editing

Traditional video generation tools output an immutable MP4 file. If the creator wants to tweak a 0.5-second breath pause or adjust a single word in a caption, they have to re-render the entire video or switch to another NLE (Premiere Pro, DaVinci Resolve).

CreatorAi solves this by decoupling **intent from rendering** through `edit_plan.json`.

---

## 1. Top-Level Schema

```json
{
  "$schema": "https://creatorai.studio/schemas/v1/edit-plan.json",
  "version": 1,
  "clip_candidate_id": "clip_001",
  "project_id": "proj_rag_master",
  "title": "AI Edit: The #1 Vector DB Mistake",
  "format": "9:16",
  "duration_sec": 42.0,
  "source_video_url": "https://vault.creatorai.studio/recordings/rag_4k.mp4",
  "source_start": 0.0,
  "source_end": 42.0,
  "author": "Spider-Sense AI",
  "changelog": "Autonomous draft: trimmed pauses, added kinetic captions & diagram B-roll",
  "tracks": [],
  "operations": [],
  "created_at": "2026-10-02T12:00:00Z",
  "updated_at": "2026-10-03T18:00:00Z"
}
```

---

## 2. Multi-Track Architecture

Every edit plan defines discrete tracks:
1. `video`: Master footage slices, scale (e.g. 1.15x for face framing), positioning, and aspect ratio crop.
2. `b_roll`: Media insertions, overlay timing, transitions (`spider_web_wipe`, `web_dissolve`), opacity.
3. `captions`: Word-by-word kinetic captions with highlighted key terms (in `#E5092F` or `#1769FF`).
4. `audio`: Master voice loudness normalization (-14 LUFS), music bed, and procedural SFX (`web_shoot_impact`, `spider_radar_pulse`).

---

## 3. Operations Array (Human & AI Collaboration)

Every transformation has a unique ID and active state:

```json
{
  "id": "op_trim_silence_01",
  "type": "remove_silence",
  "description": "Trim 1.8s hesitation at start",
  "timeline_start": 0.0,
  "timeline_end": 1.8,
  "properties": {
    "threshold_db": -38
  },
  "active": true
}
```

If the creator disables this operation, the timeline immediately restores the original source duration without requiring any model re-invocation.
