import React, { useState } from 'react';
import { useUIStore } from '../stores/useUIStore';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, User as UserIcon } from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const AuthPages: React.FC = () => {
  const { setActiveTab, showToast, updateCreatorMemory } = useUIStore();
  const [isLogin, setIsLogin] = useState(true);

  // Form states
  const [email, setEmail] = useState('alex@creatorai.studio');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Alex Carter');
  const [niche, setNiche] = useState('AI Systems & RAG');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    spiderSound.playSpiderSense();
    if (!isLogin) {
      updateCreatorMemory({ creator_name: name });
      showToast(`Welcome to the Web, ${name}! Creator DNA bootstrapped.`);
    } else {
      showToast('Logged into Spider HQ successfully!');
    }
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-[#05070D] to-[#05070D] pointer-events-none" />

      <div className="relative w-full max-w-md spider-panel p-8 rounded-2xl bg-[#071426] border border-[#E5092F]/50 shadow-[0_0_50px_rgba(229,9,47,0.25)]">
        {/* Top Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-[#10141D] border border-[#E5092F] items-center justify-center text-[#E5092F] shadow-[0_0_20px_rgba(229,9,47,0.4)] mb-3">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-black font-['Outfit'] text-white uppercase tracking-wider">
            CREATOR<span className="text-[#E5092F] text-glow-red">AI</span>
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#1769FF] mt-0.5">
            {isLogin ? 'ENTER THE WEB' : 'CREATE YOUR CREATOR PROFILE'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-xs font-mono text-[#8E9BAE] block mb-1">CREATOR NAME</label>
              <div className="flex items-center bg-[#10141D] rounded-xl border border-white/10 px-3 py-2 text-xs">
                <UserIcon className="w-4 h-4 text-[#8E9BAE] mr-2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent text-white w-full focus:outline-none"
                  placeholder="Alex Carter"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-mono text-[#8E9BAE] block mb-1">EMAIL ADDRESS</label>
            <div className="flex items-center bg-[#10141D] rounded-xl border border-white/10 px-3 py-2 text-xs">
              <Mail className="w-4 h-4 text-[#8E9BAE] mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white w-full focus:outline-none"
                placeholder="alex@creatorai.studio"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-[#8E9BAE] block mb-1">PASSWORD</label>
            <div className="flex items-center bg-[#10141D] rounded-xl border border-white/10 px-3 py-2 text-xs">
              <Lock className="w-4 h-4 text-[#8E9BAE] mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-white w-full focus:outline-none"
                placeholder="••••••••••••"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="text-xs font-mono text-[#8E9BAE] block mb-1">MAIN NICHE / CATEGORY</label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="bg-[#10141D] rounded-xl border border-white/10 px-3 py-2 text-xs text-white w-full focus:outline-none"
                placeholder="AI Systems & Software Architecture"
              />
            </div>
          )}

          <button
            type="submit"
            className="web-button-primary w-full py-3 rounded-xl text-xs font-bold mt-2 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>{isLogin ? 'ENTER SPIDER HQ' : 'INITIALIZE CREATOR PROFILE'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-[#8E9BAE]">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="hover:text-white underline font-mono"
          >
            {isLogin
              ? "New creator? Initialize your profile here"
              : 'Already have a Creator profile? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};
