from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class LLMProvider(ABC):
    @abstractmethod
    async def generate_completion(self, prompt: str, system_prompt: Optional[str] = None, max_tokens: int = 1000) -> str:
        """Generate text completion from prompt."""
        pass

    @abstractmethod
    async def generate_hooks(self, topic: str, count: int = 5, style: str = "contrarian") -> List[str]:
        """Generate high-converting video hooks."""
        pass

    @abstractmethod
    async def generate_edit_recommendations(self, transcript_segment: str, creator_tone: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Generate smart video edit suggestions."""
        pass

class EmbeddingProvider(ABC):
    @abstractmethod
    async def get_embedding(self, text: str) -> List[float]:
        """Generate dense vector embedding for text."""
        pass

    @abstractmethod
    async def compute_similarity(self, text1: str, text2: str) -> float:
        """Compute cosine similarity score between two texts."""
        pass

class VisionProvider(ABC):
    @abstractmethod
    async def analyze_frame(self, frame_url_or_bytes: str) -> Dict[str, Any]:
        """Analyze keyframe content, visual framing, on-screen code/diagrams, and face presence."""
        pass

    @abstractmethod
    async def detect_scenes(self, video_path_or_url: str) -> List[Dict[str, Any]]:
        """Detect scene boundaries, camera angle shifts, and topic breaks."""
        pass

class TranscriptionProvider(ABC):
    @abstractmethod
    async def transcribe(self, audio_or_video_url: str) -> Dict[str, Any]:
        """Transcribe speech with word-level timestamps and speaker diarization."""
        pass
