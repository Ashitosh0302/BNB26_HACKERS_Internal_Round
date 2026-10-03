import React from 'react';
import { useUIStore } from '../stores/useUIStore';
import {
  Sparkles, ArrowRight, Play, Shield, Cpu, Share2, Layers,
  Compass, Video, Terminal, BarChart2, Flame, Command, Bell
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setCommandBarOpen, toggleNotifications, notifications } = useUIStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  const pipelineStages = [
    { label: 'IDEA', sub: 'Concept & Niche', icon: Sparkles },
    { label: 'SCRIPT', sub: 'Hook & Retention', icon: Terminal },
    { label: 'RECORD', sub: '4K Multi-Stream', icon: Video },
    { label: 'UNDERSTAND', sub: 'Multimodal Graph', icon: Cpu },
    { label: 'EDIT', sub: 'Human-in-Loop Studio', icon: Layers },
    { label: 'REPURPOSE', sub: '5 Platforms Sliced', icon: Share2 },
    { label: 'PUBLISH', sub: 'Spider Calendar', icon: Compass },
    { label: 'LEARN', sub: 'Creator DNA Insights', icon: BarChart2 }
  ];

  return (
    <div className="relative min-h-screen bg-[#05070D] text-[#F2F5F7] overflow-hidden">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient opacity-90 pointer-events-none" />

      {/* Landing Page Top Navbar */}
      <header className="sticky top-0 z-40 w-full bg-[#05070D]/90 backdrop-blur-xl border-b border-white/10">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5092F]/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-[#10141D] border border-[#E5092F]/60 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#E5092F] fill-current">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-['Outfit'] font-black text-lg tracking-wider text-white">
                CREATOR<span className="text-[#E5092F] text-glow-red">AI</span>
              </span>
              <span className="text-[9px] font-mono text-[#1769FF] tracking-widest uppercase -mt-1">Spider-Sense OS</span>
            </div>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { label: 'Features', tab: 'dashboard' },
              { label: 'Script Studio', tab: 'script' },
              { label: 'Web Studio', tab: 'editor' },
              { label: 'Analytics', tab: 'analytics' },
            ].map(item => (
              <button
                key={item.tab}
                onClick={() => { spiderSound.playClick(); setActiveTab(item.tab); }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide text-[#8E9BAE] hover:text-white hover:bg-white/5 transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setCommandBarOpen(true)}
              className="hidden sm:flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-[#10141D] border border-white/10 hover:border-[#E5092F]/50 text-xs text-[#8E9BAE] hover:text-white transition-all"
              title="Spider-Sense AI (Ctrl+K)"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5092F]" />
              <span className="hidden sm:inline">Spider-Sense</span>
              <kbd className="hidden sm:inline-flex items-center space-x-0.5 px-1 py-0.5 bg-white/5 border border-white/10 rounded text-[9px]">
                <Command className="w-2.5 h-2.5" /><span>K</span>
              </kbd>
            </button>
            <button
              onClick={toggleNotifications}
              className="relative p-2 rounded-lg bg-[#10141D] border border-white/10 hover:border-[#E5092F]/50 text-[#8E9BAE] hover:text-white transition-all"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E5092F] text-white text-[9px] font-bold flex items-center justify-center animate-pulse shadow-[0_0_8px_#E5092F]">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { spiderSound.playSpiderSense(); setActiveTab('dashboard'); }}
              className="web-button-primary px-4 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center space-x-2"
            >
              <span>ENTER HQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Spider Radar Badge */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#10141D] border border-[#E5092F]/40 shadow-[0_0_20px_rgba(229,9,47,0.25)] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
            HACKATHON LAUNCH EDITION · CREATORAI OS
          </span>
          <span className="text-xs text-[#1769FF] font-semibold">v1.0</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-['Outfit'] tracking-tight max-w-5xl leading-none">
          YOUR CONTENT.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F2F5F7] to-[#8E9BAE]">
            YOUR STORY.
          </span>{' '}
          <br />
          <span className="text-[#E5092F] text-glow-red">YOUR SPIDER-SENSE.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-[#8E9BAE] max-w-3xl font-normal leading-relaxed">
          Turn one long-form recording into an entire interconnected content universe.
          Powered by a <strong className="text-white">Multimodal Content Graph</strong> that maps your script to footage,
          discovers viral moments, and keeps the creator in 100% control of every cut.
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              spiderSound.playSpiderSense();
              setActiveTab('dashboard');
            }}
            className="web-button-primary px-8 py-4 rounded-xl text-base font-bold flex items-center space-x-3 cursor-pointer"
          >
            <span>ENTER SPIDER HQ</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={() => {
              spiderSound.playWebShoot();
              setActiveTab('alignment');
            }}
            className="web-button-secondary px-8 py-4 rounded-xl text-base font-bold flex items-center space-x-3 cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#1769FF] fill-current" />
            <span>SEE SCRIPT ↔ FOOTAGE DEMO</span>
          </button>
        </div>

        {/* Core Philosophy Callout */}
        <div className="mt-12 py-3 px-6 rounded-xl bg-[#10141D]/80 border border-white/10 backdrop-blur-md flex items-center space-x-4 text-xs font-mono tracking-wider">
          <span className="text-[#1769FF] font-bold">AI CREATES THE DRAFT.</span>
          <span className="text-[#8E9BAE]">──</span>
          <span className="text-[#E5092F] font-bold">THE CREATOR CONTROLS THE FINAL CUT.</span>
        </div>
      </section>

      {/* Connected Web Pipeline */}
      <section className="relative py-16 px-4 max-w-7xl mx-auto border-t border-b border-white/10 bg-[#071426]/40">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#1769FF]">
            THE MULTIMODAL CONTENT GRAPH
          </h2>
          <p className="text-2xl font-bold font-['Outfit'] text-white mt-1">
            From Raw Recording to Multi-Platform Ecosystem
          </p>
        </div>

        {/* Horizontal Pipeline Grid with Web Connectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative">
          {pipelineStages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.label}
                className="relative group p-4 rounded-xl bg-[#10141D] border border-white/10 hover:border-[#E5092F]/60 transition-all duration-300 flex flex-col items-center text-center shadow-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-[#05070D] border border-white/10 group-hover:border-[#E5092F] flex items-center justify-center text-[#1769FF] group-hover:text-[#E5092F] group-hover:shadow-[0_0_15px_rgba(229,9,47,0.4)] transition-all mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono font-bold tracking-wider text-white">
                  {stage.label}
                </div>
                <div className="text-[10px] text-[#8E9BAE] mt-1">{stage.sub}</div>

                {/* Step indicator */}
                <div className="mt-3 text-[9px] font-mono text-[#8E9BAE]/60 uppercase">
                  Stage 0{i + 1}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Showcase: The Signature Hackathon Capabilities */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold uppercase tracking-widest mb-3">
            <Flame className="w-4 h-4" />
            <span>Spider-Sense Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
            Not Just Another AI Video Generator
          </h2>
          <p className="mt-3 text-[#8E9BAE] text-base">
            CreatorAi is an operating platform that understands semantics, visual layout, and audio nuance across your entire recording.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="spider-panel spider-panel-hover p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5092F]/10 rounded-full blur-2xl group-hover:bg-[#E5092F]/20 transition-all pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-[#10141D] border border-[#E5092F]/50 flex items-center justify-center text-[#E5092F] mb-6 shadow-[0_0_20px_rgba(229,9,47,0.3)]">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-['Outfit'] text-white mb-2">
              Script ↔ Footage Intelligence
            </h3>
            <p className="text-sm text-[#8E9BAE] leading-relaxed mb-6">
              Aligns your script paragraphs with spoken speech in real time. Click any script section to instantly jump the video player to the matching 1080p frame with 96% confidence scoring.
            </p>
            <button
              onClick={() => {
                spiderSound.playClick();
                setActiveTab('alignment');
              }}
              className="text-xs font-mono font-bold text-[#E5092F] flex items-center space-x-1.5 hover:underline"
            >
              <span>EXPLORE ALIGNMENT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="spider-panel spider-panel-hover p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1769FF]/10 rounded-full blur-2xl group-hover:bg-[#1769FF]/20 transition-all pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-[#10141D] border border-[#1769FF]/50 flex items-center justify-center text-[#1769FF] mb-6 shadow-[0_0_20px_rgba(23,105,255,0.3)]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-['Outfit'] text-white mb-2">
              Web Studio: 100% Editable Plans
            </h3>
            <p className="text-sm text-[#8E9BAE] leading-relaxed mb-6">
              AI crafts the draft, but edits are stored in open <code className="text-white">edit_plan.json</code> schema. Adjust cuts, punch-in zoom, kinetic captions, and B-roll overlays on a multi-track timeline.
            </p>
            <button
              onClick={() => {
                spiderSound.playClick();
                setActiveTab('editor');
              }}
              className="text-xs font-mono font-bold text-[#1769FF] flex items-center space-x-1.5 hover:underline"
            >
              <span>OPEN WEB STUDIO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="spider-panel spider-panel-hover p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5092F]/10 rounded-full blur-2xl group-hover:bg-[#E5092F]/20 transition-all pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-[#10141D] border border-[#E5092F]/50 flex items-center justify-center text-[#E5092F] mb-6 shadow-[0_0_20px_rgba(229,9,47,0.3)]">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-['Outfit'] text-white mb-2">
              Creator DNA Persistent Memory
            </h3>
            <p className="text-sm text-[#8E9BAE] leading-relaxed mb-6">
              Stores your tone (educational, conversational, technical), pacing, brand fonts, and hook formulas so every clip candidate matches your authentic personal style.
            </p>
            <button
              onClick={() => {
                spiderSound.playClick();
                setActiveTab('creator-dna');
              }}
              className="text-xs font-mono font-bold text-[#E5092F] flex items-center space-x-1.5 hover:underline"
            >
              <span>INSPECT CREATOR DNA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Demo Project Banner */}
      <section className="py-16 px-4 max-w-6xl mx-auto mb-20">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#071426] via-[#10141D] to-[#071426] border border-[#E5092F]/40 shadow-[0_0_50px_rgba(229,9,47,0.25)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold uppercase mb-2">
              <Shield className="w-4 h-4" />
              <span>PRE-LOADED HACKATHON MISSION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white">
              Alex Carter: "Building a Production RAG System"
            </h3>
            <p className="text-sm text-[#8E9BAE] mt-2 max-w-xl">
              Includes 45:12 master footage, 6 structured script sections, 54 scenes, 12 clip candidates, and 5 multi-platform repurposing outputs ready for instant demonstration.
            </p>
          </div>
          <button
            onClick={() => {
              spiderSound.playSpiderSense();
              setActiveTab('dashboard');
            }}
            className="web-button-primary px-8 py-3.5 rounded-xl text-sm font-bold whitespace-nowrap cursor-pointer"
          >
            LAUNCH MISSION DEMO
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-[#05070D] text-center text-xs text-[#8E9BAE]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-['Outfit'] font-bold text-white tracking-wider">
            CREATOR<span className="text-[#E5092F]">AI</span> © 2026 · SPIDER-SENSE CREATOR OPERATING PLATFORM
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setCommandBarOpen(true)} className="hover:text-white">
              AI Command Bar [Ctrl+K]
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('settings')} className="hover:text-white">
              Settings & Providers
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
