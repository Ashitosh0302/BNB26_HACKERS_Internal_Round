import React from 'react';
import { useUIStore } from '../../stores/useUIStore';
import { X, Check, ArrowRight, Zap, Link, Flame, AlertTriangle, Eye } from 'lucide-react';
import { spiderSound } from '../../services/audioSfx';

export const SpiderNotificationsDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    toggleNotifications,
    notifications,
    markNotificationAsRead,
    setActiveTab
  } = useUIStore();

  if (!isNotificationsOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <Zap className="w-4 h-4 text-[#E5092F]" />;
      case 'connection':
        return <Link className="w-4 h-4 text-[#1769FF]" />;
      case 'performance':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'review':
        return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      default:
        return <Eye className="w-4 h-4 text-white" />;
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'border-[#E5092F]/40 bg-[#E5092F]/10 text-[#E5092F]';
      case 'connection':
        return 'border-[#1769FF]/40 bg-[#1769FF]/10 text-[#1769FF]';
      case 'performance':
        return 'border-amber-500/40 bg-amber-500/10 text-amber-400';
      case 'review':
        return 'border-orange-500/40 bg-orange-500/10 text-orange-400';
      default:
        return 'border-white/20 bg-white/5 text-white';
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-[#071426]/95 border-l border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#05070D]">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5092F] animate-pulse" />
          <h2 className="text-sm font-['Outfit'] font-bold uppercase tracking-wider text-white">
            SPIDER-SENSE CENTER
          </h2>
        </div>
        <button
          onClick={toggleNotifications}
          className="p-1 rounded-lg text-[#8E9BAE] hover:text-white hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3.5 rounded-xl border transition-all ${
              notif.read
                ? 'bg-[#10141D]/50 border-white/5 opacity-75'
                : 'bg-[#10141D] border-white/10 hover:border-[#E5092F]/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {getTypeIcon(notif.type)}
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${getBadgeStyle(notif.type)}`}>
                  {notif.type}
                </span>
                {notif.confidence && (
                  <span className="text-[10px] font-mono text-[#8E9BAE]">
                    {notif.confidence}% match
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#8E9BAE]">{notif.timestamp}</span>
            </div>

            <div className="mt-2 text-xs font-semibold text-white leading-snug">
              {notif.title}
            </div>

            <div className="mt-1 text-xs text-[#8E9BAE] leading-relaxed">
              {notif.message}
            </div>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5">
              {notif.action_label && notif.target_route ? (
                <button
                  onClick={() => {
                    spiderSound.playClick();
                    markNotificationAsRead(notif.id);
                    toggleNotifications();
                    if (notif.target_route.includes('clips')) setActiveTab('clips');
                    else if (notif.target_route.includes('alignment')) setActiveTab('alignment');
                    else if (notif.target_route.includes('editor')) setActiveTab('editor');
                    else if (notif.target_route.includes('analysis')) setActiveTab('analysis');
                    else if (notif.target_route.includes('analytics')) setActiveTab('analytics');
                  }}
                  className="inline-flex items-center space-x-1 text-xs font-medium text-[#1769FF] hover:text-[#E5092F] transition-colors"
                >
                  <span>{notif.action_label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div />
              )}

              {!notif.read && (
                <button
                  onClick={() => {
                    spiderSound.playClick();
                    markNotificationAsRead(notif.id);
                  }}
                  className="text-[11px] text-[#8E9BAE] hover:text-white flex items-center space-x-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Mark read</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 bg-[#05070D] text-center text-xs text-[#8E9BAE]">
        Spider-Sense listening for multimodal opportunities...
      </div>
    </div>
  );
};
