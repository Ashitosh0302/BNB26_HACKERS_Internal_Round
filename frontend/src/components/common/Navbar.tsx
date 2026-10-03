import React from 'react';
import { useUIStore } from '../../stores/useUIStore';
import { useProjectStore } from '../../stores/useProjectStore';
import {
  Bell, Volume2, VolumeX, Sparkles, Command, ShieldAlert,
  FolderKanban, PlaySquare, Compass, BarChart3, User, Globe
} from 'lucide-react';
import { spiderSound } from '../../services/audioSfx';

export const Navbar: React.FC = () => {
  const {
    activeTab, setActiveTab,
    isSoundEnabled, toggleSound,
    toggleNotifications, notifications,
    setCommandBarOpen
  } = useUIStore();

  const { activeProject } = useProjectStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Spider HQ', icon: Globe },
    { id: 'projects', label: 'Missions', icon: FolderKanban },
    { id: 'content-graph', label: 'Content Web', icon: PlaySquare },
    { id: 'assets', label: 'Web Vault', icon: Compass },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'creator-dna', label: 'Creator DNA', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05070D]/90 backdrop-blur-xl border-b border-white/10">
      {/* Subtle web strand connector line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5092F]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-2.5 group cursor-pointer"
          >
            {/* Spider Badge */}
            <div className="relative w-9 h-9 rounded-xl bg-[#10141D] border border-[#E5092F]/60 flex items-center justify-center group-hover:border-[#E5092F] group-hover:shadow-[0_0_15px_rgba(229,9,47,0.5)] transition-all">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#E5092F] fill-current">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#E5092F]/20 to-[#1769FF]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-['Outfit'] font-black text-lg tracking-wider text-white">
                CREATOR<span className="text-[#E5092F] text-glow-red">AI</span>
              </span>
              <span className="text-[9px] font-mono text-[#1769FF] tracking-widest uppercase -mt-1">
                Spider-Sense OS
              </span>
            </div>
          </button>

          {/* Active Mission Pill */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#10141D] border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#1769FF] animate-pulse" />
            <span className="text-[#8E9BAE]">Mission:</span>
            <span className="font-semibold text-white truncate max-w-[200px]">
              {activeProject.title}
            </span>
          </div>
        </div>

        {/* Central Nav Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? 'text-white bg-[#10141D] border border-[#E5092F]/50 shadow-[0_0_12px_rgba(229,9,47,0.25)]'
                    : 'text-[#8E9BAE] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#E5092F] shadow-[0_0_8px_#E5092F]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Actions */}
        <div className="flex items-center space-x-2.5">
          {/* AI Command Bar Trigger */}
          <button
            onClick={() => setCommandBarOpen(true)}
            className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-[#10141D] border border-white/10 hover:border-[#E5092F]/50 text-xs text-[#8E9BAE] hover:text-white transition-all group"
            title="Open Spider-Sense AI (Ctrl+K)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5092F] group-hover:animate-spin" />
            <span className="hidden sm:inline">Spider-Sense</span>
            <kbd className="hidden sm:inline-flex items-center space-x-0.5 px-1 py-0.5 bg-white/5 border border-white/10 rounded text-[9px]">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all ${
              isSoundEnabled
                ? 'bg-[#10141D] border-[#1769FF]/40 text-[#1769FF] hover:border-[#1769FF]'
                : 'bg-transparent border-white/10 text-[#8E9BAE] hover:text-white'
            }`}
            title={isSoundEnabled ? 'Spider SFX Enabled' : 'Spider SFX Muted'}
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Spider-Sense Notifications */}
          <button
            onClick={toggleNotifications}
            className="relative p-2 rounded-lg bg-[#10141D] border border-white/10 hover:border-[#E5092F]/50 text-[#8E9BAE] hover:text-white transition-all"
            title="Spider-Sense Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E5092F] text-white text-[9px] font-bold flex items-center justify-center animate-pulse shadow-[0_0_8px_#E5092F]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Special Demo Mode Pill */}
          <button
            onClick={() => {
              spiderSound.playSpiderSense();
              setActiveTab('dashboard');
            }}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#E5092F]/20 to-[#1769FF]/20 border border-[#E5092F]/50 hover:border-[#E5092F] text-white text-xs font-semibold shadow-[0_0_15px_rgba(229,9,47,0.2)] transition-all hover:scale-105"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#E5092F]" />
            <span>DEMO MODE</span>
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => setActiveTab('creator-dna')}
            className="relative w-8 h-8 rounded-full overflow-hidden border border-[#E5092F] hover:ring-2 hover:ring-[#1769FF] transition-all"
            title="Alex Carter - Creator DNA"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
              alt="Alex Carter"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
