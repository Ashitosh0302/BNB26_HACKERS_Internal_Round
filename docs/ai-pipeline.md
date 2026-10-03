# Modular AI Pipeline & Agent Architecture

CreatorAi implements a clean, modular multi-agent orchestration pattern.

---

## 1. Modular Provider Interfaces

All AI services inherit from abstract base classes defined in `app/ai/provider_base.py`:
- `LLMProvider`: High-level reasoning, hook generation, script enhancement.
- `EmbeddingProvider`: Dense vector embeddings (e.g. text-embedding-3-small, voyage-code-3).
- `VisionProvider`: Keyframe understanding, OCR on slides/terminal, face framing.
- `TranscriptionProvider`: Word-level speech-to-text with diarization.

---

## 2. Specialized Logical Agents

1. **ScriptAgent**: Analyzes curiosity gap, emotion profile, and pacing in scripts.
2. **AlignmentAgent**: Computes semantic, visual, audio, and completeness scores between script paragraphs and footage timestamps.
3. **ClipDiscoveryAgent**: Evaluates footage for 6 distinct retention metrics:
   - Hook Strength (0-100)
   - Content Completeness (0-100)
   - Topic Relevance (0-100)
   - Visual Quality (0-100)
   - Audio Quality (0-100)
   - Self-Containedness (0-100)
4. **EditorAgent**: Generates editable `edit_plan.json` drafts with dynamic captions and B-roll.
5. **RepurposeAgent**: Adapts content across 5 platforms (YouTube Shorts, Reels, TikTok, LinkedIn, X).
6. **QualityAgent**: Validates clip candidate boundaries to prevent cut-off sentences or loudness spikes.
