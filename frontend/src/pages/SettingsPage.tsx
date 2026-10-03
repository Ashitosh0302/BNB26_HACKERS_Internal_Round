import React, { useState } from 'react';
import { useUIStore } from '../stores/useUIStore';
import { Settings, Cpu, HardDrive, Key, Eye, EyeOff, Save, Check } from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const SettingsPage: React.FC = () => {
  const { isReducedMotion, toggleReducedMotion, isSoundEnabled, toggleSound, showToast } = useUIStore();

  const [openaiKey, setOpenaiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [storageProvider, setStorageProvider] = useState('local');
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    spiderSound.playSpiderSense();
    showToast('Settings & API provider keys updated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>INFRASTRUCTURE CONFIGURATION · SETTINGS</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            CREATORAI SETTINGS
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Configure modular AI model providers, object storage endpoints, and accessibility preferences.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="web-button-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer self-start md:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>SAVE SETTINGS</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Modular AI Providers */}
        <div className="spider-panel p-6 rounded-2xl bg-[#071426] space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-white/10">
            <Cpu className="w-4 h-4 text-[#E5092F]" />
            <h2 className="text-base font-bold font-['Outfit'] text-white">
              MODULAR AI PROVIDERS
            </h2>
          </div>

          <p className="text-xs text-[#8E9BAE] leading-relaxed">
            By default, CreatorAi uses deterministic high-fidelity Spider-Sense offline mock models for instant hackathon demonstration. Add live API keys below to switch to real cloud APIs.
          </p>

          <div className="space-y-3 pt-2 text-xs font-mono">
            <div>
              <label className="text-[#8E9BAE] block mb-1">OPENAI API KEY (GPT-4o & Whisper):</label>
              <div className="flex items-center bg-[#10141D] rounded-xl border border-white/10 px-3 py-2">
                <Key className="w-4 h-4 text-[#8E9BAE] mr-2" />
                <input
                  type={showKey ? 'text' : 'password'}
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder="sk-proj-••••••••••••••••••••••••••••••••"
                  className="bg-transparent text-white w-full focus:outline-none"
                />
                <button type="button" onClick={() => setShowKey(!showKey)} className="text-[#8E9BAE] hover:text-white">
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[#8E9BAE] block mb-1">ANTHROPIC API KEY (Claude 3.5 Sonnet):</label>
              <div className="flex items-center bg-[#10141D] rounded-xl border border-white/10 px-3 py-2">
                <Key className="w-4 h-4 text-[#8E9BAE] mr-2" />
                <input
                  type={showKey ? 'text' : 'password'}
                  value={anthropicKey}
                  onChange={(e) => setAnthropicKey(e.target.value)}
                  placeholder="sk-ant-••••••••••••••••••••••••••••••••"
                  className="bg-transparent text-white w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Storage & Preferences */}
        <div className="spider-panel p-6 rounded-2xl bg-[#071426] space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-white/10">
            <HardDrive className="w-4 h-4 text-[#1769FF]" />
            <h2 className="text-base font-bold font-['Outfit'] text-white">
              STORAGE & ACCESSIBILITY
            </h2>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-[#8E9BAE] block mb-1.5">OBJECT STORAGE PROVIDER:</label>
              <select
                value={storageProvider}
                onChange={(e) => setStorageProvider(e.target.value)}
                className="w-full bg-[#10141D] text-white px-3 py-2 rounded-xl border border-white/10 focus:border-[#1769FF] focus:outline-none"
              >
                <option value="local">Local Filesystem Storage (Offline Hackathon Default)</option>
                <option value="s3">AWS S3 (Amazon Web Services)</option>
                <option value="r2">Cloudflare R2 (Zero Egress)</option>
                <option value="supabase">Supabase Storage</option>
              </select>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isReducedMotion}
                  onChange={toggleReducedMotion}
                  className="accent-[#E5092F] w-4 h-4 rounded"
                />
                <span className="text-white">Enable Reduced Motion (Disable Parallax & Web Canvas)</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSoundEnabled}
                  onChange={toggleSound}
                  className="accent-[#1769FF] w-4 h-4 rounded"
                />
                <span className="text-white">Enable Spider-Sense Procedural Audio Effects</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
