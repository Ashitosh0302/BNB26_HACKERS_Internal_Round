import React, { useState } from 'react';
import { useProjectStore } from '../stores/useProjectStore';
import { useUIStore } from '../stores/useUIStore';
import { Project } from '../types';
import {
  FolderKanban, Plus, Clock, Film, Share2, ArrowRight,
  Sparkles, CheckCircle2, ShieldAlert, X
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const ProjectsList: React.FC = () => {
  const { projects, setActiveProject, addProject } = useProjectStore();
  const { setActiveTab, showToast } = useUIStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newNiche, setNewNiche] = useState('AI Systems & LLMs');

  const handleSelectProject = (p: Project) => {
    spiderSound.playClick();
    setActiveProject(p);
    setActiveTab('dashboard');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    spiderSound.playSpiderSense();
    const newProj: Project = {
      id: `proj_${Date.now()}`,
      title: newTitle,
      niche: newNiche,
      description: 'Newly initialized mission inside Spider HQ.',
      thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop',
      duration_formatted: '00:00',
      status: 'analyzing',
      analysis_progress: 10,
      clips_count: 0,
      repurposed_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    addProject(newProj);
    setIsModalOpen(false);
    showToast(`Created Mission: "${newTitle}"!`);
    setActiveTab('recording');
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>MISSION DIRECTORY · PROJECT HUBS</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            CREATOR MISSIONS
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Select an active project or initialize a new multimodal content universe.
          </p>
        </div>

        <button
          onClick={() => {
            spiderSound.playClick();
            setIsModalOpen(true);
          }}
          className="web-button-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>NEW MISSION</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => handleSelectProject(proj)}
            className="spider-panel spider-panel-hover p-5 rounded-2xl flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4 border border-white/10">
                <img
                  src={proj.thumbnail_url}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#1769FF] border border-white/10 font-bold uppercase">
                  {proj.niche}
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-[#E5092F]" />
                  <span>{proj.duration_formatted}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold font-['Outfit'] text-white group-hover:text-[#1769FF] transition-colors">
                {proj.title}
              </h3>
              <p className="text-xs text-[#8E9BAE] mt-1.5 line-clamp-2 leading-relaxed">
                {proj.description}
              </p>

              {/* Metrics */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#8E9BAE]">
                <span className="flex items-center space-x-1">
                  <Film className="w-3.5 h-3.5 text-[#E5092F]" />
                  <span>{proj.clips_count} Clips</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Share2 className="w-3.5 h-3.5 text-[#1769FF]" />
                  <span>{proj.repurposed_count} Slices</span>
                </span>
                <span className="text-emerald-400 font-bold">
                  {proj.analysis_progress}% Ready
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono font-bold text-[#E5092F]">
              <span>ENTER MISSION HQ</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#071426] border border-[#E5092F]/60 rounded-2xl overflow-hidden shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-['Outfit'] text-white">
                INITIALIZE NEW MISSION
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8E9BAE] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8E9BAE] block mb-1.5">
                  MISSION TITLE:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Next.js 15 Server Actions Deep Dive"
                  className="w-full bg-[#10141D] text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#E5092F] focus:outline-none text-sm"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8E9BAE] block mb-1.5">
                  CONTENT NICHE:
                </label>
                <input
                  type="text"
                  value={newNiche}
                  onChange={(e) => setNewNiche(e.target.value)}
                  placeholder="e.g. Full-Stack Web Development"
                  className="w-full bg-[#10141D] text-white px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-[#E5092F] focus:outline-none text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-[#8E9BAE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="web-button-primary px-5 py-2 rounded-xl text-xs font-bold"
                >
                  INITIALIZE MISSION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
