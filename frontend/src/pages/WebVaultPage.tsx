import React, { useState } from 'react';
import { useProjectStore } from '../stores/useProjectStore';
import { useUIStore } from '../stores/useUIStore';
import { Asset } from '../types';
import {
  Compass, Search, Sparkles, Filter, Video, Image,
  Volume2, FileText, ArrowRight, Tag, Info, X
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const WebVaultPage: React.FC = () => {
  const { assets } = useProjectStore();
  const { showToast } = useUIStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectedAsset, setInspectedAsset] = useState<Asset | null>(null);

  const categories = [
    { id: 'all', label: 'All Vault Assets' },
    { id: 'image', label: 'Images & Diagrams' },
    { id: 'video', label: 'Videos & B-Roll' },
    { id: 'screenshot', label: 'Code & Benchmarks' },
    { id: 'audio', label: 'SFX & Master Audio' },
    { id: 'logo', label: 'Brand & Logos' }
  ];

  const filteredAssets = assets.filter((asset) => {
    const matchesCat = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      asset.embedding_summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSemanticSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    spiderSound.playSpiderSense();
    showToast(`🕷 Spider-Sense semantic scan completed for "${searchQuery}"`);
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>MEDIA REPOSITORY · WEB VAULT</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            CREATOR ASSET VAULT
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Vector-embedded media repository with natural language semantic search.
          </p>
        </div>

        {/* Semantic Search Bar */}
        <form onSubmit={handleSemanticSearch} className="flex items-center w-full md:w-96 relative">
          <Search className="w-4 h-4 text-[#E5092F] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Try 'laptop with code' or 'diagram'..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#10141D] border border-white/10 focus:border-[#E5092F] text-xs text-white placeholder-[#8E9BAE] focus:outline-none"
          />
        </form>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 mt-6 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              spiderSound.playClick();
              setSelectedCategory(c.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === c.id
                ? 'bg-[#1769FF] text-white shadow-[0_0_15px_rgba(23,105,255,0.4)]'
                : 'bg-[#10141D] text-[#8E9BAE] hover:text-white border border-white/5'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => {
              spiderSound.playClick();
              setInspectedAsset(asset);
            }}
            className="spider-panel spider-panel-hover p-4 rounded-2xl flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Media Preview Box */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10 mb-4">
                <img
                  src={asset.preview_url}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase text-white border border-white/10">
                  {asset.format}
                </div>
                {asset.duration_sec && (
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white">
                    {asset.duration_sec}s
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-white font-['Outfit'] truncate">
                {asset.title}
              </h3>

              {/* Vector embedding summary */}
              <p className="mt-1 text-xs text-[#8E9BAE] line-clamp-2 leading-relaxed">
                {asset.embedding_summary}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {asset.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10141D] text-[#8E9BAE] border border-white/5"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#8E9BAE]">
              <span>{asset.file_size_formatted}</span>
              <span className="text-[#1769FF] font-bold">Inspect Details →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Detail Modal */}
      {inspectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#071426] border border-[#1769FF]/60 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#05070D]">
              <div className="text-sm font-bold text-white font-['Outfit']">
                ASSET DETAILS: {inspectedAsset.title}
              </div>
              <button
                onClick={() => setInspectedAsset(null)}
                className="text-[#8E9BAE] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
                <img
                  src={inspectedAsset.preview_url}
                  alt={inspectedAsset.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#8E9BAE]">Category:</span>
                  <span className="text-white font-mono uppercase">{inspectedAsset.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#8E9BAE]">Format & Dimensions:</span>
                  <span className="text-white font-mono">{inspectedAsset.format} · {inspectedAsset.dimensions || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#8E9BAE]">File Size:</span>
                  <span className="text-white font-mono">{inspectedAsset.file_size_formatted}</span>
                </div>
                <div className="py-2">
                  <span className="text-[#8E9BAE] block mb-1">Embedding Context:</span>
                  <p className="text-white leading-relaxed bg-[#05070D] p-3 rounded-lg border border-white/5 font-mono text-[11px]">
                    {inspectedAsset.embedding_summary}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    showToast(`Inserted ${inspectedAsset.title} into Web Studio B-Roll track`);
                    setInspectedAsset(null);
                  }}
                  className="web-button-primary px-5 py-2.5 rounded-xl text-xs font-bold"
                >
                  INSERT AS B-ROLL IN STUDIO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
