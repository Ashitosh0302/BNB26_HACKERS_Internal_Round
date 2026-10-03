# 🕷 CreatorAI — Spider-Sense Creator Operating Platform

> **"Your Content. Your Story. Your Spider-Sense."**

[![TypeScript](https://img.shields.io/badge/TypeScript-Clean%20Build-blue?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=flat-square)](https://fastapi.tiangolo.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square)](https://tailwindcss.com/)

---

## 🌐 What is CreatorAI?

**CreatorAI** is a **full-stack AI-powered creator operating platform** built with a Spider-Man-inspired design language. It takes a creator from raw idea all the way to a published multi-platform content universe:

```
Idea → Script → Recording → Understand → Clip Discover → Edit → Repurpose → Publish → Insights
```

This is a **hackathon-edition** production-style application with:
- **17 fully functional pages** across the complete creator lifecycle
- **Modular AI provider architecture** (swap OpenAI/Gemini/local models without code changes)
- **Real-time Spider-Sense** notifications and live updates
- **Interactive Multimodal Content Graph** visualizing the asset relationship web
- **Web Studio** — multi-track timeline editor with editable `edit_plan.json`
- **Creator DNA** persistent memory for personalized AI output

---

## 🎨 Visual Design Language

| Element | Value |
|---|---|
| Primary | Spider Red `#E5092F` |
| Secondary | Electric Blue `#1769FF` |
| Background | Deep Black `#05070D` |
| Font | Outfit (headings), Inter (body), JetBrains Mono (code) |
| Style | Glassmorphism panels, animated spider-web canvas background, micro-animations |

---

## 🏗 Architecture

```
BnB/
├── frontend/          # React 19 + TypeScript + Vite + TailwindCSS 4
│   ├── src/
│   │   ├── pages/     # 17 full pages (Dashboard, Script Studio, Web Studio, etc.)
│   │   ├── components/common/  # Navbar, AI Command Bar, Notifications, Web BG
│   │   ├── stores/    # Zustand state management (UI, Project, Editor)
│   │   ├── services/  # Seed data, Audio SFX
│   │   └── types/     # Full TypeScript type definitions
│   └── ...
│
├── backend/           # FastAPI Python backend
│   ├── app/
│   │   ├── api/       # 12 API routers (auth, projects, scripts, clips, editor, etc.)
│   │   ├── agents/    # AI agent suite (Script, Alignment, ClipDiscovery, Editor, Repurpose)
│   │   ├── ai/        # Modular provider interfaces + Mock providers
│   │   ├── models/    # Pydantic schemas
│   │   └── services/  # Demo data service
│   └── requirements.txt
│
└── docs/              # Architecture, API, Content Graph, Edit Plan specs
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+

### Frontend
```powershell
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Backend
```powershell
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
# → http://localhost:8000
# → API Docs: http://localhost:8000/docs
```

---

## 🕷 Key Features

### 1. Spider-Sense Cinematic Intro
- Full-screen animated intro sequence with web strands, radar pulses, and SFX
- ESC / SKIP button to jump straight to app

### 2. SPIDER HQ — Mission Dashboard
- Live opportunity detection banners
- Top clip candidates at-a-glance
- Quick access to all mission workspaces

### 3. Script Studio
- Hook, intro, core point, technical deep-dive, example, and CTA sections
- Spider-Sense hook score analysis per section
- Real-time word count and estimated duration

### 4. Script ↔ Footage Alignment
- Semantic + visual + audio breakdown matrix per section
- Click any script section → video player jumps to matched footage
- 96% match confidence scoring

### 5. Clip Hunter
- AI-discovered clip candidates with overall composite scores
- Hook strength, audio fidelity, self-containedness, visual quality metrics
- Aspect ratio auto-suggestion (9:16, 16:9, etc.)

### 6. Web Studio (Editor)
- Multi-track timeline with video, audio, captions, B-roll, effects tracks
- AI Edit Plan in open `edit_plan.json` schema
- Punch-in zoom, silence removal, kinetic caption overlays

### 7. Multi-Platform Repurpose Engine
- One long-form → YouTube Shorts, Instagram Reels, TikTok, LinkedIn, X Thread
- Per-platform hook, copy, hashtags, and CTA variants
- Scheduling with Spider Calendar integration

### 8. Multimodal Content Graph
- SVG force-graph visualization of the full content lineage
- Inspect parent-child asset relationships
- Click any node to inspect metadata

### 9. Analytics — Spider-Sense Insights
- Retention curve visualization
- Hook performance breakdown by type
- Topic performance heatmap
- AI-generated opportunity insights

### 10. Creator DNA
- Persistent memory for tone, style, pacing, brand palette
- Hook style preferences (contrarian, curiosity gap, social proof)
- CTA style and caption presets

### 11. Web Vault (Asset Library)
- Semantic search across all media assets
- Filter by category (video, image, audio, B-roll, etc.)
- Embedding summary and source context

### 12. Spider Calendar
- Content scheduling UI with multi-platform badges
- Drag-and-drop scheduling (visual)
- Platform status tracking

### 13. AI Command Bar (Ctrl+K)
- Natural language commands: "Find my best clip", "Create 3 shorts"
- Quick navigation shortcuts
- Spider-Sense confidence scores on actions

---

## 🤖 AI Architecture

```
CreatorAI AI Layer
│
├── LLMProvider (abstract)
│   ├── SpiderSenseMockLLM      (deterministic demo)
│   ├── OpenAIProvider          (GPT-4o)
│   └── GeminiProvider          (Gemini 2.0 Flash)
│
├── TranscriptionProvider
│   ├── MockTranscription
│   └── WhisperProvider
│
├── VisionProvider
│   ├── MockVision
│   └── GPT4VisionProvider
│
└── EmbeddingProvider
    ├── MockEmbedding
    └── OpenAIEmbeddingProvider

AI Agents:
  ScriptAgent          → Hook analysis, section scoring
  AlignmentAgent       → Script-to-footage semantic matching
  ClipDiscoveryAgent   → Viral moment detection
  QualityAgent         → Composite clip scoring
  EditorAgent          → Edit plan generation
  RepurposingAgent     → Multi-platform content generation
```

---

## 🎮 Demo Mode

The app ships with a **pre-seeded hackathon demo** featuring:
- **Alex Carter** creator profile (AI Systems & LLM Architecture)
- **"Building a Production RAG System"** mission (45:12 recording)
- 54 scenes, 12 clip candidates, 6 script sections
- 5 multi-platform repurposed content items
- Full analytics dataset with retention curves

Hit **"LAUNCH MISSION DEMO"** on the landing page to begin instantly.

---

## 📡 API Endpoints

Full interactive docs at `http://localhost:8000/docs`

| Prefix | Description |
|---|---|
| `/api/v1/auth` | Login, signup, me |
| `/api/v1/projects` | Missions CRUD |
| `/api/v1/projects/{id}/scripts` | Script editor & hook analysis |
| `/api/v1/projects/{id}/recordings` | Recording upload & scenes |
| `/api/v1/projects/{id}/alignment` | Script ↔ Footage alignment |
| `/api/v1/projects/{id}/clips` | Clip discovery & scoring |
| `/api/v1/projects/{id}/editor` | Edit plan generation |
| `/api/v1/projects/{id}/repurpose` | Multi-platform content |
| `/api/v1/assets` | Asset library |
| `/api/v1/analytics` | Performance data |
| `/api/v1/creator-memory` | Creator DNA |
| `/api/v1/content-graph` | Content graph nodes & edges |
| `WebSocket /ws/spider-sense` | Real-time notifications |

---

## ⚙️ Environment Configuration

```bash
# backend/.env (copy from .env.example)
HOST=0.0.0.0
PORT=8000
JWT_SECRET=your-secret-here
DATABASE_URL=sqlite:///./creatorai.db

# Optional real AI providers
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
ANTHROPIC_API_KEY=...
```

Without API keys, the app runs fully with deterministic **SpiderSense Mock** providers.

---

## 🏆 Hackathon Highlights

- ✅ **Full content lifecycle** in one SPA (17 screens)
- ✅ **Zero TypeScript errors** — clean build
- ✅ **Fully self-contained demo** — no API keys required
- ✅ **Cinematic intro animation** with SFX
- ✅ **Animated spider-web canvas** background (mouse-interactive)
- ✅ **AI Command Bar** (Ctrl+K) with natural language
- ✅ **Real-time notifications** drawer
- ✅ **Open edit plan schema** — AI creates, human controls final cut
- ✅ **Modular AI providers** — swap any model with no code changes
- ✅ **Creator DNA** persistent style memory
- ✅ **Multimodal Content Graph** SVG visualization

---

*Built with 🕷 Spider-Sense · CreatorAI © 2026*
