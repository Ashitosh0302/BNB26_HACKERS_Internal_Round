import React from 'react';
import { useUIStore } from '../stores/useUIStore';
import { DEMO_ANALYTICS } from '../services/seedData';
import {
  BarChart3, Eye, Clock, TrendingUp, Sparkles, Flame,
  Share2, Bookmark, Heart, ArrowRight, Zap, Target
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const AnalyticsPage: React.FC = () => {
  const { setActiveTab } = useUIStore();
  const data = DEMO_ANALYTICS;

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>PERFORMANCE INTELLIGENCE · SPIDER-SENSE ANALYTICS</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            CREATOR AUDIENCE TELEMETRY
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Empirical retention curves, hook efficacy ratings, and autonomous Spider-Sense growth observations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              spiderSound.playSpiderSense();
              setActiveTab('clips');
            }}
            className="web-button-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>CREATE NEXT CONTENT</span>
          </button>
        </div>
      </div>

      {/* Top 4 Primary Metrics HUD */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="spider-panel p-5 bg-[#071426]">
          <div className="flex items-center justify-between text-xs font-mono text-[#8E9BAE]">
            <span>TOTAL REACH</span>
            <Eye className="w-4 h-4 text-[#1769FF]" />
          </div>
          <div className="text-2xl font-black font-['Outfit'] text-white mt-2">
            {data.total_views}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1">
            +34% vs previous 30 days
          </div>
        </div>

        <div className="spider-panel p-5 bg-[#071426]">
          <div className="flex items-center justify-between text-xs font-mono text-[#8E9BAE]">
            <span>WATCH TIME</span>
            <Clock className="w-4 h-4 text-[#E5092F]" />
          </div>
          <div className="text-2xl font-black font-['Outfit'] text-white mt-2">
            {data.total_watch_time}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1">
            +42% high-intent engineering viewers
          </div>
        </div>

        <div className="spider-panel p-5 bg-[#071426]">
          <div className="flex items-center justify-between text-xs font-mono text-[#8E9BAE]">
            <span>AVG RETENTION</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-['Outfit'] text-white mt-2">
            {data.avg_retention_percent}%
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1">
            Top 2% in AI / Tech category
          </div>
        </div>

        <div className="spider-panel p-5 bg-[#071426]">
          <div className="flex items-center justify-between text-xs font-mono text-[#8E9BAE]">
            <span>SAVES & BOOKMARKS</span>
            <Bookmark className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-['Outfit'] text-white mt-2">
            {data.saves}
          </div>
          <div className="text-[11px] font-mono text-amber-400 mt-1">
            3.4x average tech tutorial benchmark
          </div>
        </div>
      </div>

      {/* Spider-Sense AI Insights Cards */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold uppercase tracking-wider">
          <Flame className="w-4 h-4" />
          <span>AUTONOMOUS SPIDER-SENSE OBSERVATIONS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.insights.map((ins) => (
            <div
              key={ins.id}
              className="spider-panel spider-panel-hover p-6 rounded-2xl flex flex-col justify-between bg-[#10141D]"
            >
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#E5092F]/20 text-[#E5092F] border border-[#E5092F]/40 font-bold">
                  {ins.category} INSIGHT
                </span>
                <h3 className="text-base font-bold font-['Outfit'] text-white mt-3">
                  {ins.title}
                </h3>
                <div className="mt-3 space-y-2 text-xs text-[#8E9BAE] leading-relaxed">
                  {ins.observations.map((obs, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-[#E5092F] mt-0.5">•</span>
                      <span>{obs}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    spiderSound.playClick();
                    if (ins.action_route.includes('clips')) setActiveTab('clips');
                    else if (ins.action_route.includes('editor')) setActiveTab('editor');
                    else setActiveTab('repurpose');
                  }}
                  className="text-xs font-mono font-bold text-[#1769FF] hover:text-[#E5092F] flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>{ins.action_cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Intelligence: Retention Curve & Hook Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        {/* Retention Curve (7 cols) */}
        <div className="lg:col-span-7 spider-panel p-6 rounded-2xl bg-[#071426]">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div>
              <h3 className="text-base font-bold font-['Outfit'] text-white">
                Empirical Second-by-Second Retention Curve
              </h3>
              <p className="text-xs text-[#8E9BAE]">
                Comparing 42-second clip retention curve against tech category benchmark
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              91% Hold at 00:05
            </span>
          </div>

          {/* SVG Chart Graphic */}
          <div className="h-56 relative flex items-end pt-4 pb-2 px-2">
            {/* SVG Curve */}
            <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="retentionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E5092F" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1769FF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area fill */}
              <polygon
                points="20,20 80,35 180,50 320,70 480,85 640,95 780,105 780,180 20,180"
                fill="url(#retentionGrad)"
              />

              {/* Line */}
              <polyline
                points="20,20 80,35 180,50 320,70 480,85 640,95 780,105"
                fill="none"
                stroke="#E5092F"
                strokeWidth="3"
                className="drop-shadow-[0_0_10px_#E5092F]"
              />

              {/* Benchmark baseline */}
              <polyline
                points="20,50 80,85 180,115 320,135 480,148 640,158 780,165"
                fill="none"
                stroke="rgba(242, 245, 247, 0.2)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Labels */}
            <div className="absolute bottom-1 inset-x-4 flex justify-between text-[10px] font-mono text-[#8E9BAE]">
              <span>00:00 (Hook)</span>
              <span>00:10 (B-Roll)</span>
              <span>00:20 (Code)</span>
              <span>00:30 (Proof)</span>
              <span>00:42 (CTA)</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-[#8E9BAE]">
            <span className="flex items-center space-x-1.5 text-white">
              <span className="w-2.5 h-2.5 rounded bg-[#E5092F]" />
              <span>Your Retention Curve</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-[2px] bg-white/40" />
              <span>Category Average</span>
            </span>
          </div>
        </div>

        {/* Hook Type Performance (5 cols) */}
        <div className="lg:col-span-5 spider-panel p-6 rounded-2xl bg-[#071426] space-y-4">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-base font-bold font-['Outfit'] text-white">
              Hook Formula Retention Leaderboard
            </h3>
            <p className="text-xs text-[#8E9BAE]">
              Evaluated across 53 published short-form clips
            </p>
          </div>

          <div className="space-y-4">
            {data.hook_performance.map((hook) => (
              <div key={hook.hook_type} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold">{hook.hook_type}</span>
                  <span className="text-[#E5092F] font-bold">{hook.retention_percent}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1769FF] to-[#E5092F] rounded-full"
                    style={{ width: `${hook.retention_percent}%` }}
                  />
                </div>
                <div className="text-[10px] font-mono text-[#8E9BAE]">
                  Sample: {hook.sample_size} videos tested
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
