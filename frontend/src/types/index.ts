export interface ScriptSection {
  id: string;
  type: 'hook' | 'intro' | 'core_point' | 'technical_deepdive' | 'example' | 'cta' | 'conclusion';
  title: string;
  content: string;
  estimated_duration_sec: number;
  target_emotion?: string;
  key_terms: string[];
}

export interface Script {
  id: string;
  project_id: string;
  title: string;
  sections: ScriptSection[];
  total_words: number;
  created_at: string;
  updated_at: string;
}

export interface TranscriptSegment {
  id: string;
  start: number;
  end: number;
  speaker: string;
  text: string;
  confidence: number;
}

export interface Scene {
  id: string;
  scene_number: number;
  start: number;
  end: number;
  duration: number;
  description: string;
  visual_tags: string[];
  energy_score: number;
  speaker_detected?: boolean;
  keyframe_url?: string;
}

export interface Recording {
  id: string;
  project_id: string;
  filename: string;
  duration_sec: number;
  duration_formatted: string;
  words_count: number;
  scenes_count: number;
  speakers_count: number;
  video_url: string;
  audio_url?: string;
  status: 'uploading' | 'analyzing' | 'ready' | 'failed';
  created_at: string;
}

export interface MatchBreakdown {
  semantic: number;
  visual: number;
  audio: number;
  completeness: number;
}

export interface AlignmentMatch {
  id: string;
  script_section_id: string;
  script_section_title: string;
  recording_id: string;
  start_time: number;
  end_time: number;
  timestamp_formatted: string;
  overall_match_score: number;
  breakdown: MatchBreakdown;
  why_matches: string[];
  matched_transcript: string;
  is_improvised?: boolean;
  alternative_matches_count?: number;
}

export interface ClipMetrics {
  hook_strength: number;
  content_completeness: number;
  topic_relevance: number;
  visual_quality: number;
  audio_quality: number;
  self_containedness: number;
}

export interface ClipCandidate {
  id: string;
  project_id: string;
  clip_number: number;
  title: string;
  hook_sentence: string;
  source_recording_id: string;
  source_script_section_id: string;
  start_time: number;
  end_time: number;
  duration_sec: number;
  timestamp_formatted: string;
  metrics: ClipMetrics;
  overall_score: number;
  topic_tags: string[];
  suggested_aspect_ratio: '9:16' | '16:9' | '4:5' | '1:1';
  summary: string;
  transcript_preview: string;
}

export interface EditOperation {
  id: string;
  type: 'trim' | 'crop' | 'zoom' | 'captions' | 'b_roll' | 'text_overlay' | 'audio_boost' | 'remove_silence';
  description: string;
  source_start?: number;
  source_end?: number;
  timeline_start: number;
  timeline_end: number;
  properties?: Record<string, any>;
  active: boolean;
}

export interface EditTrackItem {
  id: string;
  start: number;
  duration: number;
  source_start?: number;
  source_end?: number;
  title?: string;
  text?: string;
  highlight_word?: string;
  color?: string;
  scale?: number;
  opacity?: number;
  volume?: number;
  transition?: string;
  aspect?: string;
}

export interface EditTrack {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'captions' | 'b_roll' | 'text' | 'effects';
  muted?: boolean;
  locked?: boolean;
  items: EditTrackItem[];
}

export interface EditPlan {
  id: string;
  clip_candidate_id?: string;
  project_id: string;
  version: number;
  title: string;
  format: '9:16' | '16:9' | '4:5' | '1:1';
  duration_sec: number;
  tracks: EditTrack[];
  operations: EditOperation[];
  source_video_url: string;
  source_start: number;
  source_end: number;
  author: string;
  changelog: string;
  created_at: string;
  updated_at: string;
}

export interface RepurposedContentItem {
  id: string;
  project_id: string;
  source_clip_id: string;
  source_script_section: string;
  platform: 'youtube_shorts' | 'instagram_reels' | 'tiktok' | 'linkedin' | 'x_thread' | 'youtube_long';
  aspect_ratio: '9:16' | '16:9' | '4:5' | '1:1';
  headline_hook: string;
  primary_copy: string;
  hashtags: string[];
  cta: string;
  scheduled_date?: string;
  status: 'draft' | 'scheduled' | 'published';
  duration_sec?: number;
  performance_score?: number;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'mission' | 'script' | 'section' | 'recording' | 'scene' | 'clip' | 'repurpose' | 'asset';
  subtext?: string;
  status?: string;
  metrics?: Record<string, any>;
  parent_id?: string;
  metadata?: Record<string, any>;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: string;
  strength?: number;
}

export interface ContentGraph {
  project_id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface Asset {
  id: string;
  title: string;
  category: 'video' | 'image' | 'audio' | 'b_roll' | 'screenshot' | 'logo' | 'document';
  format: string;
  dimensions?: string;
  duration_sec?: number;
  file_size_formatted: string;
  tags: string[];
  preview_url: string;
  embedding_summary: string;
  source_context: string;
  created_at: string;
}

export interface ToneProfile {
  educational: number;
  conversational: number;
  technical: number;
  humorous: number;
  storytelling: number;
}

export interface CreatorMemory {
  id: string;
  user_id: string;
  creator_name: string;
  tone: ToneProfile;
  hook_style_preferred: string;
  cta_style_preferred: string;
  caption_preset: string;
  brand_primary_hex: string;
  brand_secondary_hex: string;
  brand_font: string;
  preferred_clip_length_sec: number;
  auto_broll_frequency: string;
  pacing_preset: string;
  niche_topics: string[];
}

export interface TopicMetric {
  topic: string;
  score: number;
  views: number;
  completion_rate: number;
}

export interface HookPerformance {
  hook_type: string;
  retention_percent: number;
  sample_size: number;
}

export interface SpiderSenseInsight {
  id: string;
  title: string;
  observations: string[];
  action_cta: string;
  category: 'opportunity' | 'retention' | 'hook' | 'platform';
  action_route: string;
}

export interface AnalyticsData {
  total_views: string;
  total_watch_time: string;
  avg_retention_percent: number;
  likes: string;
  shares: string;
  saves: string;
  retention_curve: { second: number; retention: number }[];
  topic_performance: TopicMetric[];
  hook_performance: HookPerformance[];
  insights: SpiderSenseInsight[];
}

export interface SpiderSenseNotification {
  id: string;
  type: 'opportunity' | 'processing' | 'connection' | 'performance' | 'review';
  title: string;
  message: string;
  confidence?: number;
  timestamp: string;
  action_label?: string;
  target_route?: string;
  read: boolean;
}

export interface Project {
  id: string;
  title: string;
  niche: string;
  description: string;
  thumbnail_url: string;
  duration_formatted: string;
  status: 'analyzing' | 'ready' | 'in_progress' | 'completed';
  analysis_progress: number;
  clips_count: number;
  repurposed_count: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  niche: string;
  preferred_platforms: string[];
  created_at: string;
  avatar_url?: string;
}
