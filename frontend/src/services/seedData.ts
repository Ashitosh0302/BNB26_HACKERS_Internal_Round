import {
  Project, Script, Recording, Scene, AlignmentMatch,
  ClipCandidate, EditPlan, RepurposedContentItem,
  ContentGraph, Asset, CreatorMemory, AnalyticsData,
  SpiderSenseNotification, User
} from '../types';

export const DEMO_USER: User = {
  id: 'usr_alex_carter',
  email: 'alex@creatorai.studio',
  name: 'Alex Carter',
  niche: 'AI Systems & LLM Architecture',
  preferred_platforms: ['YouTube', 'LinkedIn', 'Instagram', 'TikTok', 'X'],
  created_at: '2026-01-15T00:00:00Z',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
};

export const DEMO_PROJECT: Project = {
  id: 'proj_rag_master',
  title: 'Building a Production RAG System',
  niche: 'AI & Systems Engineering',
  description: 'Deep dive recording into high-throughput hybrid vector retrieval, chunking strategies, parent-document stores, and low-latency pgvector indexing.',
  thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop',
  duration_formatted: '45:12',
  status: 'ready',
  analysis_progress: 100,
  clips_count: 12,
  repurposed_count: 15,
  created_at: '2026-10-01T14:20:00Z',
  updated_at: '2026-10-03T22:15:00Z'
};

export const DEMO_PROJECTS_LIST: Project[] = [
  DEMO_PROJECT,
  {
    id: 'proj_agents_prod',
    title: 'Autonomous AI Agent Loops in Production',
    niche: 'AI Systems',
    description: 'Architecture guide to multi-agent communication, tool use failure states, and deterministic checkpointing.',
    thumbnail_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&fit=crop',
    duration_formatted: '32:10',
    status: 'ready',
    analysis_progress: 100,
    clips_count: 8,
    repurposed_count: 10,
    created_at: '2026-09-20T00:00:00Z',
    updated_at: '2026-09-25T00:00:00Z'
  },
  {
    id: 'proj_local_llm',
    title: 'Running 70B Models Locally on Apple Silicon',
    niche: 'Hardware & AI',
    description: 'MLX and llama.cpp performance benchmarks, memory bandwidth optimization, and quantization tradeoffs.',
    thumbnail_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&fit=crop',
    duration_formatted: '28:45',
    status: 'in_progress',
    analysis_progress: 85,
    clips_count: 6,
    repurposed_count: 6,
    created_at: '2026-09-28T00:00:00Z',
    updated_at: '2026-10-02T00:00:00Z'
  }
];

export const DEMO_RECORDING: Recording = {
  id: 'rec_rag_01',
  project_id: 'proj_rag_master',
  filename: 'production_rag_masterclass_4k.mp4',
  duration_sec: 2712.0,
  duration_formatted: '45:12',
  words_count: 6842,
  scenes_count: 54,
  speakers_count: 2,
  video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  status: 'ready',
  created_at: '2026-10-01T14:30:00Z'
};

export const DEMO_SCRIPT: Script = {
  id: 'scr_rag_01',
  project_id: 'proj_rag_master',
  title: 'Production RAG: Complete Architecture Script',
  total_words: 2140,
  created_at: '2026-10-01T10:00:00Z',
  updated_at: '2026-10-02T16:45:00Z',
  sections: [
    {
      id: 'sec_01',
      type: 'hook',
      title: '1. The Big RAG Illusion',
      content: 'Most developers misunderstand RAG. They think vector search is magic, but in reality, 80% of hallucination bugs happen right at the chunking boundary.',
      estimated_duration_sec: 18,
      target_emotion: 'curiosity',
      key_terms: ['RAG', 'Vector Search', 'Chunking', 'Hallucination']
    },
    {
      id: 'sec_02',
      type: 'intro',
      title: '2. High-Dimensional Vector Embeddings',
      content: 'Vector databases allow semantic search by converting unstructured text into dense mathematical embeddings. When words have similar semantic meaning, their vectors cluster together in high-dimensional space.',
      estimated_duration_sec: 50,
      target_emotion: 'clarity',
      key_terms: ['Embeddings', 'Cosine Similarity', 'Vector Space']
    },
    {
      id: 'sec_03',
      type: 'core_point',
      title: '3. The Chunking Boundary Trap',
      content: 'When you slice a paragraph at arbitrary 500 tokens, you destroy cross-sentence pronouns and context. The fix is parent-document retrieval: index small chunks, but inject full parent documents into the prompt.',
      estimated_duration_sec: 56,
      target_emotion: 'enlightenment',
      key_terms: ['Parent-Document', 'Token Splitter', 'Context Window']
    },
    {
      id: 'sec_04',
      type: 'technical_deepdive',
      title: '4. Benchmarking Latency: 240ms to 14ms',
      content: 'Look at this benchmark: query latency dropped from 240ms down to 14ms once we added hierarchical HNSW indexing with pgvector and quantized embeddings.',
      estimated_duration_sec: 42,
      target_emotion: 'validation',
      key_terms: ['pgvector', 'HNSW Index', 'Quantization', 'Latency']
    },
    {
      id: 'sec_05',
      type: 'example',
      title: '5. Hybrid Search: BM25 + Dense Vectors',
      content: 'If a user searches for an exact alphanumeric part number or error code, pure semantic vectors often miss. Hybrid search with reciprocal rank fusion ensures 99.8% precision.',
      estimated_duration_sec: 45,
      target_emotion: 'practical_utility',
      key_terms: ['Hybrid Search', 'BM25', 'Reciprocal Rank Fusion']
    },
    {
      id: 'sec_06',
      type: 'cta',
      title: '6. Production Checklist & Next Steps',
      content: "Drop a comment below with 'RAG' and I'll send you our production architecture diagram and SQL migration scripts. Subscribe to follow the series!",
      estimated_duration_sec: 20,
      target_emotion: 'action',
      key_terms: ['Architecture Diagram', 'Subscribe', 'Comments']
    }
  ]
};

export const DEMO_SCENES: Scene[] = [
  {
    id: 'sc_01',
    scene_number: 1,
    start: 0.0,
    end: 42.0,
    duration: 42.0,
    description: 'Talking head: Alex Carter introduces the core premise and hook with high visual energy.',
    visual_tags: ['speaker', 'talking_head', 'direct_eye_contact', 'hook'],
    energy_score: 95.0,
    speaker_detected: true
  },
  {
    id: 'sc_02',
    scene_number: 2,
    start: 42.0,
    end: 125.0,
    duration: 83.0,
    description: 'Screen Share: Interactive 3D vector embedding cluster animation and cosine distance formula.',
    visual_tags: ['diagram', 'whiteboard', 'vector_space', 'math'],
    energy_score: 88.5,
    speaker_detected: false
  },
  {
    id: 'sc_03',
    scene_number: 3,
    start: 125.0,
    end: 280.0,
    duration: 155.0,
    description: 'Live coding session: Python LangChain ParentDocumentRetriever implementation and test run.',
    visual_tags: ['terminal', 'vscode', 'python', 'code', 'typing'],
    energy_score: 92.0,
    speaker_detected: false
  },
  {
    id: 'sc_04',
    scene_number: 4,
    start: 280.0,
    end: 410.0,
    duration: 130.0,
    description: 'Terminal benchmark output: Latency comparisons showing p99 dropping from 240ms to 14ms with pgvector.',
    visual_tags: ['benchmark', 'metrics', 'terminal', 'charts'],
    energy_score: 96.5,
    speaker_detected: false
  }
];

export const DEMO_ALIGNMENT_MATCHES: AlignmentMatch[] = [
  {
    id: 'align_001',
    script_section_id: 'sec_01',
    script_section_title: '1. The Big RAG Illusion',
    recording_id: 'rec_rag_01',
    start_time: 0.0,
    end_time: 18.5,
    timestamp_formatted: '00:00:00 → 00:00:18',
    overall_match_score: 96,
    breakdown: { semantic: 98, visual: 94, audio: 97, completeness: 95 },
    why_matches: [
      "Exact phrase match on 'misunderstand vector search'",
      'High visual energy and direct camera eye contact',
      'Crisp studio audio without background noise',
      'Complete grammatical thought without mid-sentence cut'
    ],
    matched_transcript: 'Most developers misunderstand RAG. They think vector search is magic, but in reality, 80% of hallucination bugs happen right at the chunking boundary.',
    is_improvised: false,
    alternative_matches_count: 2
  },
  {
    id: 'align_002',
    script_section_id: 'sec_02',
    script_section_title: '2. High-Dimensional Vector Embeddings',
    recording_id: 'rec_rag_01',
    start_time: 18.5,
    end_time: 68.2,
    timestamp_formatted: '00:00:18 → 00:01:08',
    overall_match_score: 94,
    breakdown: { semantic: 95, visual: 96, audio: 93, completeness: 92 },
    why_matches: [
      'Semantic similarity: 95% on high-dimensional embeddings',
      'Screen share shows interactive 3D embedding projector diagram',
      'Speaker points directly to cluster outlier'
    ],
    matched_transcript: 'Vector databases allow semantic search by converting unstructured text into dense mathematical embeddings. When words have similar semantic meaning, their vectors cluster together.',
    is_improvised: false,
    alternative_matches_count: 1
  },
  {
    id: 'align_003',
    script_section_id: 'sec_03',
    script_section_title: '3. The Chunking Boundary Trap',
    recording_id: 'rec_rag_01',
    start_time: 68.2,
    end_time: 124.0,
    timestamp_formatted: '00:01:08 → 00:02:04',
    overall_match_score: 91,
    breakdown: { semantic: 92, visual: 91, audio: 94, completeness: 88 },
    why_matches: [
      'Improvised live coding section detected and aligned to script outline',
      'Terminal output clearly legible on 1080p frame',
      'Code snippet matches Python LangChain text splitter pattern'
    ],
    matched_transcript: "Here is the fix: don't use arbitrary 500-token chunks. Use parent-document retrieval so the embedding search happens on small snippets, but the LLM receives the full rich context.",
    is_improvised: true,
    alternative_matches_count: 2
  },
  {
    id: 'align_004',
    script_section_id: 'sec_04',
    script_section_title: '4. Benchmarking Latency: 240ms to 14ms',
    recording_id: 'rec_rag_01',
    start_time: 124.0,
    end_time: 166.0,
    timestamp_formatted: '00:02:04 → 00:02:46',
    overall_match_score: 93,
    breakdown: { semantic: 94, visual: 93, audio: 96, completeness: 89 },
    why_matches: [
      'Screen captures benchmark table comparing Qdrant, Pinecone, and pgvector',
      'Speaker highlights 99th percentile query time at 14ms',
      'Clear voice projection and concise takeaway'
    ],
    matched_transcript: 'Look at this benchmark: query latency dropped from 240ms down to 14ms once we added hierarchical HNSW indexing with pgvector.',
    is_improvised: false,
    alternative_matches_count: 1
  }
];

export const DEMO_CLIPS: ClipCandidate[] = [
  {
    id: 'clip_001',
    project_id: 'proj_rag_master',
    clip_number: 1,
    title: 'The #1 Vector DB Mistake Destroying Your App',
    hook_sentence: 'Most developers misunderstand RAG.',
    source_recording_id: 'rec_rag_01',
    source_script_section_id: 'sec_01',
    start_time: 0.0,
    end_time: 42.0,
    duration_sec: 42.0,
    timestamp_formatted: '00:00:00 → 00:00:42',
    metrics: {
      hook_strength: 96,
      content_completeness: 94,
      topic_relevance: 98,
      visual_quality: 92,
      audio_quality: 97,
      self_containedness: 95
    },
    overall_score: 95,
    topic_tags: ['RAG', 'Vector Search', 'Engineering'],
    suggested_aspect_ratio: '9:16',
    summary: 'Explains why 80% of RAG hallucinations stem from poor chunking rather than the LLM model.',
    transcript_preview: 'Most developers think vector search is magic. In reality, chunk boundary truncation ruins context.'
  },
  {
    id: 'clip_002',
    project_id: 'proj_rag_master',
    clip_number: 2,
    title: 'Parent-Child Document Retrieval in 30 Seconds',
    hook_sentence: 'Stop feeding 500-token arbitrary chunks to your LLM.',
    source_recording_id: 'rec_rag_01',
    source_script_section_id: 'sec_03',
    start_time: 68.0,
    end_time: 103.0,
    duration_sec: 35.0,
    timestamp_formatted: '00:01:08 → 00:01:43',
    metrics: {
      hook_strength: 91,
      content_completeness: 92,
      topic_relevance: 95,
      visual_quality: 90,
      audio_quality: 94,
      self_containedness: 91
    },
    overall_score: 92,
    topic_tags: ['Architecture', 'LangChain', 'Production'],
    suggested_aspect_ratio: '9:16',
    summary: 'A practical breakdown of parent-child retrieval pattern to keep search fast and context complete.',
    transcript_preview: 'Search on small vectors, but pass the parent document to Claude or GPT. It cuts hallucination by 60%.'
  },
  {
    id: 'clip_003',
    project_id: 'proj_rag_master',
    clip_number: 3,
    title: 'How We Dropped RAG Latency From 240ms to 14ms',
    hook_sentence: 'Why does your vector database feel sluggish?',
    source_recording_id: 'rec_rag_01',
    source_script_section_id: 'sec_04',
    start_time: 124.0,
    end_time: 162.0,
    duration_sec: 38.0,
    timestamp_formatted: '00:02:04 → 00:02:42',
    metrics: {
      hook_strength: 93,
      content_completeness: 90,
      topic_relevance: 94,
      visual_quality: 94,
      audio_quality: 96,
      self_containedness: 93
    },
    overall_score: 93,
    topic_tags: ['Latency', 'pgvector', 'HNSW'],
    suggested_aspect_ratio: '9:16',
    summary: 'Reveals the exact index tuning parameters that slashed production query latency by 17x.',
    transcript_preview: 'Here is the exact SQL command with pgvector and HNSW index parameters that slashed latency.'
  },
  {
    id: 'clip_004',
    project_id: 'proj_rag_master',
    clip_number: 4,
    title: 'Semantic vs Lexical: Why You Need Hybrid Search',
    hook_sentence: 'Pure vector search fails when searching for exact part numbers or code symbols.',
    source_recording_id: 'rec_rag_01',
    source_script_section_id: 'sec_02',
    start_time: 210.0,
    end_time: 255.0,
    duration_sec: 45.0,
    timestamp_formatted: '00:03:30 → 00:04:15',
    metrics: {
      hook_strength: 88,
      content_completeness: 93,
      topic_relevance: 92,
      visual_quality: 89,
      audio_quality: 95,
      self_containedness: 89
    },
    overall_score: 91,
    topic_tags: ['Hybrid Search', 'BM25', 'Reciprocal Rank'],
    suggested_aspect_ratio: '9:16',
    summary: 'Demonstrates why production search systems combine BM25 keyword matching with dense embeddings.',
    transcript_preview: "If a user searches for 'Error 403-B-99', dense embeddings won't find it. BM25 will."
  }
];

export const DEMO_EDIT_PLAN: EditPlan = {
  id: 'plan_clip_001',
  clip_candidate_id: 'clip_001',
  project_id: 'proj_rag_master',
  version: 1,
  title: 'AI Edit: The #1 Vector DB Mistake',
  format: '9:16',
  duration_sec: 42.0,
  source_video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  source_start: 0.0,
  source_end: 42.0,
  author: 'Spider-Sense AI',
  changelog: 'Autonomous draft: trimmed pauses, added kinetic captions & diagram B-roll',
  created_at: '2026-10-02T12:00:00Z',
  updated_at: '2026-10-02T12:00:00Z',
  tracks: [
    {
      id: 'trk_video',
      name: 'VIDEO TRACK',
      type: 'video',
      items: [
        {
          id: 'v_item_1',
          start: 0.0,
          duration: 42.0,
          source_start: 0.0,
          source_end: 42.0,
          scale: 1.15,
          aspect: '9:16'
        }
      ]
    },
    {
      id: 'trk_broll',
      name: 'B-ROLL OVERLAYS',
      type: 'b_roll',
      items: [
        {
          id: 'broll_item_1',
          start: 8.5,
          duration: 5.5,
          title: '3D Vector Space Cluster Animation',
          opacity: 0.95,
          transition: 'spider_web_wipe'
        },
        {
          id: 'broll_item_2',
          start: 22.0,
          duration: 4.0,
          title: 'Terminal Benchmark Latency Waveform',
          opacity: 0.9,
          transition: 'web_dissolve'
        }
      ]
    },
    {
      id: 'trk_captions',
      name: 'DYNAMIC SPIDER CAPTIONS',
      type: 'captions',
      items: [
        { id: 'cap_1', start: 0.0, duration: 2.5, text: 'MOST DEVELOPERS', highlight_word: 'DEVELOPERS', color: '#E5092F' },
        { id: 'cap_2', start: 2.5, duration: 2.5, text: 'MISUNDERSTAND RAG', highlight_word: 'MISUNDERSTAND', color: '#1769FF' },
        { id: 'cap_3', start: 5.0, duration: 4.2, text: '80% of hallucination happens here', highlight_word: '80%', color: '#F2F5F7' },
        { id: 'cap_4', start: 9.2, duration: 4.8, text: 'at the chunking boundary!', highlight_word: 'CHUNKING', color: '#E5092F' }
      ]
    },
    {
      id: 'trk_audio',
      name: 'AUDIO & SFX',
      type: 'audio',
      items: [
        { id: 'aud_voice', start: 0.0, duration: 42.0, title: 'Master Voice Track', volume: 1.0 },
        { id: 'sfx_web_shoot', start: 0.1, duration: 0.8, title: 'Web Shoot Impact', volume: 0.35 },
        { id: 'sfx_spider_radar', start: 8.4, duration: 0.6, title: 'Spider-Sense Ping', volume: 0.4 }
      ]
    }
  ],
  operations: [
    {
      id: 'op_trim_silence',
      type: 'remove_silence',
      description: 'Trim 1.8s hesitation at start',
      timeline_start: 0.0,
      timeline_end: 1.8,
      properties: { threshold_db: -38 },
      active: true
    },
    {
      id: 'op_zoom_hook',
      type: 'zoom',
      description: '1.18x punch-in for opening statement',
      timeline_start: 0.0,
      timeline_end: 6.0,
      properties: { zoom_level: 1.18, center: 'speaker_eyes' },
      active: true
    },
    {
      id: 'op_broll_insert',
      type: 'b_roll',
      description: 'Insert Vector DB Architecture Diagram',
      timeline_start: 8.5,
      timeline_end: 14.0,
      properties: { asset_id: 'ast_diagram_01' },
      active: true
    },
    {
      id: 'op_kinetic_captions',
      type: 'captions',
      description: 'Spider Red word-by-word kinetic captions',
      timeline_start: 0.0,
      timeline_end: 42.0,
      properties: { font: 'Outfit', glow: true, accent_color: '#E5092F' },
      active: true
    }
  ]
};

export const DEMO_REPURPOSED_ITEMS: RepurposedContentItem[] = [
  {
    id: 'rep_yt_shorts',
    project_id: 'proj_rag_master',
    source_clip_id: 'clip_001',
    source_script_section: '1. The Big RAG Illusion',
    platform: 'youtube_shorts',
    aspect_ratio: '9:16',
    headline_hook: 'Stop making this #1 RAG vector search mistake 🛑',
    primary_copy: 'If your LLM hallucinations are spiking, check your chunk size before switching models. Here is the parent-child fix.',
    hashtags: ['#rag', '#ai', '#softwareengineer', '#python', '#coding'],
    cta: 'Subscribe for complete system architecture breakdowns every Tuesday.',
    scheduled_date: '2026-10-06 14:00',
    status: 'scheduled',
    duration_sec: 42,
    performance_score: 94
  },
  {
    id: 'rep_reels',
    project_id: 'proj_rag_master',
    source_clip_id: 'clip_001',
    source_script_section: '1. The Big RAG Illusion',
    platform: 'instagram_reels',
    aspect_ratio: '9:16',
    headline_hook: 'The hidden reason your AI app hallucinates 🧠🕸',
    primary_copy: '80% of engineers blame GPT-4 when their retrieval fails. But the math shows your vector chunking is breaking semantic continuity.',
    hashtags: ['#aiengineering', '#techcreators', '#softwaredeveloper', '#webdev', '#pythondeveloper'],
    cta: "Comment 'VECTOR' and I'll DM you my production retrieval checklist.",
    scheduled_date: '2026-10-07 18:30',
    status: 'scheduled',
    duration_sec: 42,
    performance_score: 96
  },
  {
    id: 'rep_tiktok',
    project_id: 'proj_rag_master',
    source_clip_id: 'clip_001',
    source_script_section: '1. The Big RAG Illusion',
    platform: 'tiktok',
    aspect_ratio: '9:16',
    headline_hook: 'Why developers are building AI RAG all wrong 💀',
    primary_copy: 'Stop feeding 500-token chunks blind into embeddings. Watch how 1 architectural tweak dropped our hallucinations by 60%.',
    hashtags: ['#tech', '#codingtok', '#artificialintelligence', '#learnontiktok', '#programming'],
    cta: 'Follow for more honest AI engineering breakdowns.',
    scheduled_date: '2026-10-08 16:00',
    status: 'draft',
    duration_sec: 42,
    performance_score: 91
  },
  {
    id: 'rep_linkedin',
    project_id: 'proj_rag_master',
    source_clip_id: 'clip_002',
    source_script_section: '3. The Chunking Boundary Trap',
    platform: 'linkedin',
    aspect_ratio: '4:5',
    headline_hook: 'We spent $18k on vector search databases before realizing this architectural flaw.',
    primary_copy: `Most engineering teams treat Vector DBs like a magic box:
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

Full code breakdown in comments 👇`,
    hashtags: ['#ArtificialIntelligence', '#MachineLearning', '#SoftwareArchitecture', '#DataEngineering'],
    cta: 'Repost if this helps your engineering team.',
    scheduled_date: '2026-10-09 09:00',
    status: 'scheduled',
    performance_score: 98
  },
  {
    id: 'rep_x_thread',
    project_id: 'proj_rag_master',
    source_clip_id: 'clip_003',
    source_script_section: '4. Benchmarking Latency',
    platform: 'x_thread',
    aspect_ratio: '1:1',
    headline_hook: '90% of RAG tutorials on YouTube teach you an anti-pattern. 🧵👇',
    primary_copy: `1/7 If you're building production RAG with simple token-based chunking, you're building a hallucination generator.

Here's how to build a production retrieval engine that actually works:

2/7 The Problem:
Vector embeddings compress meaning into geometric points. When you arbitrarily slice sentences at token 500, you sever cross-sentence relationships.

3/7 The Fix: Parent-Child Retrieval.
Store two layers of data:
- Leaf nodes (120 tokens) for high-precision search
- Parent nodes (1000 tokens) linked by foreign keys

4/7 Query executes in 12ms against leaf vectors. But the synthesizer reads the full parent context. Zero hallucination.

5/7 Check the attached video clip for the live benchmark breakdown.`,
    hashtags: ['#buildinpublic', '#ai', '#rag', '#python'],
    cta: 'Bookmark this thread to reference during your next system design review.',
    scheduled_date: '2026-10-09 11:30',
    status: 'draft',
    performance_score: 95
  }
];

export const DEMO_CONTENT_GRAPH: ContentGraph = {
  project_id: 'proj_rag_master',
  nodes: [
    { id: 'node_proj', label: 'Mission: Production RAG', type: 'mission', subtext: 'Master Source Project', status: 'active', x: 450, y: 50 },
    { id: 'node_script', label: 'Script Outline', type: 'script', subtext: '6 structured sections', parent_id: 'node_proj', x: 250, y: 150 },
    { id: 'node_rec', label: 'Raw 4K Recording', type: 'recording', subtext: '45 min, 54 scenes', parent_id: 'node_proj', x: 650, y: 150 },
    
    // Scenes
    { id: 'node_sc_01', label: 'Scene 01: Hook & Cam', type: 'scene', subtext: '00:00 - 00:42', parent_id: 'node_rec', x: 500, y: 260 },
    { id: 'node_sc_02', label: 'Scene 02: Architecture', type: 'scene', subtext: '00:42 - 02:05', parent_id: 'node_rec', x: 650, y: 260 },
    { id: 'node_sc_03', label: 'Scene 03: Live Code', type: 'scene', subtext: '02:05 - 04:40', parent_id: 'node_rec', x: 800, y: 260 },
    
    // Clips
    { id: 'node_clip_1', label: 'Clip #1: RAG Mistake', type: 'clip', subtext: 'Score 95 · 42s', parent_id: 'node_sc_01', x: 380, y: 380, metrics: { hook: 96, audio: 97 } },
    { id: 'node_clip_2', label: 'Clip #2: Parent-Child', type: 'clip', subtext: 'Score 92 · 35s', parent_id: 'node_sc_02', x: 600, y: 380, metrics: { hook: 91, audio: 94 } },
    { id: 'node_clip_3', label: 'Clip #3: 14ms pgvector', type: 'clip', subtext: 'Score 93 · 38s', parent_id: 'node_sc_03', x: 820, y: 380, metrics: { hook: 93, audio: 96 } },
    
    // Repurposed
    { id: 'node_rep_yt', label: 'YouTube Shorts (9:16)', type: 'repurpose', subtext: '42s · Mon 14:00', parent_id: 'node_clip_1', x: 260, y: 500 },
    { id: 'node_rep_ig', label: 'Instagram Reel (9:16)', type: 'repurpose', subtext: '42s · Tue 18:30', parent_id: 'node_clip_1', x: 400, y: 500 },
    { id: 'node_rep_tt', label: 'TikTok (9:16)', type: 'repurpose', subtext: '42s · Wed 16:00', parent_id: 'node_clip_1', x: 540, y: 500 },
    { id: 'node_rep_li', label: 'LinkedIn Post (4:5)', type: 'repurpose', subtext: 'Deep Dive & Code', parent_id: 'node_clip_2', x: 680, y: 500 },
    { id: 'node_rep_x', label: 'X Master Thread', type: 'repurpose', subtext: '7 Tweets + Video', parent_id: 'node_clip_3', x: 820, y: 500 }
  ],
  edges: [
    { id: 'e1', source: 'node_proj', target: 'node_script', relationship: 'decomposes_to' },
    { id: 'e2', source: 'node_proj', target: 'node_rec', relationship: 'recorded_as' },
    { id: 'e3', source: 'node_rec', target: 'node_sc_01', relationship: 'contains_scene' },
    { id: 'e4', source: 'node_rec', target: 'node_sc_02', relationship: 'contains_scene' },
    { id: 'e5', source: 'node_rec', target: 'node_sc_03', relationship: 'contains_scene' },
    { id: 'e6', source: 'node_script', target: 'node_sc_01', relationship: 'aligned_with' },
    { id: 'e7', source: 'node_sc_01', target: 'node_clip_1', relationship: 'extracted_from' },
    { id: 'e8', source: 'node_sc_02', target: 'node_clip_2', relationship: 'extracted_from' },
    { id: 'e9', source: 'node_sc_03', target: 'node_clip_3', relationship: 'extracted_from' },
    { id: 'e10', source: 'node_clip_1', target: 'node_rep_yt', relationship: 'repurposed_into' },
    { id: 'e11', source: 'node_clip_1', target: 'node_rep_ig', relationship: 'repurposed_into' },
    { id: 'e12', source: 'node_clip_1', target: 'node_rep_tt', relationship: 'repurposed_into' },
    { id: 'e13', source: 'node_clip_2', target: 'node_rep_li', relationship: 'repurposed_into' },
    { id: 'e14', source: 'node_clip_3', target: 'node_rep_x', relationship: 'repurposed_into' }
  ]
};

export const DEMO_ASSETS: Asset[] = [
  {
    id: 'ast_diagram_01',
    title: 'Vector Clustering 3D Architecture Diagram',
    category: 'image',
    format: 'PNG',
    dimensions: '3840x2160',
    file_size_formatted: '2.4 MB',
    tags: ['diagram', 'architecture', 'vector_space', 'rag'],
    preview_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&fit=crop',
    embedding_summary: 'Dense vector similarity clustering visualization with cosine distance lines',
    source_context: 'Created in Figma for episode #42 slide deck',
    created_at: '2026-09-28T00:00:00Z'
  },
  {
    id: 'ast_broll_code',
    title: 'VS Code Python LangChain Pipeline',
    category: 'video',
    format: 'MP4',
    duration_sec: 14.5,
    dimensions: '1920x1080',
    file_size_formatted: '18.2 MB',
    tags: ['code', 'python', 'langchain', 'b_roll'],
    preview_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&fit=crop',
    embedding_summary: 'Screen capture of async Python pipeline running semantic retrieval benchmarks',
    source_context: 'Recorded in macOS Terminal with clean dark theme',
    created_at: '2026-09-30T00:00:00Z'
  },
  {
    id: 'ast_logo_spider',
    title: 'CreatorAi Spider Emblem High-Res',
    category: 'logo',
    format: 'SVG',
    dimensions: '1024x1024',
    file_size_formatted: '48 KB',
    tags: ['brand', 'logo', 'spider', 'neon_red'],
    preview_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&fit=crop',
    embedding_summary: 'Electric Spider badge with red and blue neon glow edges',
    source_context: 'Official brand identity vector asset',
    created_at: '2026-08-01T00:00:00Z'
  },
  {
    id: 'ast_audio_whoosh',
    title: 'Cinematic Spider-Sense Web Impact SFX',
    category: 'audio',
    format: 'WAV',
    duration_sec: 1.2,
    file_size_formatted: '512 KB',
    tags: ['sfx', 'web_shoot', 'whoosh', 'impact'],
    preview_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&fit=crop',
    embedding_summary: 'Sub-bass impact with high-frequency electric web snap',
    source_context: 'Custom sound design for hook punch-in moments',
    created_at: '2026-08-15T00:00:00Z'
  },
  {
    id: 'ast_benchmark_chart',
    title: 'pgvector vs Pinecone vs Qdrant 99th Percentile Latency',
    category: 'screenshot',
    format: 'PNG',
    dimensions: '2560x1440',
    file_size_formatted: '1.8 MB',
    tags: ['benchmark', 'metrics', 'latency', 'pgvector'],
    preview_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop',
    embedding_summary: 'Comparative bar chart showing queries per second and p99 latency in milliseconds',
    source_context: 'Extracted from production locust benchmark test run',
    created_at: '2026-10-01T00:00:00Z'
  }
];

export const DEMO_CREATOR_MEMORY: CreatorMemory = {
  id: 'mem_alex_carter',
  user_id: 'usr_alex_carter',
  creator_name: 'Alex Carter',
  tone: {
    educational: 96,
    conversational: 84,
    technical: 95,
    humorous: 58,
    storytelling: 76
  },
  hook_style_preferred: 'Contrarian Technical Problem Statement (first 2.5s)',
  cta_style_preferred: 'Technical Discussion Prompt / Architecture DM Trigger',
  caption_preset: 'Spider Red Kinetic Glow with Highlight Pop',
  brand_primary_hex: '#E5092F',
  brand_secondary_hex: '#1769FF',
  brand_font: 'Outfit',
  preferred_clip_length_sec: 42,
  auto_broll_frequency: 'Every 5 to 7 seconds',
  pacing_preset: 'Sub-second breath trimming (Fast Technical)',
  niche_topics: ['RAG Systems', 'Vector Databases', 'LLM Evals', 'Full-Stack AI', 'pgvector', 'Python']
};

export const DEMO_ANALYTICS: AnalyticsData = {
  total_views: '1,482,900',
  total_watch_time: '68,450 hrs',
  avg_retention_percent: 78,
  likes: '124,500',
  shares: '38,200',
  saves: '52,100',
  retention_curve: [
    { second: 0, retention: 100 },
    { second: 3, retention: 94 },
    { second: 8, retention: 89 },
    { second: 15, retention: 84 },
    { second: 25, retention: 80 },
    { second: 35, retention: 76 },
    { second: 42, retention: 72 }
  ],
  topic_performance: [
    { topic: 'RAG Systems', score: 96, views: 580000, completion_rate: 82 },
    { topic: 'AI Agents', score: 89, views: 410000, completion_rate: 77 },
    { topic: 'Vector DBs', score: 94, views: 320000, completion_rate: 80 },
    { topic: 'Python Architecture', score: 78, views: 172900, completion_rate: 69 }
  ],
  hook_performance: [
    { hook_type: 'Contrarian Problem Statement', retention_percent: 91, sample_size: 18 },
    { hook_type: 'Question & Mystery Hook', retention_percent: 82, sample_size: 12 },
    { hook_type: 'Tutorial Direct How-To', retention_percent: 85, sample_size: 15 },
    { hook_type: 'Story & Case Study', retention_percent: 76, sample_size: 8 }
  ],
  insights: [
    {
      id: 'ins_01',
      title: 'Contrarian Technical Openings Outperform By +18% Retention',
      observations: [
        'Videos beginning with a direct refutation of common practice hold 91% through second 5.',
        'Average save rate on contrarian architecture clips is 3.4x higher than standard tutorials.',
        'Optimal duration sweet spot is 38 to 44 seconds.'
      ],
      action_cta: 'Apply Contrarian Hook to Clip #2',
      category: 'hook',
      action_route: '/projects/proj_rag_master/clips'
    },
    {
      id: 'ins_02',
      title: 'B-Roll Code Insertion at Second 8 Prevents Drop-off',
      observations: [
        'Audience drop-off halts when dynamic IDE code or architectural diagram appears before second 10.',
        'Spider Red kinetic captions increase mute-mode completion by 41%.'
      ],
      action_cta: 'Auto-Apply B-Roll in Web Studio',
      category: 'retention',
      action_route: '/projects/proj_rag_master/editor'
    },
    {
      id: 'ins_03',
      title: 'LinkedIn Repurposing Generates 4.2x More High-Intent Inbound',
      observations: [
        'Technical architecture carousel & code snippets on LinkedIn driving 64% of profile clicks.',
        'Highest performing caption format: Bulleted technical post-mortem.'
      ],
      action_cta: 'Review LinkedIn Draft Pack',
      category: 'platform',
      action_route: '/projects/proj_rag_master/repurpose'
    }
  ]
};

export const DEMO_NOTIFICATIONS: SpiderSenseNotification[] = [
  {
    id: 'notif_001',
    type: 'opportunity',
    title: '🕷 SPIDER-SENSE: High-Value Clip Detected',
    message: "Clip #1 'The Big RAG Mistake' scored 96% hook strength and 97% audio fidelity.",
    confidence: 96,
    timestamp: '2 mins ago',
    action_label: 'Inspect Clip',
    target_route: '/projects/proj_rag_master/clips',
    read: false
  },
  {
    id: 'notif_002',
    type: 'connection',
    title: '🕸 SCRIPT ALIGNED TO RECORDING',
    message: 'Matched 6 script sections with 94% average confidence across 45 min footage.',
    confidence: 94,
    timestamp: '12 mins ago',
    action_label: 'View Alignment',
    target_route: '/projects/proj_rag_master/alignment',
    read: false
  },
  {
    id: 'notif_003',
    type: 'performance',
    title: '🔥 RETENTION PEAK ALERT',
    message: 'Your latest Reel on Vector Database Latency hit 91% 30-second retention.',
    confidence: 91,
    timestamp: '1 hour ago',
    action_label: 'See Analytics',
    target_route: '/analytics',
    read: false
  },
  {
    id: 'notif_004',
    type: 'review',
    title: '⚠ QUALITY SENSE: Improvised Section Detected',
    message: 'Scene 3 contains 52 seconds of unscripted live debugging. Auto-split generated.',
    confidence: 88,
    timestamp: '3 hours ago',
    action_label: 'Review Scene',
    target_route: '/projects/proj_rag_master/analysis',
    read: true
  }
];
