from typing import List, Dict, Any, Optional
from app.models.schemas import ScriptSection, AlignmentMatch, MatchBreakdown, ClipCandidate, ClipMetrics, EditOperation, EditPlan, RepurposedContentItem
from app.ai.mock_providers import SpiderSenseMockLLM, SpiderSenseMockEmbedding, SpiderSenseMockVision

llm = SpiderSenseMockLLM()
embedding = SpiderSenseMockEmbedding()
vision = SpiderSenseMockVision()

class ScriptAgent:
    @staticmethod
    async def analyze_hook(hook_text: str) -> Dict[str, Any]:
        strength = 92 if len(hook_text) < 90 and any(w in hook_text.lower() for w in ["most", "never", "mistake", "why", "stop"]) else 78
        return {
            "hook_strength_score": strength,
            "pacing_grade": "A+",
            "curiosity_gap": "High",
            "suggestions": [
                "Remove weak introductory filler words like 'Hey guys'",
                "Lead directly with the counter-intuitive revelation in the first 2 seconds",
                "Add visual emphasis on the word 'Latency'"
            ],
            "alternatives": await llm.generate_hooks(topic="RAG vector search", count=3)
        }

    @staticmethod
    async def expand_or_shorten_section(section_content: str, mode: str) -> str:
        if mode == "shorten":
            return "Naive vector search collapses when document context lacks hierarchical metadata. Fix chunk boundaries first."
        return f"{section_content} In production, this requires hybrid dense-sparse indexing with reciprocal rank fusion (RRF)."

class AlignmentAgent:
    @staticmethod
    async def align_script_and_footage(script_sections: List[Dict[str, Any]], recording_transcript: List[Dict[str, Any]]) -> List[AlignmentMatch]:
        matches = [
            AlignmentMatch(
                id="align_001",
                script_section_id="sec_01",
                script_section_title="Hook: The Big RAG Lie",
                recording_id="rec_rag_01",
                start_time=0.0,
                end_time=18.5,
                timestamp_formatted="00:00:00 → 00:00:18",
                overall_match_score=96,
                breakdown=MatchBreakdown(semantic=98, visual=94, audio=97, completeness=95),
                why_matches=[
                    "Exact phrase match on 'misunderstand vector search'",
                    "High visual energy and direct camera eye contact",
                    "Crisp studio audio without background noise",
                    "Complete grammatical thought without mid-sentence cut"
                ],
                matched_transcript="Most developers misunderstand RAG. They think vector search is magic, but in reality, 80% of hallucination bugs happen right at the chunking boundary.",
                is_improvised=False
            ),
            AlignmentMatch(
                id="align_002",
                script_section_id="sec_02",
                script_section_title="Architecture: High-Dimensional Vectors",
                recording_id="rec_rag_01",
                start_time=18.5,
                end_time=68.2,
                timestamp_formatted="00:00:18 → 00:01:08",
                overall_match_score=94,
                breakdown=MatchBreakdown(semantic=95, visual=96, audio=93, completeness=92),
                why_matches=[
                    "Semantic similarity: 95% on high-dimensional embeddings",
                    "Screen share shows interactive 3D embedding projector diagram",
                    "Speaker points directly to cluster outlier"
                ],
                matched_transcript="Vector databases allow semantic search by converting unstructured text into dense mathematical embeddings. When words have similar semantic meaning, their vectors cluster together.",
                is_improvised=False
            ),
            AlignmentMatch(
                id="align_003",
                script_section_id="sec_03",
                script_section_title="The Chunking Trap & Solution",
                recording_id="rec_rag_01",
                start_time=68.2,
                end_time=124.0,
                timestamp_formatted="00:01:08 → 00:02:04",
                overall_match_score=91,
                breakdown=MatchBreakdown(semantic=92, visual=91, audio=94, completeness=88),
                why_matches=[
                    "Improvised live coding section detected and aligned to script outline",
                    "Terminal output clearly legible on 1080p frame",
                    "Code snippet matches Python LangChain text splitter pattern"
                ],
                matched_transcript="Here is the fix: don't use arbitrary 500-token chunks. Use parent-document retrieval so the embedding search happens on small snippets, but the LLM receives the full rich context.",
                is_improvised=True
            ),
            AlignmentMatch(
                id="align_004",
                script_section_id="sec_04",
                script_section_title="Benchmarking & Latency Metrics",
                recording_id="rec_rag_01",
                start_time=124.0,
                end_time=166.0,
                timestamp_formatted="00:02:04 → 00:02:46",
                overall_match_score=93,
                breakdown=MatchBreakdown(semantic=94, visual=93, audio=96, completeness=89),
                why_matches=[
                    "Screen captures benchmark table comparing Qdrant, Pinecone, and pgvector",
                    "Speaker highlights 99th percentile query time at 14ms",
                    "Clear voice projection and concise takeaway"
                ],
                matched_transcript="Look at this benchmark: query latency dropped from 240ms down to 14ms once we added hierarchical HNSW indexing with pgvector.",
                is_improvised=False
            )
        ]
        return matches

class ClipDiscoveryAgent:
    @staticmethod
    async def discover_candidates(recording_id: str) -> List[ClipCandidate]:
        return [
            ClipCandidate(
                id="clip_001",
                project_id="proj_rag_master",
                clip_number=1,
                title="The #1 Vector DB Mistake Destroying Your App",
                hook_sentence="Most developers misunderstand RAG.",
                source_recording_id=recording_id,
                source_script_section_id="sec_01",
                start_time=0.0,
                end_time=42.0,
                duration_sec=42.0,
                timestamp_formatted="00:00:00 → 00:00:42",
                metrics=ClipMetrics(
                    hook_strength=96,
                    content_completeness=94,
                    topic_relevance=98,
                    visual_quality=92,
                    audio_quality=97,
                    self_containedness=95
                ),
                overall_score=95,
                topic_tags=["RAG", "Vector Search", "Engineering"],
                suggested_aspect_ratio="9:16",
                summary="Explains why 80% of RAG hallucinations stem from poor chunking rather than the LLM model.",
                transcript_preview="Most developers think vector search is magic. In reality, chunk boundary truncation ruins context."
            ),
            ClipCandidate(
                id="clip_002",
                project_id="proj_rag_master",
                clip_number=2,
                title="Parent-Child Document Retrieval in 30 Seconds",
                hook_sentence="Stop feeding 500-token arbitrary chunks to your LLM.",
                source_recording_id=recording_id,
                source_script_section_id="sec_03",
                start_time=72.0,
                end_time=107.0,
                duration_sec=35.0,
                timestamp_formatted="00:01:12 → 00:01:47",
                metrics=ClipMetrics(
                    hook_strength=91,
                    content_completeness=92,
                    topic_relevance=95,
                    visual_quality=90,
                    audio_quality=94,
                    self_containedness=91
                ),
                overall_score=92,
                topic_tags=["Architecture", "LangChain", "Production"],
                suggested_aspect_ratio="9:16",
                summary="A practical breakdown of parent-child retrieval pattern to keep search fast and context complete.",
                transcript_preview="Search on small vectors, but pass the parent document to Claude or GPT. It cuts hallucination by 60%."
            ),
            ClipCandidate(
                id="clip_003",
                project_id="proj_rag_master",
                clip_number=3,
                title="How We Dropped RAG Latency From 240ms to 14ms",
                hook_sentence="Why does your vector database feel sluggish?",
                source_recording_id=recording_id,
                source_script_section_id="sec_04",
                start_time=124.0,
                end_time=162.0,
                duration_sec=38.0,
                timestamp_formatted="00:02:04 → 00:02:42",
                metrics=ClipMetrics(
                    hook_strength=93,
                    content_completeness=90,
                    topic_relevance=94,
                    visual_quality=94,
                    audio_quality=96,
                    self_containedness=93
                ),
                overall_score=93,
                topic_tags=["Latency", "pgvector", "HNSW"],
                suggested_aspect_ratio="9:16",
                summary="Reveals the exact index tuning parameters that slashed production query latency by 17x.",
                transcript_preview="Here is the exact SQL command with pgvector and HNSW index parameters that slashed latency."
            ),
            ClipCandidate(
                id="clip_004",
                project_id="proj_rag_master",
                clip_number=4,
                title="Semantic vs Lexical: Why You Need Hybrid Search",
                hook_sentence="Pure vector search fails when searching for exact part numbers or code symbols.",
                source_recording_id=recording_id,
                source_script_section_id="sec_02",
                start_time=210.0,
                end_time=255.0,
                duration_sec=45.0,
                timestamp_formatted="00:03:30 → 00:04:15",
                metrics=ClipMetrics(
                    hook_strength=88,
                    content_completeness=93,
                    topic_relevance=92,
                    visual_quality=89,
                    audio_quality=95,
                    self_containedness=89
                ),
                overall_score=91,
                topic_tags=["Hybrid Search", "BM25", "Reciprocal Rank"],
                suggested_aspect_ratio="9:16",
                summary="Demonstrates why production search systems combine BM25 keyword matching with dense embeddings.",
                transcript_preview="If a user searches for 'Error 403-B-99', dense embeddings won't find it. BM25 will."
            )
        ]

class QualityAgent:
    @staticmethod
    def validate_clip_candidate(clip: ClipCandidate) -> Dict[str, Any]:
        """Ensures AI output does not have cut-off sentences or missing audio."""
        issues = []
        if clip.duration_sec < 15:
            issues.append("Duration below optimal 15s threshold for retention.")
        if clip.metrics.audio_quality < 80:
            issues.append("Low audio clarity detected in segment.")
        
        return {
            "passed": len(issues) == 0,
            "quality_status": "certified" if len(issues) == 0 else "review_recommended",
            "confidence_score": 97,
            "issues": issues,
            "checks": [
                {"name": "Sentence boundary completeness", "status": "pass"},
                {"name": "Audio loudness normalization (-14 LUFS)", "status": "pass"},
                {"name": "Aspect ratio 9:16 face-tracking framing", "status": "pass"},
                {"name": "No awkward breath cuts", "status": "pass"}
            ]
        }

class EditorAgent:
    @staticmethod
    def generate_edit_plan(clip: ClipCandidate) -> EditPlan:
        tracks = [
            {
                "id": "trk_video",
                "name": "VIDEO TRACK",
                "type": "video",
                "items": [
                    {
                        "id": "v_item_1",
                        "start": 0.0,
                        "duration": clip.duration_sec,
                        "source_start": clip.start_time,
                        "source_end": clip.end_time,
                        "scale": 1.15,
                        "position_x": 0,
                        "position_y": 0,
                        "aspect": "9:16"
                    }
                ]
            },
            {
                "id": "trk_broll",
                "name": "B-ROLL OVERLAYS",
                "type": "b_roll",
                "items": [
                    {
                        "id": "broll_item_1",
                        "start": 8.5,
                        "duration": 5.5,
                        "title": "3D Vector Space Cluster Animation",
                        "opacity": 0.95,
                        "transition": "spider_web_wipe"
                    },
                    {
                        "id": "broll_item_2",
                        "start": 22.0,
                        "duration": 4.0,
                        "title": "Terminal Benchmark Latency Waveform",
                        "opacity": 0.9,
                        "transition": "web_dissolve"
                    }
                ]
            },
            {
                "id": "trk_captions",
                "name": "DYNAMIC SPIDER CAPTIONS",
                "type": "captions",
                "items": [
                    {"id": "cap_1", "start": 0.0, "end": 2.5, "text": "MOST DEVELOPERS", "highlight_word": "DEVELOPERS", "color": "#E5092F"},
                    {"id": "cap_2", "start": 2.5, "end": 5.0, "text": "MISUNDERSTAND RAG", "highlight_word": "MISUNDERSTAND", "color": "#1769FF"},
                    {"id": "cap_3", "start": 5.0, "end": 9.2, "text": "80% of hallucination happens here", "highlight_word": "80%", "color": "#F2F5F7"},
                    {"id": "cap_4", "start": 9.2, "end": 14.0, "text": "at the chunking boundary!", "highlight_word": "CHUNKING", "color": "#E5092F"}
                ]
            },
            {
                "id": "trk_audio",
                "name": "AUDIO MASTER & SFX",
                "type": "audio",
                "items": [
                    {"id": "aud_voice", "start": 0.0, "duration": clip.duration_sec, "volume": 1.0, "eq": "voice_boost"},
                    {"id": "sfx_web_shoot", "start": 0.1, "duration": 0.8, "title": "Web Shoot Impact", "volume": 0.35},
                    {"id": "sfx_spider_radar", "start": 8.4, "duration": 0.6, "title": "Spider-Sense Ping", "volume": 0.4}
                ]
            }
        ]

        operations = [
            EditOperation(
                id="op_trim_silence",
                type="remove_silence",
                description="Trim 1.8s hesitation at start",
                timeline_start=0.0,
                timeline_end=1.8,
                properties={"threshold_db": -38}
            ),
            EditOperation(
                id="op_zoom_hook",
                type="zoom",
                description="1.18x punch-in for opening statement",
                timeline_start=0.0,
                timeline_end=6.0,
                properties={"zoom_level": 1.18, "center": "speaker_eyes"}
            ),
            EditOperation(
                id="op_broll_insert",
                type="b_roll",
                description="Insert Vector DB Architecture Diagram",
                timeline_start=8.5,
                timeline_end=14.0,
                properties={"asset_id": "ast_diagram_01"}
            ),
            EditOperation(
                id="op_kinetic_captions",
                type="captions",
                description="Spider Red word-by-word kinetic captions",
                timeline_start=0.0,
                timeline_end=clip.duration_sec,
                properties={"font": "Outfit", "glow": True, "accent_color": "#E5092F"}
            )
        ]

        from datetime import datetime
        return EditPlan(
            id=f"plan_{clip.id}",
            clip_candidate_id=clip.id,
            project_id=clip.project_id,
            version=1,
            title=f"AI Edit: {clip.title}",
            format="9:16",
            duration_sec=clip.duration_sec,
            tracks=tracks,
            operations=operations,
            source_video_url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            source_start=clip.start_time,
            source_end=clip.end_time,
            author="Spider-Sense AI",
            changelog="Autonomous draft: trimmed pauses, added kinetic captions & diagram B-roll",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

class RepurposeAgent:
    @staticmethod
    def generate_multiplatform_pack(project_id: str, clip_id: str) -> List[RepurposedContentItem]:
        return [
            RepurposedContentItem(
                id="rep_yt_shorts",
                project_id=project_id,
                source_clip_id=clip_id,
                source_script_section="Hook & Vector DB Mistake",
                platform="youtube_shorts",
                aspect_ratio="9:16",
                headline_hook="Stop making this #1 RAG vector search mistake 🛑",
                primary_copy="If your LLM hallucinations are spiking, check your chunk size before switching models. Here is the parent-child fix.",
                hashtags=["#rag", "#ai", "#softwareengineer", "#python", "#coding"],
                cta="Subscribe for complete system architecture breakdowns every Tuesday.",
                scheduled_date="2026-10-06 14:00",
                duration_sec=42,
                performance_score=94
            ),
            RepurposedContentItem(
                id="rep_reels",
                project_id=project_id,
                source_clip_id=clip_id,
                source_script_section="Hook & Vector DB Mistake",
                platform="instagram_reels",
                aspect_ratio="9:16",
                headline_hook="The hidden reason your AI app hallucinates 🧠🕸",
                primary_copy="80% of engineers blame GPT-4 when their retrieval fails. But the math shows your vector chunking is breaking semantic continuity.",
                hashtags=["#aiengineering", "#techcreators", "#softwaredeveloper", "#webdev", "#pythondeveloper"],
                cta="Comment 'VECTOR' and I'll DM you my production retrieval checklist.",
                scheduled_date="2026-10-07 18:30",
                duration_sec=42,
                performance_score=96
            ),
            RepurposedContentItem(
                id="rep_tiktok",
                project_id=project_id,
                source_clip_id=clip_id,
                source_script_section="Hook & Vector DB Mistake",
                platform="tiktok",
                aspect_ratio="9:16",
                headline_hook="Why developers are building AI RAG all wrong 💀",
                primary_copy="Stop feeding 500-token chunks blind into embeddings. Watch how 1 architectural tweak dropped our hallucinations by 60%.",
                hashtags=["#tech", "#codingtok", "#artificialintelligence", "#learnontiktok", "#programming"],
                cta="Follow for more honest AI engineering breakdowns.",
                scheduled_date="2026-10-08 16:00",
                duration_sec=42,
                performance_score=91
            ),
            RepurposedContentItem(
                id="rep_linkedin",
                project_id=project_id,
                source_clip_id=clip_id,
                source_script_section="Architecture & Vector Tradeoffs",
                platform="linkedin",
                aspect_ratio="4:5",
                headline_hook="We spent $18k on vector search databases before realizing this architectural flaw.",
                primary_copy="""Most engineering teams treat Vector DBs like a magic box:
1. Chunk text into 500 tokens
2. Compute embeddings
3. Run cosine similarity
4. Feed top-k to the LLM

And then they wonder why the model hallucinates on complex technical queries.

Here's why: Small chunks lose semantic context. Large chunks dilute the vector distance metric.

The solution we implemented in production:
→ Parent-Document Retrieval
→ Small chunks for search (128 tokens)
→ Full parent chunks for LLM context (1024 tokens)
→ Reciprocal Rank Fusion with BM25

Result: 64% fewer hallucinations and 17x faster indexing.

Full code breakdown in comments 👇""",
                hashtags=["#ArtificialIntelligence", "#MachineLearning", "#SoftwareArchitecture", "#DataEngineering"],
                cta="Repost if this helps your engineering team.",
                scheduled_date="2026-10-09 09:00",
                duration_sec=None,
                performance_score=98
            ),
            RepurposedContentItem(
                id="rep_x_thread",
                project_id=project_id,
                source_clip_id=clip_id,
                source_script_section="Architecture & Code",
                platform="x_thread",
                aspect_ratio="1:1",
                headline_hook="90% of RAG tutorials on YouTube teach you an anti-pattern. 🧵👇",
                primary_copy="""1/7 If you're building production RAG with simple token-based chunking, you're building a hallucination generator.

Here's how to build a production retrieval engine that actually works:

2/7 The Problem:
Vector embeddings compress meaning into geometric points. When you arbitrarily slice sentences at token 500, you sever cross-sentence relationships.

3/7 The Fix: Parent-Child Retrieval.
Store two layers of data:
- Leaf nodes (120 tokens) for high-precision search
- Parent nodes (1000 tokens) linked by foreign keys

4/7 Query executes in 12ms against leaf vectors. But the synthesizer reads the full parent context. Zero hallucination.

5/7 Check the attached video clip for the live benchmark breakdown.""",
                hashtags=["#buildinpublic", "#ai", "#rag", "#python"],
                cta="Bookmark this thread to reference during your next system design review.",
                scheduled_date="2026-10-09 11:30",
                duration_sec=None,
                performance_score=95
            )
        ]
