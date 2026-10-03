from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, Field
from datetime import datetime

# --- AUTH & USER ---
class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str
    niche: Optional[str] = "AI & Technology"
    preferred_platforms: List[str] = ["YouTube", "LinkedIn", "TikTok", "Instagram"]

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: str
    niche: str
    preferred_platforms: List[str]
    created_at: datetime
    avatar_url: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User

# --- SCRIPT & SECTIONS ---
class ScriptSection(BaseModel):
    id: str
    type: str  # hook, intro, core_point, technical_deepdive, example, cta, conclusion
    title: str
    content: str
    estimated_duration_sec: int
    target_emotion: Optional[str] = "curiosity"
    key_terms: List[str] = []

class Script(BaseModel):
    id: str
    project_id: str
    title: str
    sections: List[ScriptSection]
    total_words: int
    created_at: datetime
    updated_at: datetime

# --- RECORDING & TRANSCRIPT ---
class TranscriptSegment(BaseModel):
    id: str
    start: float
    end: float
    speaker: str
    text: str
    confidence: float

class Scene(BaseModel):
    id: str
    scene_number: int
    start: float
    end: float
    duration: float
    description: str
    visual_tags: List[str]
    energy_score: float  # 0 to 100
    speaker_detected: bool = True
    keyframe_url: Optional[str] = None

class Recording(BaseModel):
    id: str
    project_id: str
    filename: str
    duration_sec: float
    duration_formatted: str
    words_count: int
    scenes_count: int
    speakers_count: int
    video_url: str
    audio_url: Optional[str] = None
    status: str = "ready"  # uploading, analyzing, ready, failed
    created_at: datetime

# --- SCRIPT ↔ FOOTAGE ALIGNMENT ---
class MatchBreakdown(BaseModel):
    semantic: int  # 0-100
    visual: int
    audio: int
    completeness: int

class AlignmentMatch(BaseModel):
    id: str
    script_section_id: str
    script_section_title: str
    recording_id: str
    start_time: float
    end_time: float
    timestamp_formatted: str
    overall_match_score: int
    breakdown: MatchBreakdown
    why_matches: List[str]
    matched_transcript: str
    is_improvised: bool = False
    alternative_matches_count: int = 2

# --- CLIP CANDIDATES ---
class ClipMetrics(BaseModel):
    hook_strength: int
    content_completeness: int
    topic_relevance: int
    visual_quality: int
    audio_quality: int
    self_containedness: int

class ClipCandidate(BaseModel):
    id: str
    project_id: str
    clip_number: int
    title: str
    hook_sentence: str
    source_recording_id: str
    source_script_section_id: str
    start_time: float
    end_time: float
    duration_sec: float
    timestamp_formatted: str
    metrics: ClipMetrics
    overall_score: int
    topic_tags: List[str]
    suggested_aspect_ratio: str = "9:16"
    summary: str
    transcript_preview: str

# --- EDIT PLAN ---
class EditOperation(BaseModel):
    id: str
    type: str  # trim, crop, zoom, captions, b_roll, text_overlay, audio_boost, remove_silence
    description: str
    source_start: Optional[float] = None
    source_end: Optional[float] = None
    timeline_start: float
    timeline_end: float
    properties: Dict[str, Any] = {}
    active: bool = True

class EditTrack(BaseModel):
    id: str
    name: str  # VIDEO, AUDIO, CAPTIONS, B_ROLL, TEXT, EFFECTS
    type: str
    muted: bool = False
    locked: bool = False
    items: List[Dict[str, Any]] = []

class EditPlan(BaseModel):
    id: str
    clip_candidate_id: Optional[str] = None
    project_id: str
    version: int = 1
    title: str
    format: str = "9:16"
    duration_sec: float
    tracks: List[EditTrack]
    operations: List[EditOperation]
    source_video_url: str
    source_start: float
    source_end: float
    author: str = "Spider-Sense AI"  # "Spider-Sense AI" or "Creator"
    changelog: str = "Initial AI draft generated"
    created_at: datetime
    updated_at: datetime

# --- REPURPOSED CONTENT ---
class RepurposedContentItem(BaseModel):
    id: str
    project_id: str
    source_clip_id: str
    source_script_section: str
    platform: str  # youtube_shorts, instagram_reels, tiktok, linkedin, x_thread, youtube_long
    aspect_ratio: str  # 9:16, 16:9, 4:5, 1:1
    headline_hook: str
    primary_copy: str
    hashtags: List[str]
    cta: str
    scheduled_date: Optional[str] = None
    status: str = "ready"  # draft, scheduled, published
    duration_sec: Optional[int] = None
    performance_score: Optional[int] = None

# --- MULTIMODAL CONTENT GRAPH ---
class GraphNode(BaseModel):
    id: str
    label: str
    type: str  # mission, script, section, recording, scene, clip, repurpose, asset
    subtext: Optional[str] = None
    status: Optional[str] = "active"
    metrics: Optional[Dict[str, Any]] = None
    parent_id: Optional[str] = None
    metadata: Dict[str, Any] = {}

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    relationship: str  # decomposes_to, recorded_as, aligned_with, extracted_from, repurposed_into
    strength: float = 1.0

class ContentGraph(BaseModel):
    project_id: str
    nodes: List[GraphNode]
    edges: List[GraphEdge]

# --- ASSETS (WEB VAULT) ---
class Asset(BaseModel):
    id: str
    title: str
    category: str  # video, image, audio, b_roll, screenshot, logo, document
    format: str
    dimensions: Optional[str] = None
    duration_sec: Optional[float] = None
    file_size_formatted: str
    tags: List[str]
    preview_url: str
    embedding_summary: str
    source_context: str
    created_at: datetime

# --- CREATOR DNA (CREATOR MEMORY) ---
class ToneProfile(BaseModel):
    educational: int  # 0-100
    conversational: int
    technical: int
    humorous: int
    storytelling: int

class CreatorMemory(BaseModel):
    id: str
    user_id: str
    creator_name: str
    tone: ToneProfile
    hook_style_preferred: str = "Contrarian Problem Statement"
    cta_style_preferred: str = "Direct Technical Discussion Prompt"
    caption_preset: str = "Bold Neon Punch-In with Spider Red Accent"
    brand_primary_hex: str = "#E5092F"
    brand_secondary_hex: str = "#1769FF"
    brand_font: str = "Outfit"
    preferred_clip_length_sec: int = 42
    auto_broll_frequency: str = "Every 6 seconds"
    pacing_preset: str = "Fast Dynamic (Sub-second breath cuts)"
    niche_topics: List[str] = ["RAG", "LLM Agents", "Vector DBs", "AI Systems", "Full-Stack AI"]

# --- ANALYTICS ---
class TopicMetric(BaseModel):
    topic: str
    score: int
    views: int
    completion_rate: int

class HookPerformance(BaseModel):
    hook_type: str
    retention_percent: int
    sample_size: int

class SpiderSenseInsight(BaseModel):
    id: str
    title: str
    observations: List[str]
    action_cta: str
    category: str  # opportunity, retention, hook, platform
    action_route: str

class AnalyticsData(BaseModel):
    total_views: str
    total_watch_time: str
    avg_retention_percent: int
    likes: str
    shares: str
    saves: str
    retention_curve: List[Dict[str, Any]]
    topic_performance: List[TopicMetric]
    hook_performance: List[HookPerformance]
    insights: List[SpiderSenseInsight]

# --- SPIDER-SENSE NOTIFICATIONS ---
class SpiderSenseNotification(BaseModel):
    id: str
    type: str  # opportunity, processing, connection, performance, review
    title: str
    message: str
    confidence: Optional[int] = None
    timestamp: str
    action_label: Optional[str] = None
    target_route: Optional[str] = None
    read: bool = False

# --- PROJECT (MISSION) ---
class Project(BaseModel):
    id: str
    title: str
    niche: str
    description: str
    thumbnail_url: str
    duration_formatted: str
    status: str  # analyzing, ready, in_progress, completed
    analysis_progress: int  # 0 to 100
    clips_count: int
    repurposed_count: int
    created_at: datetime
    updated_at: datetime
