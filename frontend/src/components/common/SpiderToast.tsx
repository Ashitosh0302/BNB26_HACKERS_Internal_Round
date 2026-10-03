import React from 'react';
import { useUIStore } from '../../stores/useUIStore';
import { Sparkles, X } from 'lucide-react';

export const SpiderToast: React.FC = () => {
  const { toastMessage, showToast } = useUIStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#071426] border border-[#E5092F]/60 text-white px-4 py-3 rounded-xl shadow-[0_0_30px_rgba(229,9,47,0.35)] flex items-center space-x-3 animate-in slide-in-from-bottom duration-300">
      <div className="p-1.5 rounded-lg bg-[#E5092F]/20 text-[#E5092F] animate-pulse">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="flex-1 text-xs font-medium leading-relaxed">
        {toastMessage}
      </div>
      <button
        onClick={() => showToast('')}
        className="text-[#8E9BAE] hover:text-white p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
