import React, { useState } from 'react';
import { useProjectStore } from '../stores/useProjectStore';
import { useUIStore } from '../stores/useUIStore';
import { ClipCandidate } from '../types';
import {
  Sparkles, Play, Layers, Share2, Eye, CheckCircle2,
  Clock, Flame, RefreshCw, ArrowRight, X, Volume2, ShieldCheck
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const ClipHunterPage: React.FC = () => {
  const { clips, scanClips, isScanningClips, setSelectedClip } = useProjectStore();
  const { setActiveTab, showToast } = useUIStore();

  const [previewClip, setPreviewClip] = useState<ClipCandidate | null>(null);

  const handleScan = async () => {
    spiderSound.playSpiderSense();
    await scanClips();
    showToast('🕷 Web Hunt complete: 4 high-value clip candidates discovered!');
  };

  const handleEditClip = (clip: ClipCandidate) => {
    spiderSound.playClick();
    setSelectedClip(clip);
    setActiveTab('editor');
  };

  const handleRepurposeClip = (clip: ClipCandidate) => {
    spiderSound.playClick();
    setSelectedClip(clip);
    setActiveTab('repurpose');
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>WEB HUNT · AI CLIP DISCOVERY</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            FIND THE MOMENTS WORTH SHARING.
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Spider-Sense analyzes pacing, emotional hook strength, and completeness to surface candidate shorts.
          </p>
        </div>

        <button
          onClick={handleScan}
          disabled={isScanningClips}
          className="web-button-primary px-6 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          <Sparkles className={`w-4 h-4 ${isScanningClips ? 'animate-spin' : ''}`} />
          <span>{isScanningClips ? 'SCANNING FOOTAGE...' : 'SCAN FOR CONTENT'}</span>
        </button>
      </div>

      {/* Metric explanation bar */}
      <div className="mt-6 p-4 rounded-xl bg-[#10141D] border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8E9BAE]">
        <div className="flex items-center space-x-2 text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>EVALUATION DIMENSIONS:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span>🎯 Hook Strength</span>
          <span>·</span>
          <span>📦 Completeness</span>
          <span>·</span>
          <span>🏷 Topic Relevance</span>
          <span>·</span>
          <span>🎨 Visual Quality</span>
          <span>·</span>
          <span>🔊 Audio Purity</span>
        </div>
      </div>

      {/* Clips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {clips.map((clip) => (
          <div
            key={clip.id}
            className="spider-panel spider-panel-hover p-6 rounded-2xl relative flex flex-col justify-between group"
          >
            <div>
              {/* Top Row: Short # & Score */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-black text-white px-2.5 py-1 rounded bg-[#E5092F]/20 border border-[#E5092F]/50">
                    SHORT #{clip.clip_number.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs font-mono text-[#8E9BAE]">
                    {clip.duration_sec}s
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-xs">
                  <span className="text-[#8E9BAE]">SCORE:</span>
                  <span className="text-base font-bold text-[#E5092F]">
                    {clip.overall_score}
                  </span>
                </div>
              </div>

              {/* Title & Hook Quote */}
              <h3 className="text-lg font-bold text-white font-['Outfit'] group-hover:text-[#F2F5F7]">
                {clip.title}
              </h3>
              <div className="mt-2 p-3 rounded-xl bg-[#05070D] border border-white/5 text-xs text-[#1769FF] font-mono leading-relaxed">
                "{clip.hook_sentence}"
              </div>

              {/* Summary */}
              <p className="mt-3 text-xs text-[#8E9BAE] leading-relaxed">
                {clip.summary}
              </p>

              {/* 6 Dimension Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-[#071426] border border-white/5">
                  <div className="text-[#8E9BAE]">HOOK</div>
                  <div className="font-bold text-white mt-0.5">{clip.metrics.hook_strength}%</div>
                </div>
                <div className="p-2 rounded-lg bg-[#071426] border border-white/5">
                  <div className="text-[#8E9BAE]">COMPLETE</div>
                  <div className="font-bold text-white mt-0.5">{clip.metrics.content_completeness}%</div>
                </div>
                <div className="p-2 rounded-lg bg-[#071426] border border-white/5">
                  <div className="text-[#8E9BAE]">RELEVANCE</div>
                  <div className="font-bold text-white mt-0.5">{clip.metrics.topic_relevance}%</div>
                </div>
                <div className="p-2 rounded-lg bg-[#071426] border border-white/5">
                  <div className="text-[#8E9BAE]">VISUAL</div>
                  <div className="font-bold text-white mt-0.5">{clip.metrics.visual_quality}%</div>
                </div>
                <div className="p-2 rounded-lg bg-[#071426] border border-white/5">
                  <div className="text-[#8E9BAE]">AUDIO</div>
                  <div className="font-bold text-white mt-0.5">{clip.metrics.audio_quality}%</div>
                </div>
                <div className="p-2 rounded-lg bg-[#071426] border border-white/5">
                  <div className="text-[#8E9BAE]">STANDALONE</div>
                  <div className="font-bold text-white mt-0.5">{clip.metrics.self_containedness}%</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
              <button
                onClick={() => setPreviewClip(clip)}
                className="px-3.5 py-2 rounded-lg bg-[#10141D] hover:bg-white/10 text-xs font-mono text-[#8E9BAE] hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>PREVIEW</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleRepurposeClip(clip)}
                  className="px-3.5 py-2 rounded-lg bg-[#1769FF]/20 hover:bg-[#1769FF]/30 border border-[#1769FF]/50 text-xs font-mono text-[#1769FF] flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>REPURPOSE</span>
                </button>

                <button
                  onClick={() => handleEditClip(clip)}
                  className="web-button-primary px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>EDIT</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewClip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#071426] border border-[#E5092F]/60 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#05070D]">
              <div className="text-sm font-bold text-white font-['Outfit']">
                PREVIEW: {previewClip.title}
              </div>
              <button
                onClick={() => setPreviewClip(null)}
                className="text-[#8E9BAE] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="aspect-video bg-black rounded-xl overflow-hidden relative flex items-center justify-center border border-white/10">
                <video
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#10141D] text-xs font-mono text-[#8E9BAE]">
                <strong className="text-white">TRANSCRIPT SNIPPET:</strong>
                <p className="mt-1 text-white leading-relaxed">
                  "{previewClip.transcript_preview}"
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => setPreviewClip(null)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-xs text-[#8E9BAE]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const c = previewClip;
                    setPreviewClip(null);
                    handleEditClip(c);
                  }}
                  className="web-button-primary px-5 py-2 rounded-lg text-xs font-bold"
                >
                  Open in Web Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
