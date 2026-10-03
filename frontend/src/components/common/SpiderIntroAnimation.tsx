import React, { useEffect, useState } from 'react';
import { useUIStore } from '../../stores/useUIStore';
import { spiderSound } from '../../services/audioSfx';

interface Props {
  onComplete: () => void;
}

export const SpiderIntroAnimation: React.FC<Props> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);
  const isReducedMotion = useUIStore((s) => s.isReducedMotion);

  useEffect(() => {
    if (isReducedMotion) {
      onComplete();
      return;
    }

    // ESC key to skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onComplete();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Step 1: Glowing point
    const t1 = setTimeout(() => {
      setStage(1);
      spiderSound.playClick();
    }, 300);

    // Step 2: Web strand shoots
    const t2 = setTimeout(() => {
      setStage(2);
      spiderSound.playWebShoot();
    }, 800);

    // Step 3: Web strands connect & symbol forms
    const t3 = setTimeout(() => {
      setStage(3);
    }, 1400);

    // Step 4: Red/Blue light pulse
    const t4 = setTimeout(() => {
      setStage(4);
      spiderSound.playSpiderSense();
    }, 2000);

    // Step 5: Complete & fade in
    const t5 = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isReducedMotion, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070D] overflow-hidden select-none">
      {/* City night subtle backdrop silhouette */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-950 via-[#05070D] to-[#05070D]" />

      {/* SVG Canvas for Web Strands Animation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {stage >= 2 && (
          <>
            {/* Primary shooting web strand */}
            <line
              x1="0"
              y1="0"
              x2="50%"
              y2="50%"
              stroke="#F2F5F7"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset={stage >= 2 ? '0' : '1000'}
              className="transition-all duration-700 ease-out"
              opacity="0.8"
            />
            <line
              x1="100%"
              y1="0"
              x2="50%"
              y2="50%"
              stroke="#1769FF"
              strokeWidth="2"
              filter="url(#glow-blue)"
              className="transition-all duration-700 delay-100 ease-out"
              opacity="0.85"
            />
            <line
              x1="0"
              y1="100%"
              x2="50%"
              y2="50%"
              stroke="#E5092F"
              strokeWidth="2"
              filter="url(#glow-red)"
              className="transition-all duration-700 delay-200 ease-out"
              opacity="0.85"
            />
            <line
              x1="100%"
              y1="100%"
              x2="50%"
              y2="50%"
              stroke="#F2F5F7"
              strokeWidth="2"
              className="transition-all duration-700 delay-300 ease-out"
              opacity="0.8"
            />
          </>
        )}

        {stage >= 3 && (
          <>
            {/* Concentric Web Rings forming outwards */}
            <circle cx="50%" cy="50%" r="60" fill="none" stroke="rgba(242, 245, 247, 0.4)" strokeWidth="1" strokeDasharray="6 4" className="animate-pulse" />
            <circle cx="50%" cy="50%" r="120" fill="none" stroke="rgba(23, 105, 255, 0.3)" strokeWidth="1" strokeDasharray="8 6" />
            <circle cx="50%" cy="50%" r="200" fill="none" stroke="rgba(229, 9, 47, 0.25)" strokeWidth="1" strokeDasharray="12 8" />
          </>
        )}
      </svg>

      {/* Center Emblem Container */}
      <div className="relative flex flex-col items-center justify-center text-center z-10">
        {/* Glowing point */}
        <div
          className={`w-3 h-3 rounded-full bg-[#F2F5F7] shadow-[0_0_25px_#F2F5F7] transition-all duration-500 ${
            stage === 1 ? 'scale-150 ring-8 ring-[#E5092F]/50 ring-offset-4 ring-offset-black' : stage >= 2 ? 'opacity-0 scale-0' : 'opacity-0 scale-50'
          }`}
        />

        {/* CreatorAi Spider Symbol */}
        <div
          className={`relative transition-all duration-700 transform ${
            stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          {/* Spider Radar Pulse Rings */}
          {stage >= 4 && (
            <div className="absolute -inset-10 rounded-full border border-[#E5092F]/50 animate-ping opacity-75" />
          )}

          <div className="w-24 h-24 rounded-2xl bg-[#10141D] border-2 border-[#E5092F] shadow-[0_0_40px_rgba(229,9,47,0.5)] flex items-center justify-center relative overflow-hidden group">
            {/* Spider Badge Silhouette Graphic */}
            <svg viewBox="0 0 24 24" className="w-14 h-14 text-[#E5092F] fill-current drop-shadow-[0_0_12px_rgba(229,9,47,0.8)]">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1769FF]/20 to-[#E5092F]/20 pointer-events-none" />
          </div>
        </div>

        {/* Text Reveal */}
        <div className={`mt-6 transition-all duration-500 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl font-black tracking-widest text-[#F2F5F7] font-['Outfit'] uppercase">
            CREATOR<span className="text-[#E5092F] text-glow-red">AI</span>
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#1769FF] font-semibold mt-1">
            Your Content. Your Story. Your Spider-Sense.
          </p>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-xs text-[#8E9BAE] hover:text-[#F2F5F7] bg-[#10141D]/80 border border-white/10 px-4 py-1.5 rounded-full transition-all duration-200 hover:border-[#E5092F]/50 backdrop-blur-sm"
      >
        SKIP INTRO [ESC]
      </button>
    </div>
  );
};
