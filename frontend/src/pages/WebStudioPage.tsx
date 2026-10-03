import React, { useState, useRef, useEffect } from 'react';
import { useEditorStore } from '../stores/useEditorStore';
import { useUIStore } from '../stores/useUIStore';
import {
  Play, Pause, RotateCcw, RotateCw, Sparkles, Scissors,
  ZoomIn, Type, Layers, Volume2, Download, Check, History,
  Film, MessageSquare, ChevronRight, Sliders, Eye
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const WebStudioPage: React.FC = () => {
  const {
    plan, currentTime, isPlaying, setCurrentTime, togglePlay,
    selectedTrackId, selectTrack, history, historyIndex,
    undo, redo, restoreVersion, toggleOperation,
    applyAiSuggestion, applyAllAiSuggestions,
    isAiProcessing, startRender, isRendering, renderProgress
  } = useEditorStore();

  const { showToast } = useUIStore();

  const [aiPrompt, setAiPrompt] = useState('');
  const [activeStudioTab, setActiveStudioTab] = useState<'copilot' | 'history' | 'operations'>('copilot');

  // Playhead interval timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentTime >= plan.duration_sec) {
          togglePlay();
          setCurrentTime(0);
        } else {
          setCurrentTime(Number((currentTime + 0.1).toFixed(1)));
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, plan.duration_sec, setCurrentTime, togglePlay]);

  // Find active caption item at current playhead
  const captionsTrack = plan.tracks.find((t) => t.type === 'captions');
  const activeCaption = captionsTrack?.items.find(
    (item) => currentTime >= item.start && currentTime < item.start + item.duration
  );

  // Find active B-Roll at current playhead
  const brollTrack = plan.tracks.find((t) => t.type === 'b_roll');
  const activeBroll = brollTrack?.items.find(
    (item) => currentTime >= item.start && currentTime < item.start + item.duration
  );

  const aiSuggestions = [
    {
      id: 'sug_trim',
      label: 'Trim 1.8s silence at start',
      description: 'Removes breath hesitation to maximize 2-second retention.',
      type: 'trim'
    },
    {
      id: 'sug_zoom',
      label: 'Punch-in Zoom (1.18x) on Key Thesis',
      description: 'Emphasizes the pivotal chunking explanation at 00:06.',
      type: 'zoom'
    },
    {
      id: 'sug_broll',
      label: 'Insert Vector Architecture Diagram B-Roll',
      description: 'Visualizes high-dimensional clustering between 08s - 14s.',
      type: 'b_roll'
    },
    {
      id: 'sug_captions',
      label: 'Generate Kinetic Spider Red Captions',
      description: 'Highlights keywords: Chunking, Vector DB, Hallucinations.',
      type: 'captions'
    }
  ];

  const handleCustomAiPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    spiderSound.playSpiderSense();
    applyAiSuggestion({
      id: `custom_${Date.now()}`,
      label: aiPrompt,
      type: 'custom'
    });
    showToast(`🕷 Spider-Sense applied: "${aiPrompt}"`);
    setAiPrompt('');
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-16 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-[#E5092F]/20 text-[#E5092F] border border-[#E5092F]/40 shadow-[0_0_15px_rgba(229,9,47,0.3)]">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-[#E5092F] font-bold tracking-wider uppercase">
              WEB STUDIO · HUMAN-IN-THE-LOOP TIMELINE
            </div>
            <h1 className="text-xl font-bold font-['Outfit'] text-white">
              {plan.title} <span className="text-xs text-[#8E9BAE] font-mono">[{plan.format}]</span>
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center bg-[#10141D] rounded-lg border border-white/10 p-1">
            <button
              onClick={undo}
              disabled={historyIndex === 0}
              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 text-[#8E9BAE] hover:text-white"
              title="Undo [Ctrl+Z]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex === history.length - 1}
              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 text-[#8E9BAE] hover:text-white"
              title="Redo [Ctrl+Y]"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={startRender}
            disabled={isRendering}
            className="web-button-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer shadow-[0_0_20px_rgba(229,9,47,0.4)]"
          >
            <Download className="w-4 h-4" />
            <span>{isRendering ? `EXPORTING ${renderProgress}%...` : 'EXPORT / RENDER'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 flex-1">
        {/* Left: Video Player & Kinetic Overlay Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="relative aspect-[9/16] max-h-[460px] mx-auto rounded-2xl bg-[#071426] border border-white/15 overflow-hidden shadow-2xl flex items-center justify-center group">
            {/* Master Video Canvas / Stream */}
            <video
              src={plan.source_video_url}
              className="w-full h-full object-cover"
              playsInline
              muted
            />

            {/* B-Roll Overlay if Active */}
            {activeBroll && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                <div className="p-3 rounded-2xl bg-[#1769FF]/20 border border-[#1769FF] text-[#1769FF] shadow-[0_0_30px_rgba(23,105,255,0.4)] mb-3">
                  <Layers className="w-8 h-8" />
                </div>
                <div className="text-xs font-mono uppercase text-[#1769FF] font-bold">
                  B-ROLL OVERLAY ACTIVE
                </div>
                <div className="text-base font-bold text-white mt-1">
                  {activeBroll.title}
                </div>
                <div className="text-[10px] font-mono text-[#8E9BAE] mt-1">
                  Transition: {activeBroll.transition} · Opacity: {activeBroll.opacity}
                </div>
              </div>
            )}

            {/* Dynamic Kinetic Captions Overlay */}
            {activeCaption && (
              <div className="absolute bottom-16 inset-x-4 flex justify-center text-center pointer-events-none">
                <div className="px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-[#E5092F]/50 shadow-[0_0_20px_rgba(229,9,47,0.4)]">
                  <span className="text-lg font-black tracking-wide font-['Outfit'] text-white">
                    {activeCaption.text}
                  </span>
                  {activeCaption.highlight_word && (
                    <div className="text-sm font-mono text-[#E5092F] font-bold tracking-wider mt-0.5">
                      ⚡ {activeCaption.highlight_word}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Center Play Button Overlay */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#E5092F]/80 hover:bg-[#E5092F] text-white flex items-center justify-center shadow-[0_0_30px_rgba(229,9,47,0.7)] transition-transform hover:scale-110 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>

            {/* Top HUD Stats */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-black/60 text-white border border-white/10">
                {plan.format} · 1080x1920
              </span>
              <span className="px-2 py-0.5 rounded bg-[#E5092F]/80 text-white font-bold">
                {currentTime.toFixed(1)}s / {plan.duration_sec.toFixed(1)}s
              </span>
            </div>
          </div>

          {/* Quick Player Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#10141D] border border-white/10 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlay}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <span className="text-white font-bold">{currentTime.toFixed(1)}s</span>
              <span className="text-[#8E9BAE]">/ {plan.duration_sec}s</span>
            </div>

            <div className="flex items-center space-x-2 text-[#8E9BAE]">
              <span>Active Author:</span>
              <span className="text-[#1769FF] font-bold">{plan.author}</span>
              <span>· Version {plan.version}</span>
            </div>
          </div>
        </div>

        {/* Right: Spider-Sense AI Copilot & History Drawer (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Tab Selector */}
          <div className="flex items-center p-1 rounded-xl bg-[#10141D] border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveStudioTab('copilot')}
              className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center space-x-1.5 transition-all ${
                activeStudioTab === 'copilot'
                  ? 'bg-[#E5092F] text-white shadow-[0_0_12px_rgba(229,9,47,0.4)]'
                  : 'text-[#8E9BAE] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPIDER-SENSE AI</span>
            </button>

            <button
              onClick={() => setActiveStudioTab('history')}
              className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center space-x-1.5 transition-all ${
                activeStudioTab === 'history'
                  ? 'bg-[#1769FF] text-white shadow-[0_0_12px_rgba(23,105,255,0.4)]'
                  : 'text-[#8E9BAE] hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>VERSIONS ({history.length})</span>
            </button>

            <button
              onClick={() => setActiveStudioTab('operations')}
              className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center space-x-1.5 transition-all ${
                activeStudioTab === 'operations'
                  ? 'bg-white/15 text-white'
                  : 'text-[#8E9BAE] hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>OPS ({plan.operations.length})</span>
            </button>
          </div>

          {/* Tab 1: AI Copilot */}
          {activeStudioTab === 'copilot' && (
            <div className="spider-panel p-5 flex flex-col flex-1 bg-[#071426] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-sm font-bold text-white font-['Outfit']">
                    Spider-Sense AI Copilot
                  </h3>
                  <p className="text-xs text-[#8E9BAE]">
                    Autonomous suggestions. You retain final cut authority.
                  </p>
                </div>
                <button
                  onClick={applyAllAiSuggestions}
                  disabled={isAiProcessing}
                  className="web-button-primary px-3 py-1.5 rounded-lg text-xs font-bold"
                >
                  {isAiProcessing ? 'APPLYING...' : 'APPLY ALL'}
                </button>
              </div>

              {/* Suggestions List */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px]">
                {aiSuggestions.map((sug) => (
                  <div
                    key={sug.id}
                    className="p-3.5 rounded-xl bg-[#10141D] border border-white/5 hover:border-[#E5092F]/40 transition-all flex flex-col space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{sug.label}</span>
                      <button
                        onClick={() => applyAiSuggestion(sug)}
                        className="text-[11px] font-mono text-[#E5092F] hover:underline"
                      >
                        Apply
                      </button>
                    </div>
                    <div className="text-xs text-[#8E9BAE] leading-relaxed">
                      {sug.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prompt Input */}
              <form onSubmit={handleCustomAiPrompt} className="pt-2 border-t border-white/10 flex items-center space-x-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ask AI: e.g. 'Make this more engaging' or 'Cut 5s'..."
                  className="flex-1 bg-[#10141D] text-xs text-white placeholder-[#8E9BAE] px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#E5092F]"
                />
                <button
                  type="submit"
                  className="web-button-primary px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  RUN
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Version Control History */}
          {activeStudioTab === 'history' && (
            <div className="spider-panel p-5 flex flex-col flex-1 bg-[#071426] space-y-3">
              <div className="text-xs font-mono uppercase text-[#8E9BAE] font-bold pb-2 border-b border-white/10">
                EDIT PLAN VERSION TIMELINE
              </div>
              <div className="space-y-2.5 overflow-y-auto max-h-[380px]">
                {history.map((entry, index) => (
                  <div
                    key={index}
                    onClick={() => restoreVersion(index)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      index === historyIndex
                        ? 'bg-[#10141D] border-[#1769FF] shadow-[0_0_15px_rgba(23,105,255,0.25)]'
                        : 'bg-[#10141D]/50 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{entry.description}</span>
                      <span className="font-mono text-[10px] text-[#8E9BAE]">{entry.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-[#8E9BAE] mt-1">
                      Author: {entry.plan.author} · {entry.plan.operations.length} operations
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Operations Control (Human Authority) */}
          {activeStudioTab === 'operations' && (
            <div className="spider-panel p-5 flex flex-col flex-1 bg-[#071426] space-y-3">
              <div className="text-xs font-mono uppercase text-[#8E9BAE] font-bold pb-2 border-b border-white/10">
                INDIVIDUAL EDIT OPERATIONS (TOGGLE ACTIVE)
              </div>
              <div className="space-y-2 overflow-y-auto max-h-[380px]">
                {plan.operations.map((op) => (
                  <div
                    key={op.id}
                    onClick={() => toggleOperation(op.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      op.active
                        ? 'bg-[#10141D] border-emerald-500/50'
                        : 'bg-[#10141D]/30 border-white/5 opacity-50'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{op.description}</div>
                      <div className="text-[10px] font-mono text-[#8E9BAE]">
                        Type: {op.type} · Range: {op.timeline_start}s - {op.timeline_end}s
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center ${
                        op.active ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'
                      }`}
                    >
                      {op.active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Multi-Track Timeline (Bottom Section) */}
      <div className="mt-8 spider-panel p-5 rounded-2xl bg-[#071426]">
        {/* Timeline Header Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs font-mono">
          <div className="flex items-center space-x-4">
            <span className="text-[#E5092F] font-bold">TIMELINE TRACKS</span>
            <span className="text-[#8E9BAE]">Scrub anywhere to seek</span>
          </div>
          <div className="flex items-center space-x-3 text-[#8E9BAE]">
            <span>DURATION: {plan.duration_sec}s</span>
            <span>·</span>
            <span>4 TRACKS ACTIVE</span>
          </div>
        </div>

        {/* Tracks List */}
        <div className="space-y-2.5">
          {plan.tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => selectTrack(track.id)}
              className={`flex items-center p-2 rounded-xl transition-all ${
                selectedTrackId === track.id ? 'bg-[#10141D] ring-1 ring-[#E5092F]/50' : 'bg-[#05070D]'
              }`}
            >
              {/* Track Label */}
              <div className="w-32 shrink-0 text-xs font-mono font-bold text-[#8E9BAE] uppercase flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1769FF]" />
                <span className="truncate">{track.name}</span>
              </div>

              {/* Track Content Timeline Bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  setCurrentTime(Number((ratio * plan.duration_sec).toFixed(1)));
                }}
                className="flex-1 h-9 rounded-lg bg-black/40 relative overflow-hidden cursor-pointer border border-white/5"
              >
                {/* Track Items */}
                {track.items.map((item) => {
                  const leftPercent = (item.start / plan.duration_sec) * 100;
                  const widthPercent = (item.duration / plan.duration_sec) * 100;
                  return (
                    <div
                      key={item.id}
                      className={`absolute top-1 bottom-1 rounded px-2 text-[10px] font-mono flex items-center truncate ${
                        track.type === 'video'
                          ? 'bg-[#1769FF]/40 border border-[#1769FF] text-white'
                          : track.type === 'b_roll'
                          ? 'bg-[#E5092F]/40 border border-[#E5092F] text-white'
                          : track.type === 'captions'
                          ? 'bg-amber-500/30 border border-amber-500 text-white'
                          : 'bg-emerald-500/30 border border-emerald-500 text-white'
                      }`}
                      style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                    >
                      {item.title || item.text || track.name}
                    </div>
                  );
                })}

                {/* Scrubber Playhead Line */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-[#E5092F] z-20 shadow-[0_0_8px_#E5092F] pointer-events-none"
                  style={{
                    left: `${(currentTime / plan.duration_sec) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
