import React, { useState } from 'react';
import { useProjectStore } from '../stores/useProjectStore';
import { useUIStore } from '../stores/useUIStore';
import { GraphNode } from '../types';
import {
  Layers, Play, Sparkles, ArrowRight, Share2, Film,
  Clock, ShieldCheck, CheckCircle2, ChevronRight, X
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const ContentGraphPage: React.FC = () => {
  const { contentGraph } = useProjectStore();
  const { setActiveTab } = useUIStore();

  const [selectedNode, setSelectedNode] = useState<GraphNode>(contentGraph.nodes[0]);

  const handleNodeClick = (node: GraphNode) => {
    spiderSound.playClick();
    setSelectedNode(node);
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'mission':
        return { bg: 'bg-[#E5092F]', border: 'border-[#E5092F]', text: 'text-white', glow: 'shadow-[0_0_20px_rgba(229,9,47,0.6)]' };
      case 'script':
        return { bg: 'bg-[#1769FF]', border: 'border-[#1769FF]', text: 'text-white', glow: 'shadow-[0_0_20px_rgba(23,105,255,0.6)]' };
      case 'recording':
        return { bg: 'bg-emerald-600', border: 'border-emerald-500', text: 'text-white', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]' };
      case 'scene':
        return { bg: 'bg-[#10141D]', border: 'border-white/30', text: 'text-[#8E9BAE]', glow: '' };
      case 'clip':
        return { bg: 'bg-amber-600', border: 'border-amber-500', text: 'text-white', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]' };
      case 'repurpose':
        return { bg: 'bg-purple-600', border: 'border-purple-500', text: 'text-white', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]' };
      default:
        return { bg: 'bg-white/10', border: 'border-white/20', text: 'text-white', glow: '' };
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>SIGNATURE ARCHITECTURE · MULTIMODAL CONTENT GRAPH</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            THE CONTENT WEB
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Interactive visual lineage mapping source ideas, footage, clips, and multi-platform distribution.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono text-[#8E9BAE]">
          <span className="text-white font-bold">{contentGraph.nodes.length} Connected Nodes</span>
          <span>·</span>
          <span>{contentGraph.edges.length} Lineage Strands</span>
        </div>
      </div>

      {/* Main Graph Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8 flex-1">
        {/* Interactive Web Graph Canvas (8 cols) */}
        <div className="lg:col-span-8 spider-panel p-6 rounded-2xl bg-[#071426] relative overflow-hidden flex flex-col justify-between min-h-[580px]">
          {/* Subtle Grid Lines Background */}
          <div className="absolute inset-0 web-grid-bg opacity-30 pointer-events-none" />

          {/* SVG Web Connecting Strands */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="webStrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5092F" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#1769FF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F2F5F7" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {contentGraph.edges.map((edge) => {
              const srcNode = contentGraph.nodes.find((n) => n.id === edge.source);
              const tgtNode = contentGraph.nodes.find((n) => n.id === edge.target);
              if (!srcNode || !tgtNode) return null;

              const isHighlighted = selectedNode.id === srcNode.id || selectedNode.id === tgtNode.id;

              return (
                <line
                  key={edge.id}
                  x1={`${(srcNode.x || 100) / 10}%`}
                  y1={`${(srcNode.y || 100) / 7}%`}
                  x2={`${(tgtNode.x || 100) / 10}%`}
                  y2={`${(tgtNode.y || 100) / 7}%`}
                  stroke={isHighlighted ? '#E5092F' : 'rgba(242, 245, 247, 0.25)'}
                  strokeWidth={isHighlighted ? '2.5' : '1.2'}
                  strokeDasharray={isHighlighted ? 'none' : '4 3'}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Interactive Web Nodes */}
          <div className="relative z-10 w-full h-full min-h-[500px]">
            {contentGraph.nodes.map((node) => {
              const colors = getNodeColor(node.type);
              const isSelected = selectedNode.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`absolute p-3 rounded-xl border cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
                    colors.bg
                  } ${colors.border} ${colors.glow} ${
                    isSelected
                      ? 'scale-110 ring-4 ring-[#E5092F] z-20 shadow-[0_0_30px_#E5092F]'
                      : 'hover:scale-105 z-10'
                  }`}
                  style={{
                    left: `${(node.x || 100) / 10}%`,
                    top: `${(node.y || 100) / 7}%`
                  }}
                >
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-white whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>{node.label}</span>
                  </div>
                  {node.subtext && (
                    <div className="text-[10px] text-white/80 font-mono mt-0.5 whitespace-nowrap">
                      {node.subtext}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Graph Legend */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-[#8E9BAE] gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-[#E5092F]" />
                <span>Mission</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-[#1769FF]" />
                <span>Script</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                <span>Recording</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-500" />
                <span>Clips</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-purple-500" />
                <span>Repurposed</span>
              </span>
            </div>
            <span className="text-white">Click any node to trace origin</span>
          </div>
        </div>

        {/* Right: Node Inspector Drawer (4 cols) */}
        <div className="lg:col-span-4 spider-panel p-6 rounded-2xl bg-[#071426] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#E5092F] font-bold">
                NODE INSPECTOR
              </span>
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-white">
                {selectedNode.type}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold font-['Outfit'] text-white">
                {selectedNode.label}
              </h3>
              <p className="text-xs text-[#8E9BAE] font-mono mt-1">
                {selectedNode.subtext}
              </p>
            </div>

            {/* Lineage Trace Box */}
            <div className="p-4 rounded-xl bg-[#05070D] border border-white/5 space-y-2">
              <div className="text-xs font-mono text-[#1769FF] font-bold uppercase">
                PARENT LINEAGE TRACE:
              </div>
              <div className="text-xs text-[#8E9BAE] leading-relaxed">
                Source Project: <strong>Building a Production RAG System</strong> <br />
                Master Duration: <strong>45:12 (6,842 words)</strong> <br />
                Status: <strong className="text-emerald-400">Synchronized & Verified</strong>
              </div>
            </div>

            {/* Node Metadata */}
            {selectedNode.metrics && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                {Object.entries(selectedNode.metrics).map(([k, v]) => (
                  <div key={k} className="p-3 rounded-lg bg-[#10141D] border border-white/5">
                    <div className="text-[10px] font-mono uppercase text-[#8E9BAE]">{k}</div>
                    <div className="text-base font-bold text-white mt-0.5">{String(v)}%</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Jump Action */}
          <div className="pt-6 border-t border-white/10">
            <button
              onClick={() => {
                spiderSound.playClick();
                if (selectedNode.type === 'script') setActiveTab('script');
                else if (selectedNode.type === 'clip') setActiveTab('clips');
                else if (selectedNode.type === 'repurpose') setActiveTab('repurpose');
                else if (selectedNode.type === 'recording' || selectedNode.type === 'scene') setActiveTab('alignment');
                else setActiveTab('editor');
              }}
              className="web-button-primary w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>OPEN WORKSPACE FOR THIS NODE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
