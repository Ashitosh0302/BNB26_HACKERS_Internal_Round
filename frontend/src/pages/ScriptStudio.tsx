import React, { useState } from 'react';
import { useProjectStore } from '../stores/useProjectStore';
import { useUIStore } from '../stores/useUIStore';
import { ScriptSection } from '../types';
import {
  FileText, Sparkles, Check, ArrowRight, Wand2, Copy,
  RefreshCw, Clock, Flame, ChevronRight, MessageSquare
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const ScriptStudio: React.FC = () => {
  const { script, updateScriptSection } = useProjectStore();
  const { setActiveTab, showToast } = useUIStore();

  const [selectedSection, setSelectedSection] = useState<ScriptSection>(script.sections[0]);
  const [editorText, setEditorText] = useState<string>(script.sections[0].content);
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([
    "Most developers think vector search is magic. In reality, 80% of hallucination bugs happen right at the chunking boundary.",
    "If you're still building RAG with naive 500-token chunks, your app is leaking production context.",
    "Why OpenAI and Anthropic engineers never implement basic naive vector search."
  ]);

  const handleSelectSection = (sec: ScriptSection) => {
    spiderSound.playClick();
    setSelectedSection(sec);
    setEditorText(sec.content);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorText(e.target.value);
    updateScriptSection(selectedSection.id, e.target.value);
  };

  const handleImproveHook = async () => {
    spiderSound.playSpiderSense();
    setIsAiGenerating(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsAiGenerating(false);
    const newVariations = [
      "Here is the 1 single line of architecture that fixes 80% of RAG hallucinations in production.",
      "Before you spend $10,000 on vector databases, watch how we fixed chunk truncation in 42 seconds.",
      "Most software teams treat Vector DBs like a magic black box — until customer latency spikes."
    ];
    setAiSuggestions(newVariations);
    showToast('🕷 Spider-Sense generated 3 high-converting hook variations!');
  };

  const handleApplyVariation = (variation: string) => {
    spiderSound.playClick();
    setEditorText(variation);
    updateScriptSection(selectedSection.id, variation);
    showToast('Applied hook variation to script!');
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>SCRIPT STUDIO · SCRIPT & RETENTION ARCHITECT</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            {script.title}
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            {script.total_words} words · {script.sections.length} structured retention beats.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              spiderSound.playSpiderSense();
              setActiveTab('alignment');
            }}
            className="web-button-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer"
          >
            <span>ALIGN SCRIPT WITH FOOTAGE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 flex-1">
        {/* Left Column: Script Structure Navigation (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-mono uppercase text-[#8E9BAE] font-bold">
              SCRIPT BEATS & SECTIONS
            </h2>
            <span className="text-xs font-mono text-[#1769FF]">Select to edit</span>
          </div>

          <div className="space-y-2.5">
            {script.sections.map((sec, idx) => {
              const isSelected = selectedSection.id === sec.id;
              return (
                <div
                  key={sec.id}
                  onClick={() => handleSelectSection(sec)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#10141D] border-[#E5092F] shadow-[0_0_15px_rgba(229,9,47,0.3)]'
                      : 'bg-[#10141D]/50 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase font-bold text-[#8E9BAE]">
                      BEAT {String(idx + 1).padStart(2, '0')} · {sec.type}
                    </span>
                    <span className="text-[10px] font-mono text-[#1769FF]">
                      ~{sec.estimated_duration_sec}s
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {sec.title}
                  </div>
                  <div className="text-xs text-[#8E9BAE] line-clamp-1 mt-1">
                    {sec.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle Column: Script Editor (5 cols) */}
        <div className="lg:col-span-5 spider-panel p-6 rounded-2xl bg-[#071426] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <span className="text-xs font-mono text-[#E5092F] font-bold uppercase">
                  ACTIVE BEAT: {selectedSection.type}
                </span>
                <h3 className="text-base font-bold text-white font-['Outfit'] mt-0.5">
                  {selectedSection.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#8E9BAE]">
                Target: {selectedSection.target_emotion}
              </span>
            </div>

            <textarea
              value={editorText}
              onChange={handleTextChange}
              rows={12}
              className="w-full bg-[#05070D] text-sm text-white p-4 rounded-xl border border-white/10 focus:border-[#E5092F] focus:outline-none font-sans leading-relaxed resize-none"
              placeholder="Write or refine script beat here..."
            />
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#8E9BAE]">
            <span>{editorText.split(' ').filter(Boolean).length} words</span>
            <span className="text-emerald-400">✓ Auto-saved to Mission</span>
          </div>
        </div>

        {/* Right Column: Spider-Sense AI Copilot (3 cols) */}
        <div className="lg:col-span-3 spider-panel p-5 rounded-2xl bg-[#071426] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 pb-3 border-b border-white/10">
              <Sparkles className="w-4 h-4 text-[#E5092F]" />
              <h3 className="text-xs font-mono uppercase font-bold text-white">
                SPIDER-SENSE HOOK ENGINE
              </h3>
            </div>

            <div className="mt-4 space-y-2">
              <button
                onClick={handleImproveHook}
                disabled={isAiGenerating}
                className="web-button-primary w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Wand2 className={`w-3.5 h-3.5 ${isAiGenerating ? 'animate-spin' : ''}`} />
                <span>{isAiGenerating ? 'REFINING...' : 'GENERATE HOOKS'}</span>
              </button>
            </div>

            {/* Generated Hook Variations */}
            <div className="mt-4 space-y-2.5">
              <div className="text-[10px] font-mono text-[#8E9BAE] uppercase font-bold">
                HIGH-CONVERTING VARIATIONS:
              </div>
              {aiSuggestions.map((sug, i) => (
                <div
                  key={i}
                  onClick={() => handleApplyVariation(sug)}
                  className="p-3 rounded-xl bg-[#10141D] border border-white/5 hover:border-[#1769FF] text-xs text-white cursor-pointer transition-all group"
                >
                  <p className="line-clamp-3 leading-relaxed text-[#F2F5F7]">
                    "{sug}"
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-[#1769FF] group-hover:underline flex items-center space-x-1">
                    <span>Apply to Script Beat</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#05070D] border border-white/5 text-[11px] text-[#8E9BAE] font-mono">
            ⚡ Contrarian hooks hold +18% higher retention through second 4.
          </div>
        </div>
      </div>
    </div>
  );
};
