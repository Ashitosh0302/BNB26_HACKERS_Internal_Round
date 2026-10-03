import React, { useState, useRef, useEffect } from 'react';
import { useProjectStore } from '../stores/useProjectStore';
import { useUIStore } from '../stores/useUIStore';
import { AlignmentMatch } from '../types';
import {
  Play, Pause, Sparkles, CheckCircle2, Clock, Volume2,
  Video, Eye, Brain, RefreshCw, ArrowRight, ShieldCheck, AlertCircle
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const ScriptAlignmentPage: React.FC = () => {
  const {
    script, recording, alignmentMatches,
    selectedAlignmentMatch, setSelectedAlignmentMatch,
    realignScript, isAligning
  } = useProjectStore();

  const { setActiveTab, showToast } = useUIStore();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeMatch, setActiveMatch] = useState<AlignmentMatch>(
    selectedAlignmentMatch || alignmentMatches[0]
  );

  // Sync video time on match selection
  const handleSelectMatch = (match: AlignmentMatch) => {
    spiderSound.playClick();
    setActiveMatch(match);
    setSelectedAlignmentMatch(match);
    if (videoRef.current) {
      videoRef.current.currentTime = match.start_time;
      setCurrentTime(match.start_time);
    }
  };

  const toggleVideoPlay = () => {
    spiderSound.playClick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Video time update listener
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>HERO TECHNICAL ENGINE · SCRIPT ↔ FOOTAGE INTELLIGENCE</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            MULTIMODAL SCRIPT ALIGNMENT
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Real-time alignment between written script sections, spoken audio waveforms, and 1080p video frames.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={async () => {
              spiderSound.playSpiderSense();
              await realignScript();
              showToast('🕷 Re-aligned 6 script sections with 94.8% confidence');
            }}
            disabled={isAligning}
            className="web-button-secondary px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAligning ? 'animate-spin' : ''}`} />
            <span>{isAligning ? 'REALIGNING...' : 'RE-RUN SPIDER SCAN'}</span>
          </button>

          <button
            onClick={() => {
              spiderSound.playClick();
              setActiveTab('editor');
            }}
            className="web-button-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer"
          >
            <span>EDIT IN WEB STUDIO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        {/* Left Column: Script Sections (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-[#8E9BAE] font-bold">
              SCRIPT SECTIONS ({script.sections.length})
            </h2>
            <span className="text-xs text-[#1769FF] font-mono">Click to seek footage</span>
          </div>

          <div className="space-y-3">
            {alignmentMatches.map((match, idx) => {
              const isSelected = activeMatch?.id === match.id;
              return (
                <div
                  key={match.id}
                  onClick={() => handleSelectMatch(match)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#10141D] border-[#E5092F] shadow-[0_0_20px_rgba(229,9,47,0.25)]'
                      : 'bg-[#10141D]/60 border-white/10 hover:border-white/20 hover:bg-[#10141D]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white">
                      {match.script_section_title}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        match.overall_match_score >= 94
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {match.overall_match_score}% MATCH
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-[#8E9BAE] line-clamp-2 leading-relaxed">
                    "{match.matched_transcript}"
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-[#8E9BAE]">
                    <span className="flex items-center space-x-1.5 text-white">
                      <Clock className="w-3 h-3 text-[#1769FF]" />
                      <span>{match.timestamp_formatted}</span>
                    </span>
                    {match.is_improvised && (
                      <span className="text-amber-400 text-[10px] uppercase font-bold">
                        ⚡ Improvised Section
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Synchronized Video Player & Match Intelligence (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Synchronized Player Card */}
          <div className="spider-panel p-4 rounded-2xl overflow-hidden bg-[#071426]">
            {/* Video container */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center border border-white/10 group">
              <video
                ref={videoRef}
                src={recording.video_url}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover"
                playsInline
              />

              {/* Spider-Sense HUD Watermark */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
                <span>SPIDER SCAN SYNC: 1080p 60FPS</span>
              </div>

              {/* Active Timestamp Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#1769FF]">
                TIME: {Math.floor(currentTime / 60)}:
                {Math.floor(currentTime % 60)
                  .toString()
                  .padStart(2, '0')}
              </div>

              {/* Center Play/Pause Overlay */}
              <button
                onClick={toggleVideoPlay}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#E5092F]/80 hover:bg-[#E5092F] text-white flex items-center justify-center shadow-[0_0_30px_rgba(229,9,47,0.7)] transition-all transform hover:scale-110 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>
            </div>

            {/* Scrubber Bar */}
            <div className="mt-4 px-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#8E9BAE] mb-1.5">
                <span className="text-white font-bold">
                  {activeMatch.script_section_title}
                </span>
                <span>{activeMatch.timestamp_formatted}</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-[#1769FF] to-[#E5092F]"
                  style={{
                    width: `${Math.min(
                      100,
                      ((currentTime - activeMatch.start_time) /
                        (activeMatch.end_time - activeMatch.start_time || 1)) *
                        100
                    )}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Match Score & Evidence Breakdown Card */}
          <div className="spider-panel p-5 bg-[#10141D]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  Spider-Sense Match Intelligence
                </h3>
                <p className="text-xs text-[#8E9BAE]">
                  Multimodal verification for section: {activeMatch.script_section_title}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black font-['Outfit'] text-[#E5092F]">
                  {activeMatch.overall_match_score}%
                </div>
                <div className="text-[10px] font-mono text-[#8E9BAE]">CONFIDENCE</div>
              </div>
            </div>

            {/* 4 Dimension Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#05070D] border border-white/5">
                <div className="text-[10px] font-mono text-[#8E9BAE] flex items-center space-x-1">
                  <Brain className="w-3 h-3 text-[#1769FF]" />
                  <span>SEMANTIC</span>
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {activeMatch.breakdown.semantic}%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#05070D] border border-white/5">
                <div className="text-[10px] font-mono text-[#8E9BAE] flex items-center space-x-1">
                  <Eye className="w-3 h-3 text-[#E5092F]" />
                  <span>VISUAL</span>
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {activeMatch.breakdown.visual}%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#05070D] border border-white/5">
                <div className="text-[10px] font-mono text-[#8E9BAE] flex items-center space-x-1">
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  <span>AUDIO</span>
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {activeMatch.breakdown.audio}%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#05070D] border border-white/5">
                <div className="text-[10px] font-mono text-[#8E9BAE] flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>COMPLETE</span>
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  {activeMatch.breakdown.completeness}%
                </div>
              </div>
            </div>

            {/* Why This Matches Checklist */}
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E9BAE] mb-2.5">
                WHY THIS FOOTAGE MATCHES:
              </div>
              <div className="space-y-2">
                {activeMatch.why_matches.map((reason, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-2.5 text-xs text-white bg-[#05070D]/50 p-2.5 rounded-lg border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E5092F] shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
