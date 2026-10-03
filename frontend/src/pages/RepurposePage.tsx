import React, { useState } from 'react';
import { useProjectStore } from '../stores/useProjectStore';
import { useUIStore } from '../stores/useUIStore';
import { RepurposedContentItem } from '../types';
import {
  Share2, Video, MessageSquare, Send, Copy,
  Check, Calendar, ArrowRight, Sparkles, Layers, Sliders, Play
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const RepurposePage: React.FC = () => {
  const { repurposedItems, updateRepurposedItemStatus } = useProjectStore();
  const { showToast } = useUIStore();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const handleCopy = (item: RepurposedContentItem) => {
    spiderSound.playClick();
    const textToCopy = `${item.headline_hook}\n\n${item.primary_copy}\n\n${item.cta}\n\n${item.hashtags.join(' ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    showToast(`Copied ${item.platform} content pack to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube_shorts':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'instagram_reels':
        return <Video className="w-5 h-5 text-pink-500" />;
      case 'tiktok':
        return <Share2 className="w-5 h-5 text-cyan-400" />;
      case 'linkedin':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'x_thread':
        return <Send className="w-5 h-5 text-sky-400" />;
      default:
        return <Share2 className="w-5 h-5 text-white" />;
    }
  };

  const filteredItems = selectedPlatform === 'all'
    ? repurposedItems
    : repurposedItems.filter((it) => it.platform === selectedPlatform);

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>CROSS-PLATFORM ENGINE · REPURPOSE THE STORY</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            ONE RECORDING → ENTIRE CONTENT WEB
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Auto-adapted aspect ratios, native hook variations, platform algorithms, and CTAs.
          </p>
        </div>

        {/* Content Web Summary Badge */}
        <div className="p-3 rounded-xl bg-[#10141D] border border-white/10 flex items-center space-x-4 text-xs font-mono">
          <div>
            <div className="text-[#8E9BAE]">SOURCE</div>
            <div className="text-white font-bold">1 4K Recording</div>
          </div>
          <span className="text-[#E5092F] font-bold">→</span>
          <div>
            <div className="text-[#8E9BAE]">GENERATED</div>
            <div className="text-[#1769FF] font-bold">5 Multi-Platform Packs</div>
          </div>
        </div>
      </div>

      {/* Platform Filter Tabs */}
      <div className="flex items-center space-x-2 mt-6 overflow-x-auto pb-2">
        {['all', 'youtube_shorts', 'instagram_reels', 'tiktok', 'linkedin', 'x_thread'].map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPlatform(p)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
              selectedPlatform === p
                ? 'bg-[#E5092F] text-white shadow-[0_0_15px_rgba(229,9,47,0.4)]'
                : 'bg-[#10141D] text-[#8E9BAE] hover:text-white border border-white/5'
            }`}
          >
            {p.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Content Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="spider-panel spider-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header: Platform & Aspect Ratio */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2.5">
                  {getPlatformIcon(item.platform)}
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    {item.platform.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[#8E9BAE] border border-white/10">
                    {item.aspect_ratio}
                  </span>
                  {item.duration_sec && (
                    <span className="text-[#1769FF] font-bold">{item.duration_sec}s</span>
                  )}
                </div>
              </div>

              {/* Hook Sentence */}
              <div className="mt-4">
                <div className="text-[10px] font-mono uppercase text-[#E5092F] font-bold">
                  OPTIMIZED HOOK:
                </div>
                <h3 className="text-base font-bold text-white font-['Outfit'] mt-1">
                  {item.headline_hook}
                </h3>
              </div>

              {/* Primary Copy */}
              <div className="mt-3 p-3.5 rounded-xl bg-[#05070D] border border-white/5 text-xs text-[#8E9BAE] leading-relaxed whitespace-pre-line font-sans">
                {item.primary_copy}
              </div>

              {/* CTA & Hashtags */}
              <div className="mt-3 space-y-2 text-xs">
                <div className="text-[#1769FF] font-semibold flex items-center space-x-1.5">
                  <span>👉 {item.cta}</span>
                </div>
                <div className="text-[11px] font-mono text-[#8E9BAE] flex flex-wrap gap-1.5">
                  {item.hashtags.map((h, idx) => (
                    <span key={idx} className="hover:text-white cursor-pointer">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[11px] font-mono text-[#8E9BAE]">
                <Calendar className="w-3.5 h-3.5 text-[#1769FF]" />
                <span>{item.scheduled_date || 'Ready to Schedule'}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(item)}
                  className="px-3 py-1.5 rounded-lg bg-[#10141D] hover:bg-white/10 text-xs font-mono text-white flex items-center space-x-1.5 transition-colors cursor-pointer border border-white/10"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? 'COPIED' : 'COPY PACK'}</span>
                </button>

                <button
                  onClick={() => {
                    spiderSound.playClick();
                    updateRepurposedItemStatus(
                      item.id,
                      item.status === 'scheduled' ? 'published' : 'scheduled'
                    );
                    showToast(`Updated status to ${item.status === 'scheduled' ? 'published' : 'scheduled'}`);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    item.status === 'scheduled'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                  }`}
                >
                  {item.status.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
