import React, { useState } from 'react';
import { useProjectStore } from '../stores/useProjectStore';
import { useUIStore } from '../stores/useUIStore';
import {
  Cpu, Clock, FileText, Film, Users, Sparkles,
  Flame, ArrowRight, CheckCircle2, ChevronRight, Activity
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const AIAnalysis: React.FC = () => {
  const { recording, scenes } = useProjectStore();
  const { setActiveTab } = useUIStore();

  const [activeTopic, setActiveTopic] = useState('Vector Databases');

  const topics = [
    { name: 'RAG Architecture', subnodes: ['Hierarchical Indexing', 'Context Boundaries', 'Chunk Splitters'], score: 98 },
    { name: 'Vector Databases', subnodes: ['pgvector', 'HNSW Graph Search', 'Cosine Metric'], score: 95 },
    { name: 'Embeddings & Geometry', subnodes: ['Dense Vectors', 'High-Dimensional Clusters', 'Quantization'], score: 92 },
    { name: 'Hybrid Retrieval', subnodes: ['BM25 Keyword', 'Reciprocal Rank Fusion', 'Re-ranking'], score: 94 },
    { name: 'Latency Benchmarking', subnodes: ['240ms to 14ms', 'p99 Queries/sec', 'Memory Bandwidth'], score: 96 }
  ];

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>VIDEO TELEMETRY · SPIDER SCAN MULTIMODAL AUDIT</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            MULTIMODAL FOOTAGE ANALYSIS
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            4K video frame OCR, speaker diarization, topic map clustering, and acoustic clarity.
          </p>
        </div>

        <button
          onClick={() => {
            spiderSound.playSpiderSense();
            setActiveTab('alignment');
          }}
          className="web-button-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer self-start md:self-auto"
        >
          <span>VIEW SCRIPT ↔ FOOTAGE ALIGNMENT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6 Key Video Telemetry HUD Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
        <div className="spider-panel p-4 bg-[#071426]">
          <div className="text-[10px] font-mono text-[#8E9BAE] flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-[#1769FF]" />
            <span>DURATION</span>
          </div>
          <div className="text-xl font-bold font-['Outfit'] text-white mt-1">
            {recording.duration_formatted}
          </div>
          <div className="text-[10px] font-mono text-[#1769FF]">2,712 seconds</div>
        </div>

        <div className="spider-panel p-4 bg-[#071426]">
          <div className="text-[10px] font-mono text-[#8E9BAE] flex items-center space-x-1">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>WORDS</span>
          </div>
          <div className="text-xl font-bold font-['Outfit'] text-white mt-1">
            {recording.words_count.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono text-emerald-400">151 WPM pacing</div>
        </div>

        <div className="spider-panel p-4 bg-[#071426]">
          <div className="text-[10px] font-mono text-[#8E9BAE] flex items-center space-x-1">
            <Film className="w-3.5 h-3.5 text-[#E5092F]" />
            <span>SCENES</span>
          </div>
          <div className="text-xl font-bold font-['Outfit'] text-white mt-1">
            {recording.scenes_count}
          </div>
          <div className="text-[10px] font-mono text-[#E5092F]">Optical cut verified</div>
        </div>

        <div className="spider-panel p-4 bg-[#071426]">
          <div className="text-[10px] font-mono text-[#8E9BAE] flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>SPEAKERS</span>
          </div>
          <div className="text-xl font-bold font-['Outfit'] text-white mt-1">
            {recording.speakers_count}
          </div>
          <div className="text-[10px] font-mono text-purple-400">Host + Q&A guest</div>
        </div>

        <div className="spider-panel p-4 bg-[#071426]">
          <div className="text-[10px] font-mono text-[#8E9BAE] flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CLIPS FOUND</span>
          </div>
          <div className="text-xl font-bold font-['Outfit'] text-white mt-1">
            12
          </div>
          <div className="text-[10px] font-mono text-amber-400">Scored ≥ 88%</div>
        </div>

        <div className="spider-panel p-4 bg-[#071426]">
          <div className="text-[10px] font-mono text-[#8E9BAE] flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-[#E5092F]" />
            <span>STRONG BEATS</span>
          </div>
          <div className="text-xl font-bold font-['Outfit'] text-white mt-1">
            8
          </div>
          <div className="text-[10px] font-mono text-emerald-400">Peak emotional pull</div>
        </div>
      </div>

      {/* Topic Map Section */}
      <div className="mt-8 spider-panel p-6 rounded-2xl bg-[#071426]">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <h2 className="text-base font-bold font-['Outfit'] text-white">
              Semantic Topic Map & Knowledge Clusters
            </h2>
            <p className="text-xs text-[#8E9BAE]">
              Autonomous topic segmentation derived from embedding vector similarity
            </p>
          </div>
          <span className="text-xs font-mono text-[#1769FF] font-bold">
            5 Core Knowledge Nodes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topics.map((t) => {
            const isSelected = activeTopic === t.name;
            return (
              <div
                key={t.name}
                onClick={() => {
                  spiderSound.playClick();
                  setActiveTopic(t.name);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#10141D] border-[#E5092F] shadow-[0_0_20px_rgba(229,9,47,0.3)]'
                    : 'bg-[#10141D]/50 border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white">
                      {t.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#E5092F] font-bold">
                      {t.score}%
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    {t.subnodes.map((sub, i) => (
                      <div
                        key={i}
                        className="text-[11px] font-mono text-[#8E9BAE] flex items-center space-x-1"
                      >
                        <span className="text-[#1769FF]">•</span>
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5 text-[10px] font-mono text-[#1769FF]">
                  Inspect Cluster →
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detected Scenes Breakdown */}
      <div className="mt-8 space-y-4">
        <h2 className="text-base font-bold font-['Outfit'] text-white">
          Visual Scene Breakdown & Detected Elements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenes.map((scene) => (
            <div key={scene.id} className="spider-panel p-4 bg-[#10141D] rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#8E9BAE] pb-2 border-b border-white/5">
                  <span className="text-white font-bold">SCENE {String(scene.scene_number).padStart(2, '0')}</span>
                  <span className="text-[#1769FF]">{scene.duration}s</span>
                </div>
                <p className="mt-2 text-xs text-[#8E9BAE] leading-relaxed">
                  {scene.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {scene.visual_tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#05070D] text-[#8E9BAE] border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>Energy: {scene.energy_score}%</span>
                <span>Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
