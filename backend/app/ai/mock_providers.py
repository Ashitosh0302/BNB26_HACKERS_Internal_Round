import random
from typing import List, Dict, Any, Optional
from app.ai.provider_base import LLMProvider, EmbeddingProvider, VisionProvider, TranscriptionProvider

class SpiderSenseMockLLM(LLMProvider):
    async def generate_completion(self, prompt: str, system_prompt: Optional[str] = None, max_tokens: int = 1000) -> str:
        prompt_lower = prompt.lower()
        if "hook" in prompt_lower:
            return "Most developers think vector search is enough for RAG. They are dead wrong."
        elif "cta" in prompt_lower:
            return "Drop 'RAG' in the comments and I'll send you my complete production retrieval architecture diagram."
        elif "improve" in prompt_lower or "polish" in prompt_lower:
            return "Let's cut the warm-up and punch straight into the core flaw: 90% of RAG failures happen at the chunking boundary, not the LLM generation step."
        return f"Spider-Sense AI Analysis: Analyzed '{prompt[:60]}...' with optimal retention scoring. Ready to execute on timeline."

    async def generate_hooks(self, topic: str, count: int = 5, style: str = "contrarian") -> List[str]:
        hooks = [
            f"Most developers misunderstand {topic} — and it's killing their production latency.",
            f"If you're still building {topic} like it's 2023, stop immediately.",
            f"Here is the 1 single line of architecture that fixes 80% of {topic} hallucinations.",
            f"Why OpenAI and Anthropic engineers never implement basic naive {topic}.",
            f"Before you spend $10,000 on vector databases, watch how we fixed {topic} in 42 seconds."
        ]
        return hooks[:count]

    async def generate_edit_recommendations(self, transcript_segment: str, creator_tone: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [
            {
                "id": "rec_001",
                "type": "trim",
                "label": "Trim 2.4s dead air at start",
                "reason": "Eliminates hesitation pause to maximize 3-second hook retention.",
                "duration_delta": -2.4,
                "confidence": 98
            },
            {
                "id": "rec_002",
                "type": "zoom",
                "label": "Punch-in Zoom (1.15x) on key thesis statement",
                "reason": "Emphasizes the critical pivot point where problem is defined.",
                "confidence": 94
            },
            {
                "id": "rec_003",
                "type": "b_roll",
                "label": "Overlay Vector Architecture Diagram (00:08 - 00:14)",
                "reason": "Visualizes embedding clustering while speaker describes high-dimensional vector space.",
                "confidence": 92
            },
            {
                "id": "rec_004",
                "type": "captions",
                "label": "Generate Dynamic Spider Red Kinetic Captions",
                "reason": "Highlights key technical keywords: 'Chunking', 'Vector DB', 'Latency'.",
                "confidence": 99
            }
        ]

class SpiderSenseMockEmbedding(EmbeddingProvider):
    async def get_embedding(self, text: str) -> List[float]:
        # Return a deterministic 64-dim mock vector derived from text hash
        seed = sum(ord(c) for c in text)
        random.seed(seed)
        return [round(random.uniform(-1.0, 1.0), 4) for _ in range(64)]

    async def compute_similarity(self, text1: str, text2: str) -> float:
        # Deterministic high similarity for related RAG / engineering terms
        t1, t2 = text1.lower(), text2.lower()
        shared_keywords = {"rag", "vector", "database", "retrieval", "embedding", "chunking", "llm", "search", "semantic"}
        matches = len([k for k in shared_keywords if k in t1 and k in t2])
        if matches >= 2:
            return round(0.92 + (matches * 0.015), 3)
        return round(0.85 + (random.randint(1, 10) * 0.01), 3)

class SpiderSenseMockVision(VisionProvider):
    async def analyze_frame(self, frame_url_or_bytes: str) -> Dict[str, Any]:
        return {
            "speaker_detected": True,
            "framing": "medium_close_up",
            "screen_content": "VS Code IDE displaying Python LangChain pipeline",
            "lighting_quality": 95,
            "visual_energy": "high",
            "detected_objects": ["speaker", "microphone", "ide_screen", "code_diagram"]
        }

    async def detect_scenes(self, video_path_or_url: str) -> List[Dict[str, Any]]:
        return [
            {"scene_id": "sc_01", "start": 0.0, "end": 42.0, "description": "Speaker intro & hook to camera", "tags": ["face", "talking_head", "hook"]},
            {"scene_id": "sc_02", "start": 42.0, "end": 125.0, "description": "Screen share: Architecture whiteboard", "tags": ["screen", "whiteboard", "rag_flow"]},
            {"scene_id": "sc_03", "start": 125.0, "end": 280.0, "description": "Code demonstration in VS Code", "tags": ["screen", "code", "python_script"]},
            {"scene_id": "sc_04", "start": 280.0, "end": 410.0, "description": "Vector database benchmark latency graph", "tags": ["graph", "benchmark", "metrics"]}
        ]

class SpiderSenseMockTranscription(TranscriptionProvider):
    async def transcribe(self, audio_or_video_url: str) -> Dict[str, Any]:
        return {
            "language": "en",
            "duration": 2712.0,
            "word_count": 6842,
            "speakers": ["Speaker 1 (Alex Carter)", "Speaker 2 (Audience Q&A)"],
            "sample_snippet": "Vector databases allow semantic search by converting unstructured text into dense mathematical embeddings."
        }
