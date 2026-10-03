import { create } from 'zustand';
import { SpiderSenseNotification, CreatorMemory } from '../types';
import { DEMO_NOTIFICATIONS, DEMO_CREATOR_MEMORY } from '../services/seedData';
import { spiderSound } from '../services/audioSfx';

interface UIState {
  isCommandBarOpen: boolean;
  isNotificationsOpen: boolean;
  isSoundEnabled: boolean;
  hasSeenIntro: boolean;
  isReducedMotion: boolean;
  activeTab: string;
  notifications: SpiderSenseNotification[];
  creatorMemory: CreatorMemory;
  toastMessage: string | null;

  // Actions
  toggleCommandBar: () => void;
  setCommandBarOpen: (open: boolean) => void;
  toggleNotifications: () => void;
  toggleSound: () => void;
  setHasSeenIntro: (seen: boolean) => void;
  toggleReducedMotion: () => void;
  setActiveTab: (tab: string) => void;
  markNotificationAsRead: (id: string) => void;
  updateCreatorMemory: (updates: Partial<CreatorMemory>) => void;
  showToast: (msg: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isCommandBarOpen: false,
  isNotificationsOpen: false,
  isSoundEnabled: true,
  hasSeenIntro: false,
  isReducedMotion: false,
  activeTab: 'landing',
  notifications: DEMO_NOTIFICATIONS,
  creatorMemory: DEMO_CREATOR_MEMORY,
  toastMessage: null,

  toggleCommandBar: () => {
    const next = !get().isCommandBarOpen;
    if (next) spiderSound.playSpiderSense();
    set({ isCommandBarOpen: next });
  },

  setCommandBarOpen: (open) => {
    if (open) spiderSound.playSpiderSense();
    set({ isCommandBarOpen: open });
  },

  toggleNotifications: () => {
    spiderSound.playClick();
    set((s) => ({ isNotificationsOpen: !s.isNotificationsOpen }));
  },

  toggleSound: () => {
    const next = !get().isSoundEnabled;
    spiderSound.enabled = next;
    set({ isSoundEnabled: next });
  },

  setHasSeenIntro: (seen) => set({ hasSeenIntro: seen }),

  toggleReducedMotion: () => set((s) => ({ isReducedMotion: !s.isReducedMotion })),

  setActiveTab: (tab) => {
    spiderSound.playClick();
    set({ activeTab: tab });
  },

  markNotificationAsRead: (id) => {
    set({
      notifications: get().notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    });
  },

  updateCreatorMemory: (updates) => {
    set({
      creatorMemory: { ...get().creatorMemory, ...updates }
    });
  },

  showToast: (msg) => {
    spiderSound.playSpiderSense();
    set({ toastMessage: msg });
    setTimeout(() => {
      if (get().toastMessage === msg) {
        set({ toastMessage: null });
      }
    }, 4000);
  }
}));
