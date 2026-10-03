# CreatorAi Architecture Specification

## "Your Content. Your Story. Your Spider-Sense."

CreatorAi is an AI-powered creator operating platform engineered to eliminate workflow fragmentation for digital creators, engineers, and educators.

---

## 1. High-Level System Architecture

```text
                  ┌────────────────────────────────────────────────────────┐
                  │                    CREATOR INTERFACE                   │
                  │   Spider HQ · Web Studio · Script Studio · Web Vault  │
                  └───────────────────────────┬────────────────────────────┘
                                              │
                                  REST / WebSockets (JSON)
                                              │
                  ┌───────────────────────────▼────────────────────────────┐
                  │                  FASTAPI CORE GATEWAY                  │
                  │   Authentication · Session Routing · WebSockets Hub    │
                  └─────┬─────────────────────┬──────────────────────┬─────┘
                        │                     │                      │
       ┌────────────────▼─────────┐ ┌─────────▼──────────┐ ┌────────▼──────────┐
       │   MULTIMODAL GRAPH SRV   │ │   AI AGENT SUITE   │ │   EDIT PLAN ENGINE │
       │  Hierarchical Lineage    │ │  ScriptAgent       │ │  edit_plan.json    │
       │  Script ↔ Footage Engine │ │  AlignmentAgent    │ │  Multi-track Sync  │
       │  pgvector / SQLite       │ │  ClipDiscoveryAgent│ │  Non-destructive   │
       │                          │ │  RepurposeAgent    │ │  Timeline Ops      │
       └──────────────────────────┘ └────────────────────┘ └────────────────────┘
```

---

## 2. Core Technological Innovation: Multimodal Content Graph

Traditional AI video tools operate as lossy black boxes:
1. Video uploaded
2. AI creates MP4
3. Source context is permanently lost

CreatorAi treats content as an interconnected **Directed Acyclic Graph (DAG)**:

```text
Project (Mission)
  ├── Idea & Creator DNA
  ├── Script (Hook, Problem, Proof, CTA)
  ├── Recording (Audio, 4K Frames, Diarization)
  │     ├── Scenes (1..N)
  │     └── Transcript Words & Timestamps
  ├── Clip Candidates (Ranked by 6 metrics)
  │     └── Edit Plan (Multi-track JSON)
  └── Repurposed Content Packs
        ├── YouTube Shorts (9:16)
        ├── Instagram Reels (9:16)
        ├── TikTok (9:16)
        ├── LinkedIn Post (4:5)
        └── X Thread (1:1)
```

Every derivative element retains foreign keys back to its exact timestamp, script paragraph, and confidence breakdown.

---

## 3. "AI Creates the Draft, Creator Controls the Final Cut"

Every AI suggestion (trimming hesitation, inserting B-roll diagrams, zooming in 1.18x, adding kinetic captions) produces discrete operations inside `edit_plan.json`. The creator can toggle, modify, or revert any operation on the timeline at sub-second precision.
