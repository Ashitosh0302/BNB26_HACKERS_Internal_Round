import React from 'react';
import { useProjectStore } from '../stores/useProjectStore';
import { useUIStore } from '../stores/useUIStore';
import {
  Calendar as CalendarIcon, Clock, Share2, Video,
  MessageSquare, Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const CalendarPage: React.FC = () => {
  const { repurposedItems } = useProjectStore();
  const { showToast } = useUIStore();

  const days = [
    { day: 'MONDAY', date: 'OCT 06', item: repurposedItems[0], time: '14:00' },
    { day: 'TUESDAY', date: 'OCT 07', item: repurposedItems[1], time: '18:30' },
    { day: 'WEDNESDAY', date: 'OCT 08', item: repurposedItems[2], time: '16:00' },
    { day: 'THURSDAY', date: 'OCT 09', item: repurposedItems[3], time: '09:00' },
    { day: 'FRIDAY', date: 'OCT 10', item: repurposedItems[4], time: '11:30' }
  ];

  const handleReschedule = (dayName: string) => {
    spiderSound.playClick();
    showToast(`Spider Calendar: Rescheduled queue for ${dayName}`);
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>DISPATCH ORCHESTRATION · SPIDER CALENDAR</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            CONTENT WEB CALENDAR
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Interconnected distribution schedule across YouTube, Instagram, TikTok, LinkedIn, and X.
          </p>
        </div>

        <div className="text-xs font-mono text-[#8E9BAE]">
          <span className="text-white font-bold">5 Nodes Scheduled</span> for Launch Week
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
        {days.map((d, idx) => (
          <div
            key={idx}
            className="spider-panel spider-panel-hover p-4 rounded-2xl bg-[#071426] flex flex-col justify-between min-h-[380px]"
          >
            <div>
              {/* Day Badge */}
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#E5092F] font-bold tracking-wider">
                    {d.day}
                  </div>
                  <div className="text-lg font-bold font-['Outfit'] text-white">
                    {d.date}
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#1769FF] animate-pulse" />
              </div>

              {/* Scheduled Item */}
              {d.item && (
                <div className="mt-4 p-3.5 rounded-xl bg-[#10141D] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[#1769FF] font-bold">
                      {d.item.platform.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-[#8E9BAE]">
                      ⏱ {d.time}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-white line-clamp-2 leading-snug">
                    {d.item.headline_hook}
                  </div>

                  <div className="text-[10px] font-mono text-[#8E9BAE] line-clamp-2">
                    {d.item.primary_copy}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400">
                ● Auto-Dispatch
              </span>
              <button
                onClick={() => handleReschedule(d.day)}
                className="text-[10px] font-mono text-[#8E9BAE] hover:text-white"
              >
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
