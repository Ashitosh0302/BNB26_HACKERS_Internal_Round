import React from 'react';
import { useUIStore } from '../stores/useUIStore';
import { useProjectStore } from '../stores/useProjectStore';
import {
  Sparkles, Video, Play, ArrowRight, Layers, Share2,
  TrendingUp, Clock, Eye, ShieldCheck, Zap, Flame, FileText
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const Dashboard: React.FC = () => {
  const { setActiveTab } = useUIStore();
  const { activeProject, clips, recording, script, repurposedItems } = useProjectStore();

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Spider HQ Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>COMMAND CENTER ACTIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white mt-1">
            SPIDER HQ <span className="text-[#1769FF] font-light">/ DASHBOARD</span>
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Mission overview, multimodal content graph status, and live Spider-Sense signals.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              spiderSound.playWebShoot();
              setActiveTab('recording');
            }}
            className="web-button-secondary px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer"
          >
            <Video className="w-4 h-4 text-[#1769FF]" />
            <span>DROP RECORDING</span>
          </button>

          <button
            onClick={() => {
              spiderSound.playSpiderSense();
              setActiveTab('alignment');
            }}
            className="web-button-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>SCRIPT ↔ FOOTAGE</span>
          </button>
        </div>
      </div>

      {/* Spider-Sense Live Opportunity Banner */}
      <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-[#E5092F]/20 via-[#10141D] to-[#1769FF]/20 border border-[#E5092F]/40 shadow-[0_0_30px_rgba(229,9,47,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-[#E5092F] text-white shadow-[0_0_15px_rgba(229,9,47,0.5)]">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-[#E5092F] uppercase tracking-wider">
              🕷 SPIDER-SENSE OPPORTUNITY DETECTED
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              4 High-Value Content Moments Found in "{activeProject.title}"
            </div>
            <div className="text-xs text-[#8E9BAE]">
              Highest scored candidate: Clip #1 "The Big RAG Mistake" (96% hook strength, 97% audio fidelity)
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            spiderSound.playClick();
            setActiveTab('clips');
          }}
          className="web-button-primary px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer flex items-center space-x-2"
        >
          <span>REVIEW CANDIDATES</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Key HUD Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {/* Card 1: Active Mission */}
        <div className="spider-panel p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono text-[#8E9BAE] mb-3">
            <span>⚡ ACTIVE MISSION</span>
            <span className="text-[#1769FF] font-bold">100% ANALYZED</span>
          </div>
          <div className="text-base font-bold text-white truncate">
            {activeProject.title}
          </div>
          <div className="text-xs text-[#8E9BAE] mt-1 flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-[#1769FF]" />
            <span>45:12 master recording · 54 scenes</span>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-white">6 Script Sections</span>
            <button
              onClick={() => setActiveTab('script')}
              className="text-xs text-[#1769FF] hover:underline flex items-center space-x-1"
            >
              <span>View Script</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 2: Content Web Summary */}
        <div className="spider-panel p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono text-[#8E9BAE] mb-3">
            <span>🕸 CONTENT WEB</span>
            <span className="text-[#E5092F] font-bold">1 → 15 ASSETS</span>
          </div>
          <div className="text-base font-bold text-white">
            1 Long Recording
          </div>
          <div className="text-xs text-[#8E9BAE] mt-1">
            5 Shorts · 3 Reels · 1 Thread · 1 LinkedIn
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400">All Nodes Connected</span>
            <button
              onClick={() => setActiveTab('content-graph')}
              className="text-xs text-[#E5092F] hover:underline flex items-center space-x-1"
            >
              <span>Open Graph</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 3: Today's Publishing */}
        <div className="spider-panel p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono text-[#8E9BAE] mb-3">
            <span>📅 SPIDER CALENDAR</span>
            <span className="text-amber-400 font-bold">READY</span>
          </div>
          <div className="text-base font-bold text-white">
            3 Scheduled Posts
          </div>
          <div className="text-xs text-[#8E9BAE] mt-1">
            Next: YouTube Shorts (14:00 Mon)
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-[#8E9BAE]">Auto-Publishing Active</span>
            <button
              onClick={() => setActiveTab('repurpose')}
              className="text-xs text-amber-400 hover:underline flex items-center space-x-1"
            >
              <span>View Pack</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 4: Spider-Sense Analytics */}
        <div className="spider-panel p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-mono text-[#8E9BAE] mb-3">
            <span>📈 PERFORMANCE</span>
            <span className="text-emerald-400 font-bold">+28% RETENTION</span>
          </div>
          <div className="text-base font-bold text-white">
            1.48M Total Views
          </div>
          <div className="text-xs text-[#8E9BAE] mt-1">
            78% avg 30s completion rate
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-white">91% Contrarian Hook</span>
            <button
              onClick={() => setActiveTab('analytics')}
              className="text-xs text-emerald-400 hover:underline flex items-center space-x-1"
            >
              <span>Insights</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* Left Column: Top Clip Candidates */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-['Outfit'] text-white">
                Discovered Clip Candidates
              </h2>
              <p className="text-xs text-[#8E9BAE]">
                Scored by Hook Strength, Audio Purity, and Self-Containedness
              </p>
            </div>
            <button
              onClick={() => setActiveTab('clips')}
              className="text-xs font-mono text-[#E5092F] hover:underline flex items-center space-x-1"
            >
              <span>View All 12</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-4">
            {clips.slice(0, 3).map((clip) => (
              <div
                key={clip.id}
                className="spider-panel spider-panel-hover p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#05070D] border border-[#E5092F]/40 flex flex-col items-center justify-center font-mono text-xs">
                    <span className="text-[10px] text-[#8E9BAE]">SCORE</span>
                    <span className="font-bold text-[#E5092F] text-base">{clip.overall_score}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{clip.title}</div>
                    <div className="text-xs font-mono text-[#1769FF] mt-0.5">
                      "{clip.hook_sentence}"
                    </div>
                    <div className="text-xs text-[#8E9BAE] mt-1 flex items-center space-x-3">
                      <span>⏱ {clip.timestamp_formatted}</span>
                      <span>·</span>
                      <span>{clip.duration_sec}s</span>
                      <span>·</span>
                      <span className="text-[#E5092F]">Hook: {clip.metrics.hook_strength}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      spiderSound.playClick();
                      setActiveTab('editor');
                    }}
                    className="web-button-primary px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    EDIT IN STUDIO
                  </button>
                  <button
                    onClick={() => {
                      spiderSound.playClick();
                      setActiveTab('alignment');
                    }}
                    className="p-2 rounded-lg bg-[#10141D] border border-white/10 hover:border-[#1769FF] text-white cursor-pointer"
                    title="Trace to Source Footage"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Mission Pipeline Quick Access */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-['Outfit'] text-white">
            Mission Workspaces
          </h2>

          <div className="spider-panel p-5 space-y-3">
            <button
              onClick={() => setActiveTab('script')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#10141D] hover:bg-white/5 border border-white/5 hover:border-[#1769FF]/50 text-left transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-[#1769FF]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#1769FF]">
                    Script Studio
                  </div>
                  <div className="text-[11px] text-[#8E9BAE]">6 structured sections</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8E9BAE] group-hover:text-white" />
            </button>

            <button
              onClick={() => setActiveTab('alignment')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#10141D] hover:bg-white/5 border border-white/5 hover:border-[#E5092F]/50 text-left transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-red-500/10 text-[#E5092F]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#E5092F]">
                    Script ↔ Footage Alignment
                  </div>
                  <div className="text-[11px] text-[#8E9BAE]">96% match confidence</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8E9BAE] group-hover:text-white" />
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#10141D] hover:bg-white/5 border border-white/5 hover:border-emerald-500/50 text-left transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400">
                    Web Studio Timeline
                  </div>
                  <div className="text-[11px] text-[#8E9BAE]">Editable edit_plan.json</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8E9BAE] group-hover:text-white" />
            </button>

            <button
              onClick={() => setActiveTab('repurpose')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#10141D] hover:bg-white/5 border border-white/5 hover:border-purple-500/50 text-left transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-400">
                    Multi-Platform Repurpose
                  </div>
                  <div className="text-[11px] text-[#8E9BAE]">Shorts, Reels, TikTok, LinkedIn</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8E9BAE] group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
