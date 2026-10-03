import React, { useState, useEffect } from 'react';
import { useUIStore } from '../../stores/useUIStore';
import { useProjectStore } from '../../stores/useProjectStore';
import { useEditorStore } from '../../stores/useEditorStore';
import { Search, Sparkles, Film, AlignLeft, Layers, Share2, Compass, ArrowRight, X } from 'lucide-react';
import { spiderSound } from '../../services/audioSfx';

export const AICommandBar: React.FC = () => {
  const { isCommandBarOpen, setCommandBarOpen, setActiveTab, showToast } = useUIStore();
  const { scanClips, realignScript } = useProjectStore();
  const { applyAllAiSuggestions } = useEditorStore();

  const [query, setQuery] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandBarOpen(!isCommandBarOpen);
      }
      if (e.key === 'Escape' && isCommandBarOpen) {
        setCommandBarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandBarOpen, setCommandBarOpen]);

  if (!isCommandBarOpen) return null;

  const quickCommands = [
    {
      id: 'cmd_1',
      title: 'Find my best clip about embeddings',
      subtitle: 'Spider-Sense scans transcript for vector clustering thesis',
      icon: Film,
      category: 'Intelligence',
      action: async () => {
        setIsExecuting(true);
        await scanClips();
        setIsExecuting(false);
        setCommandBarOpen(false);
        setActiveTab('clips');
        showToast('🕷 SPIDER-SENSE: Found Clip #1 (Score 95% on Embeddings)');
      }
    },
    {
      id: 'cmd_2',
      title: 'Create 3 shorts from this recording',
      subtitle: 'Auto-slice into YouTube Shorts, Reels, and TikToks',
      icon: Share2,
      category: 'Repurpose',
      action: () => {
        setCommandBarOpen(false);
        setActiveTab('repurpose');
        showToast('🕸 Generated 3 high-impact short-form packages');
      }
    },
    {
      id: 'cmd_3',
      title: 'Show moments where I explain vector databases',
      subtitle: 'Jump to synchronized Script ↔ Footage Alignment',
      icon: AlignLeft,
      category: 'Alignment',
      action: async () => {
        setIsExecuting(true);
        await realignScript();
        setIsExecuting(false);
        setCommandBarOpen(false);
        setActiveTab('alignment');
        showToast('🕸 Script matched to Scene 02 (00:00:18 - 00:01:08)');
      }
    },
    {
      id: 'cmd_4',
      title: 'Make this 30 seconds & optimize for Creator DNA',
      subtitle: 'Auto-trim hesitation and punch-in zoom on timeline',
      icon: Sparkles,
      category: 'Web Studio',
      action: () => {
        applyAllAiSuggestions();
        setCommandBarOpen(false);
        setActiveTab('editor');
        showToast('⚡ Applied all Spider-Sense retention edits to timeline');
      }
    },
    {
      id: 'cmd_5',
      title: 'Inspect Multimodal Content Web',
      subtitle: 'Open signature node graph of source recordings & lineage',
      icon: Layers,
      category: 'Content Web',
      action: () => {
        setCommandBarOpen(false);
        setActiveTab('content-graph');
      }
    },
    {
      id: 'cmd_6',
      title: 'Search Web Vault for Architecture B-Roll',
      subtitle: 'Semantic search inside media library',
      icon: Compass,
      category: 'Web Vault',
      action: () => {
        setCommandBarOpen(false);
        setActiveTab('assets');
      }
    }
  ];

  const filteredCommands = query
    ? quickCommands.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : quickCommands;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsExecuting(true);
    spiderSound.playSpiderSense();
    setTimeout(() => {
      setIsExecuting(false);
      setCommandBarOpen(false);
      showToast(`🕷 Spider-Sense executed: "${query}"`);
      setQuery('');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#071426]/95 border border-[#E5092F]/40 rounded-2xl shadow-[0_0_50px_rgba(229,9,47,0.3)] overflow-hidden">
        {/* Top Radar Bar */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#05070D] border-b border-white/10 text-xs font-mono text-[#8E9BAE]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span className="text-[#E5092F] font-bold tracking-wider">SPIDER-SENSE RADAR</span>
            <span>· MULTIMODAL COMMAND HUD</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleCustomSubmit} className="flex items-center px-5 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-[#E5092F] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Spider-Sense AI or type a command... (e.g. 'Turn this into a LinkedIn post')"
            className="w-full bg-transparent text-white placeholder-[#8E9BAE] text-base focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#8E9BAE] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Command list */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1">
          {isExecuting ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <div className="w-8 h-8 border-2 border-[#E5092F] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-mono text-[#E5092F] tracking-wide animate-pulse">
                SPIDER-SENSE SCANNING MULTIMODAL GRAPH...
              </p>
            </div>
          ) : filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    spiderSound.playClick();
                    cmd.action();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-colors text-left border border-transparent hover:border-[#1769FF]/30"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="p-2 rounded-lg bg-[#10141D] text-[#1769FF] group-hover:text-[#E5092F] group-hover:bg-[#E5092F]/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-[#F2F5F7]">
                        {cmd.title}
                      </div>
                      <div className="text-xs text-[#8E9BAE]">{cmd.subtitle}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-[#8E9BAE]">
                      {cmd.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#8E9BAE] group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-sm text-[#8E9BAE]">
              Press <kbd className="px-2 py-0.5 bg-white/10 rounded">Enter</kbd> to ask Spider-Sense AI: "{query}"
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-2.5 bg-[#05070D]/80 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8E9BAE]">
          <span>⚡ Tip: Select any command or type custom natural language queries</span>
          <span className="font-mono text-[#E5092F]">Spider-Sense AI Engine v1.0</span>
        </div>
      </div>
    </div>
  );
};
