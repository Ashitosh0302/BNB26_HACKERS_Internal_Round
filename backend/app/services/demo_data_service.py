from datetime import datetime
from typing import Dict, Any, List
from app.models.schemas import (
    Project, Script, ScriptSection, Recording, TranscriptSegment, Scene,
    AlignmentMatch, MatchBreakdown, ClipCandidate, ClipMetrics, EditPlan,
    RepurposedContentItem, ContentGraph, GraphNode, GraphEdge, Asset,
    CreatorMemory, ToneProfile, AnalyticsData, TopicMetric, HookPerformance,
    SpiderSenseInsight, SpiderSenseNotification, User
)

class DemoDataService:
    @staticmethod
    def get_demo_user() -> User:
        return User(
            id="usr_alex_carter",
            email="alex@creatorai.studio",
            name="Alex Carter",
            niche="AI Systems & LLM Architecture",
            preferred_platforms=["YouTube", "LinkedIn", "Instagram", "TikTok", "X"],
            created_at=datetime(2026, 1, 15),
            avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
        )

    @staticmethod
    def get_demo_project() -> Project:
        return Project(
            id="proj_rag_master",
            title="Building a Production RAG System",
            niche="AI & Systems Engineering",
            description="Deep dive recording into high-throughput hybrid vector retrieval, chunking strategies, parent-document stores, and low-latency pgvector indexing.",
            thumbnail_url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop",
            duration_formatted="45:12",
            status="ready",
            analysis_progress=100,
            clips_count=12,
            repurposed_count=15,
            created_at=datetime(2026, 10, 1, 14, 20),
            updated_at=datetime(2026, 10, 3, 22, 15)
        )

    @staticmethod
    def get_demo_recording() -> Recording:
        return Recording(
            id="rec_rag_01",
            project_id="proj_rag_master",
            filename="production_rag_masterclass_4k.mp4",
            duration_sec=2712.0,
            duration_formatted="45:12",
            words_count=6842,
            scenes_count=54,
            speakers_count=2,
            video_url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            audio_url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            status="ready",
            created_at=datetime(2026, 10, 1, 14, 30)
        )

    @staticmethod
    def get_demo_script() -> Script:
        sections = [
            ScriptSection(
                id="sec_01",
                type="hook",
                title="1. The Big RAG Illusion",
                content="Most developers misunderstand RAG. They think vector search is magic, but in reality, 80% of hallucination bugs happen right at the chunking boundary.",
                estimated_duration_sec=18,
                target_emotion="curiosity",
                key_terms=["RAG", "Vector Search", "Chunking", "Hallucination"]
            ),
            ScriptSection(
                id="sec_02",
                type="intro",
                title="2. High-Dimensional Vector Embeddings",
                content="Vector databases allow semantic search by converting unstructured text into dense mathematical embeddings. When words have similar semantic meaning, their vectors cluster together in high-dimensional space.",
                estimated_duration_sec=50,
                target_emotion="clarity",
                key_terms=["Embeddings", "Cosine Similarity", "Vector Space"]
            ),
            ScriptSection(
                id="sec_03",
                type="core_point",
                title="3. The Chunking Boundary Trap",
                content="When you slice a paragraph at arbitrary 500 tokens, you destroy cross-sentence pronouns and context. The fix is parent-document retrieval: index small chunks, but inject full parent documents into the prompt.",
                estimated_duration_sec=56,
                target_emotion="enlightenment",
                key_terms=["Parent-Document", "Token Splitter", "Context Window"]
            ),
            ScriptSection(
                id="sec_04",
                type="technical_deepdive",
                title="4. Benchmarking Latency: 240ms to 14ms",
                content="Look at this benchmark: query latency dropped from 240ms down to 14ms once we added hierarchical HNSW indexing with pgvector and quantized embeddings.",
                estimated_duration_sec=42,
                target_emotion="validation",
                key_terms=["pgvector", "HNSW Index", "Quantization", "Latency"]
            ),
            ScriptSection(
                id="sec_05",
                type="example",
                title="5. Hybrid Search: BM25 + Dense Vectors",
                content="If a user searches for an exact alphanumeric part number or error code, pure semantic vectors often miss. Hybrid search with reciprocal rank fusion ensures 99.8% precision.",
                estimated_duration_sec=45,
                target_emotion="practical_utility",
                key_terms=["Hybrid Search", "BM25", "Reciprocal Rank Fusion"]
            ),
            ScriptSection(
                id="sec_06",
                type="cta",
                title="6. Production Checklist & Next Steps",
                content="Drop a comment below with 'RAG' and I'll send you our production architecture diagram and SQL migration scripts. Subscribe to follow the series!",
                estimated_duration_sec=20,
                target_emotion="action",
                key_terms=["Architecture Diagram", "Subscribe", "Comments"]
            )
        ]
        return Script(
            id="scr_rag_01",
            project_id="proj_rag_master",
            title="Production RAG: Complete Architecture Script",
            sections=sections,
            total_words=2140,
            created_at=datetime(2026, 10, 1, 10, 0),
            updated_at=datetime(2026, 10, 2, 16, 45)
        )

    @staticmethod
    def get_demo_content_graph() -> ContentGraph:
        nodes = [
            GraphNode(id="node_proj", label="Mission: Production RAG", type="mission", subtext="Master Source Project", status="active", metadata={"duration": "45:12"}),
            GraphNode(id="node_script", label="Script Outline", type="script", subtext="6 structured sections", parent_id="node_proj", metadata={"words": 2140}),
            GraphNode(id="node_rec", label="Raw 4K Recording", type="recording", subtext="45 min, 54 scenes", parent_id="node_proj", metadata={"size": "4.2 GB"}),
            
            # Scenes
            GraphNode(id="node_sc_01", label="Scene 01: Hook & Camera", type="scene", subtext="00:00 - 00:42", parent_id="node_rec"),
            GraphNode(id="node_sc_02", label="Scene 02: Architecture Diagram", type="scene", subtext="00:42 - 02:05", parent_id="node_rec"),
            GraphNode(id="node_sc_03", label="Scene 03: Live Terminal Code", type="scene", subtext="02:05 - 04:40", parent_id="node_rec"),
            
            # Clips
            GraphNode(id="node_clip_1", label="Clip #1: The Big RAG Mistake", type="clip", subtext="Score 95 · 42s", parent_id="node_sc_01", metrics={"hook": 96, "audio": 97}),
            GraphNode(id="node_clip_2", label="Clip #2: Parent-Child Retrieval", type="clip", subtext="Score 92 · 35s", parent_id="node_sc_02", metrics={"hook": 91, "audio": 94}),
            GraphNode(id="node_clip_3", label="Clip #3: 14ms pgvector Latency", type="clip", subtext="Score 93 · 38s", parent_id="node_sc_03", metrics={"hook": 93, "audio": 96}),
            
            # Repurposed
            GraphNode(id="node_rep_yt", label="YouTube Shorts (9:16)", type="repurpose", subtext="42s · Scheduled Mon", parent_id="node_clip_1"),
            GraphNode(id="node_rep_ig", label="Instagram Reel (9:16)", type="repurpose", subtext="42s · Scheduled Tue", parent_id="node_clip_1"),
            GraphNode(id="node_rep_tt", label="TikTok (9:16)", type="repurpose", subtext="42s · Scheduled Wed", parent_id="node_clip_1"),
            GraphNode(id="node_rep_li", label="LinkedIn Post (4:5)", type="repurpose", subtext="Deep Dive & Code", parent_id="node_clip_2"),
            GraphNode(id="node_rep_x", label="X Master Thread", type="repurpose", subtext="7 Tweets + Video", parent_id="node_clip_3")
        ]

        edges = [
            GraphEdge(id="e1", source="node_proj", target="node_script", relationship="decomposes_to"),
            GraphEdge(id="e2", source="node_proj", target="node_rec", relationship="recorded_as"),
            GraphEdge(id="e3", source="node_rec", target="node_sc_01", relationship="contains_scene"),
            GraphEdge(id="e4", source="node_rec", target="node_sc_02", relationship="contains_scene"),
            GraphEdge(id="e5", source="node_rec", target="node_sc_03", relationship="contains_scene"),
            GraphEdge(id="e6", source="node_script", target="node_sc_01", relationship="aligned_with"),
            GraphEdge(id="e7", source="node_sc_01", target="node_clip_1", relationship="extracted_from"),
            GraphEdge(id="e8", source="node_sc_02", target="node_clip_2", relationship="extracted_from"),
            GraphEdge(id="e9", source="node_sc_03", target="node_clip_3", relationship="extracted_from"),
            GraphEdge(id="e10", source="node_clip_1", target="node_rep_yt", relationship="repurposed_into"),
            GraphEdge(id="e11", source="node_clip_1", target="node_rep_ig", relationship="repurposed_into"),
            GraphEdge(id="e12", source="node_clip_1", target="node_rep_tt", relationship="repurposed_into"),
            GraphEdge(id="e13", source="node_clip_2", target="node_rep_li", relationship="repurposed_into"),
            GraphEdge(id="e14", source="node_clip_3", target="node_rep_x", relationship="repurposed_into")
        ]

        return ContentGraph(project_id="proj_rag_master", nodes=nodes, edges=edges)

    @staticmethod
    def get_demo_assets() -> List[Asset]:
        return [
            Asset(
                id="ast_diagram_01",
                title="Vector Clustering 3D Architecture Diagram",
                category="image",
                format="PNG",
                dimensions="3840x2160",
                file_size_formatted="2.4 MB",
                tags=["diagram", "architecture", "vector_space", "rag"],
                preview_url="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&fit=crop",
                embedding_summary="Dense vector similarity clustering visualization with cosine distance lines",
                source_context="Created in Figma for episode #42 slide deck",
                created_at=datetime(2026, 9, 28)
            ),
            Asset(
                id="ast_broll_code",
                title="VS Code Python LangChain Pipeline",
                category="video",
                format="MP4",
                duration_sec=14.5,
                dimensions="1920x1080",
                file_size_formatted="18.2 MB",
                tags=["code", "python", "langchain", "b_roll"],
                preview_url="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&fit=crop",
                embedding_summary="Screen capture of async Python pipeline running semantic retrieval benchmarks",
                source_context="Recorded in macOS Terminal with clean dark theme",
                created_at=datetime(2026, 9, 30)
            ),
            Asset(
                id="ast_logo_spider",
                title="CreatorAi Spider Emblem High-Res",
                category="logo",
                format="SVG",
                dimensions="1024x1024",
                file_size_formatted="48 KB",
                tags=["brand", "logo", "spider", "neon_red"],
                preview_url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&fit=crop",
                embedding_summary="Electric Spider badge with red and blue neon glow edges",
                source_context="Official brand identity vector asset",
                created_at=datetime(2026, 8, 1)
            ),
            Asset(
                id="ast_audio_whoosh",
                title="Cinematic Spider-Sense Web Impact SFX",
                category="audio",
                format="WAV",
                duration_sec=1.2,
                file_size_formatted="512 KB",
                tags=["sfx", "web_shoot", "whoosh", "impact"],
                preview_url="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&fit=crop",
                embedding_summary="Sub-bass impact with high-frequency electric web snap",
                source_context="Custom sound design for hook punch-in moments",
                created_at=datetime(2026, 8, 15)
            ),
            Asset(
                id="ast_benchmark_chart",
                title="pgvector vs Pinecone vs Qdrant 99th Percentile Latency",
                category="screenshot",
                format="PNG",
                dimensions="2560x1440",
                file_size_formatted="1.8 MB",
                tags=["benchmark", "metrics", "latency", "pgvector"],
                preview_url="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop",
                embedding_summary="Comparative bar chart showing queries per second and p99 latency in milliseconds",
                source_context="Extracted from production locust benchmark test run",
                created_at=datetime(2026, 10, 1)
            )
        ]

    @staticmethod
    def get_demo_creator_memory() -> CreatorMemory:
        return CreatorMemory(
            id="mem_alex_carter",
            user_id="usr_alex_carter",
            creator_name="Alex Carter",
            tone=ToneProfile(
                educational=96,
                conversational=84,
                technical=95,
                humorous=58,
                storytelling=76
            ),
            hook_style_preferred="Contrarian Technical Problem Statement (first 2.5s)",
            cta_style_preferred="Technical Discussion Prompt / Architecture DM Trigger",
            caption_preset="Spider Red Kinetic Glow with Highlight Pop",
            brand_primary_hex="#E5092F",
            brand_secondary_hex="#1769FF",
            brand_font="Outfit",
            preferred_clip_length_sec=42,
            auto_broll_frequency="Every 5 to 7 seconds",
            pacing_preset="Sub-second breath trimming (Fast Technical)",
            niche_topics=["RAG Systems", "Vector Databases", "LLM Evals", "Full-Stack AI", "pgvector", "Python"]
        )

    @staticmethod
    def get_demo_analytics() -> AnalyticsData:
        return AnalyticsData(
            total_views="1,482,900",
            total_watch_time="68,450 hrs",
            avg_retention_percent=78,
            likes="124,500",
            shares="38,200",
            saves="52,100",
            retention_curve=[
                {"second": 0, "retention": 100},
                {"second": 3, "retention": 94},
                {"second": 8, "retention": 89},
                {"second": 15, "retention": 84},
                {"second": 25, "retention": 80},
                {"second": 35, "retention": 76},
                {"second": 42, "retention": 72}
            ],
            topic_performance=[
                TopicMetric(topic="RAG Systems", score=96, views=580000, completion_rate=82),
                TopicMetric(topic="AI Agents", score=89, views=410000, completion_rate=77),
                TopicMetric(topic="Vector DBs", score=94, views=320000, completion_rate=80),
                TopicMetric(topic="Python Architecture", score=78, views=172900, completion_rate=69)
            ],
            hook_performance=[
                HookPerformance(hook_type="Contrarian Problem Statement", retention_percent=91, sample_size=18),
                HookPerformance(hook_type="Question & Mystery Hook", retention_percent=82, sample_size=12),
                HookPerformance(hook_type="Tutorial Direct How-To", retention_percent=85, sample_size=15),
                HookPerformance(hook_type="Story & Case Study", retention_percent=76, sample_size=8)
            ],
            insights=[
                SpiderSenseInsight(
                    id="ins_01",
                    title="Contrarian Technical Openings Outperform By +18% Retention",
                    observations=[
                        "Videos beginning with a direct refutation of common practice hold 91% through second 5.",
                        "Average save rate on contrarian architecture clips is 3.4x higher than standard tutorials.",
                        "Optimal duration sweet spot is 38 to 44 seconds."
                    ],
                    action_cta="Apply Contrarian Hook to Clip #2",
                    category="hook",
                    action_route="/projects/proj_rag_master/clips"
                ),
                SpiderSenseInsight(
                    id="ins_02",
                    title="B-Roll Code Insertion at Second 8 Prevents Drop-off",
                    observations=[
                        "Audience drop-off halts when dynamic IDE code or architectural diagram appears before second 10.",
                        "Spider Red kinetic captions increase mute-mode completion by 41%."
                    ],
                    action_cta="Auto-Apply B-Roll in Web Studio",
                    category="retention",
                    action_route="/projects/proj_rag_master/editor"
                ),
                SpiderSenseInsight(
                    id="ins_03",
                    title="LinkedIn Repurposing Generates 4.2x More High-Intent Inbound",
                    observations=[
                        "Technical architecture carousel & code snippets on LinkedIn driving 64% of profile clicks.",
                        "Highest performing caption format: Bulleted technical post-mortem."
                    ],
                    action_cta="Review LinkedIn Draft Pack",
                    category="platform",
                    action_route="/projects/proj_rag_master/repurpose"
                )
            ]
        )

    @staticmethod
    def get_demo_notifications() -> List[SpiderSenseNotification]:
        return [
            SpiderSenseNotification(
                id="notif_001",
                type="opportunity",
                title="🕷 SPIDER-SENSE: High-Value Clip Detected",
                message="Clip #1 'The Big RAG Mistake' scored 96% hook strength and 97% audio fidelity.",
                confidence=96,
                timestamp="2 mins ago",
                action_label="Inspect Clip",
                target_route="/projects/proj_rag_master/clips"
            ),
            SpiderSenseNotification(
                id="notif_002",
                type="connection",
                title="🕸 SCRIPT ALIGNED TO RECORDING",
                message="Matched 6 script sections with 94% average confidence across 45 min footage.",
                confidence=94,
                timestamp="12 mins ago",
                action_label="View Alignment",
                target_route="/projects/proj_rag_master/alignment"
            ),
            SpiderSenseNotification(
                id="notif_003",
                type="performance",
                title="🔥 RETENTION PEAK ALERT",
                message="Your latest Reel on Vector Database Latency hit 91% 30-second retention.",
                confidence=91,
                timestamp="1 hour ago",
                action_label="See Analytics",
                target_route="/analytics"
            ),
            SpiderSenseNotification(
                id="notif_004",
                type="review",
                title="⚠ QUALITY SENSE: Improvised Section Detected",
                message="Scene 3 contains 52 seconds of unscripted live debugging. Auto-split generated.",
                confidence=88,
                timestamp="3 hours ago",
                action_label="Review Scene",
                target_route="/projects/proj_rag_master/analysis"
            )
        ]
