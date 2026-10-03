import React from 'react';
import { useUIStore } from '../stores/useUIStore';
import {
  User, Sparkles, Sliders, Palette, Type, Clock,
  Flame, CheckCircle2, Shield, ArrowRight, Save
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const CreatorDNAPage: React.FC = () => {
  const { creatorMemory, updateCreatorMemory, showToast } = useUIStore();

  const handleToneChange = (key: string, value: number) => {
    updateCreatorMemory({
      tone: {
        ...creatorMemory.tone,
        [key]: value
      }
    });
  };

  const handleSave = () => {
    spiderSound.playSpiderSense();
    showToast('🕷 Creator DNA profile saved and synchronized with Spider-Sense models');
  };

  const toneMetrics = [
    { key: 'educational', label: 'Educational', val: creatorMemory.tone.educational, color: 'bg-[#1769FF]' },
    { key: 'technical', label: 'Technical Depth', val: creatorMemory.tone.technical, color: 'bg-[#E5092F]' },
    { key: 'conversational', label: 'Conversational', val: creatorMemory.tone.conversational, color: 'bg-emerald-500' },
    { key: 'storytelling', label: 'Storytelling', val: creatorMemory.tone.storytelling, color: 'bg-purple-500' },
    { key: 'humorous', label: 'Humorous', val: creatorMemory.tone.humorous, color: 'bg-amber-500' }
  ];

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>PERSISTENT CREATOR MEMORY · CREATOR DNA</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            YOUR SPIDER-SENSE PROFILE
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Fine-tune tone weighting, brand aesthetics, hook philosophies, and pacing rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="web-button-primary px-6 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer self-start md:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>SAVE CREATOR DNA</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Tone Radar & Sliders (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="spider-panel p-6 rounded-2xl bg-[#071426] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#E5092F]" />
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  CREATOR VOICE & TONE PROFILE
                </h2>
              </div>
              <span className="text-xs font-mono text-[#1769FF]">Interactive Weights</span>
            </div>

            {/* Visual Sliders */}
            <div className="space-y-4">
              {toneMetrics.map((item) => (
                <div key={item.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">{item.label}</span>
                    <span className="text-[#8E9BAE]">{item.val}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={item.val}
                    onChange={(e) => handleToneChange(item.key, Number(e.target.value))}
                    className="w-full accent-[#E5092F] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  {/* Visual Bar Indicator */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-200`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#05070D] border border-white/5 text-xs text-[#8E9BAE] leading-relaxed">
              <strong className="text-white">Active Style Summary:</strong> High-technical depth with approachable conversational pacing. AI models will emphasize architectural proofs, terminal code, and contrarian problem statements.
            </div>
          </div>

          {/* Topics Tag Cloud */}
          <div className="spider-panel p-6 rounded-2xl bg-[#071426] space-y-3">
            <div className="text-xs font-mono uppercase text-[#E5092F] font-bold">
              PRIORITY NICHE TOPICS (AUTONOMOUS DISCOVERY)
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {creatorMemory.niche_topics.map((topic, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-[#10141D] border border-[#1769FF]/40 text-[#1769FF] font-mono text-xs font-bold"
                >
                  #{topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Preferences, Brand Kit & Pacing (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="spider-panel p-6 rounded-2xl bg-[#071426] space-y-5">
            <div className="flex items-center space-x-2 pb-3 border-b border-white/10">
              <Palette className="w-4 h-4 text-[#1769FF]" />
              <h2 className="text-base font-bold text-white font-['Outfit']">
                BRAND AESTHETICS & EDITING RULES
              </h2>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-[#8E9BAE] block mb-1.5">PREFERRED HOOK FORMULA:</label>
                <input
                  type="text"
                  value={creatorMemory.hook_style_preferred}
                  onChange={(e) => updateCreatorMemory({ hook_style_preferred: e.target.value })}
                  className="w-full bg-[#10141D] text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#E5092F] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#8E9BAE] block mb-1.5">CALL TO ACTION (CTA) FORMULA:</label>
                <input
                  type="text"
                  value={creatorMemory.cta_style_preferred}
                  onChange={(e) => updateCreatorMemory({ cta_style_preferred: e.target.value })}
                  className="w-full bg-[#10141D] text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#E5092F] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#8E9BAE] block mb-1.5">PACING & BREATH TRIMMING PRESET:</label>
                <input
                  type="text"
                  value={creatorMemory.pacing_preset}
                  onChange={(e) => updateCreatorMemory({ pacing_preset: e.target.value })}
                  className="w-full bg-[#10141D] text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#E5092F] focus:outline-none"
                />
              </div>

              {/* Brand Colors */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[#8E9BAE] block mb-1.5">PRIMARY ACCENT:</label>
                  <div className="flex items-center space-x-2 bg-[#10141D] p-2 rounded-xl border border-white/10">
                    <div
                      className="w-6 h-6 rounded-md shadow-inner"
                      style={{ backgroundColor: creatorMemory.brand_primary_hex }}
                    />
                    <input
                      type="text"
                      value={creatorMemory.brand_primary_hex}
                      onChange={(e) => updateCreatorMemory({ brand_primary_hex: e.target.value })}
                      className="bg-transparent text-white w-20 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#8E9BAE] block mb-1.5">SECONDARY ACCENT:</label>
                  <div className="flex items-center space-x-2 bg-[#10141D] p-2 rounded-xl border border-white/10">
                    <div
                      className="w-6 h-6 rounded-md shadow-inner"
                      style={{ backgroundColor: creatorMemory.brand_secondary_hex }}
                    />
                    <input
                      type="text"
                      value={creatorMemory.brand_secondary_hex}
                      onChange={(e) => updateCreatorMemory({ brand_secondary_hex: e.target.value })}
                      className="bg-transparent text-white w-20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
