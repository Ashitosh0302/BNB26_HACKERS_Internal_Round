import { create } from 'zustand';
import { EditPlan, EditTrack, EditOperation } from '../types';
import { DEMO_EDIT_PLAN } from '../services/seedData';
import { spiderSound } from '../services/audioSfx';

interface HistoryEntry {
  plan: EditPlan;
  timestamp: string;
  description: string;
}

interface EditorState {
  plan: EditPlan;
  currentTime: number;
  isPlaying: boolean;
  selectedTrackId: string | null;
  selectedItemId: string | null;
  history: HistoryEntry[];
  historyIndex: number;
  zoomLevel: number;
  isAiProcessing: boolean;
  isRendering: boolean;
  renderProgress: number;

  // Actions
  setPlan: (plan: EditPlan) => void;
  setCurrentTime: (time: number) => void;
  togglePlay: () => void;
  selectTrack: (id: string | null) => void;
  selectItem: (id: string | null) => void;
  setZoomLevel: (zoom: number) => void;
  
  // Timeline Operations (HUMAN CONTROL)
  toggleOperation: (opId: string) => void;
  applyAiSuggestion: (suggestion: { id: string; label: string; type: string }) => void;
  applyAllAiSuggestions: () => void;
  updateTrackItem: (trackId: string, itemId: string, updates: Record<string, any>) => void;
  
  // History
  undo: () => void;
  redo: () => void;
  restoreVersion: (index: number) => void;
  
  // Render
  startRender: () => Promise<void>;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  plan: DEMO_EDIT_PLAN,
  currentTime: 0.0,
  isPlaying: false,
  selectedTrackId: 'trk_video',
  selectedItemId: null,
  history: [
    { plan: DEMO_EDIT_PLAN, timestamp: '10:40 AM', description: 'V1: Spider-Sense AI Initial Draft' }
  ],
  historyIndex: 0,
  zoomLevel: 1.0,
  isAiProcessing: false,
  isRendering: false,
  renderProgress: 0,

  setPlan: (plan) => set({ plan }),
  setCurrentTime: (time) => set({ currentTime: Math.max(0, Math.min(get().plan.duration_sec, time)) }),
  togglePlay: () => {
    spiderSound.playClick();
    set((state) => ({ isPlaying: !state.isPlaying }));
  },
  selectTrack: (id) => set({ selectedTrackId: id }),
  selectItem: (id) => {
    spiderSound.playClick();
    set({ selectedItemId: id });
  },
  setZoomLevel: (zoom) => set({ zoomLevel: zoom }),

  toggleOperation: (opId) => {
    const plan = get().plan;
    const updatedOps = plan.operations.map((op) =>
      op.id === opId ? { ...op, active: !op.active } : op
    );
    const newPlan = { ...plan, operations: updatedOps, version: plan.version + 1, author: 'Creator' };
    
    spiderSound.playClick();
    const newHistory = [
      ...get().history.slice(0, get().historyIndex + 1),
      { plan: newPlan, timestamp: new Date().toLocaleTimeString(), description: `Toggled ${opId}` }
    ];

    set({
      plan: newPlan,
      history: newHistory,
      historyIndex: newHistory.length - 1
    });
  },

  applyAiSuggestion: (suggestion) => {
    spiderSound.playSpiderSense();
    const plan = get().plan;
    const newOp: EditOperation = {
      id: `op_${Date.now()}`,
      type: suggestion.type as any,
      description: suggestion.label,
      timeline_start: 0,
      timeline_end: plan.duration_sec,
      active: true
    };
    const newPlan: EditPlan = {
      ...plan,
      version: plan.version + 1,
      author: 'Spider-Sense AI + Creator',
      operations: [...plan.operations, newOp]
    };
    const newHistory = [
      ...get().history.slice(0, get().historyIndex + 1),
      { plan: newPlan, timestamp: new Date().toLocaleTimeString(), description: `Applied AI: ${suggestion.label}` }
    ];

    set({
      plan: newPlan,
      history: newHistory,
      historyIndex: newHistory.length - 1
    });
  },

  applyAllAiSuggestions: () => {
    spiderSound.playSpiderSense();
    set({ isAiProcessing: true });
    setTimeout(() => {
      const plan = get().plan;
      const newPlan: EditPlan = {
        ...plan,
        version: plan.version + 1,
        author: 'Spider-Sense AI Supercharged',
        changelog: 'Applied all Spider-Sense retention optimizations'
      };
      const newHistory = [
        ...get().history.slice(0, get().historyIndex + 1),
        { plan: newPlan, timestamp: new Date().toLocaleTimeString(), description: 'Applied All Spider-Sense Edits' }
      ];
      set({
        isAiProcessing: false,
        plan: newPlan,
        history: newHistory,
        historyIndex: newHistory.length - 1
      });
    }, 1200);
  },

  updateTrackItem: (trackId, itemId, updates) => {
    const plan = get().plan;
    const updatedTracks = plan.tracks.map((trk) => {
      if (trk.id !== trackId) return trk;
      return {
        ...trk,
        items: trk.items.map((it) => (it.id === itemId ? { ...it, ...updates } : it))
      };
    });
    const newPlan = { ...plan, tracks: updatedTracks, version: plan.version + 1, author: 'Creator' };
    set({ plan: newPlan });
  },

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      spiderSound.playClick();
      set({
        historyIndex: historyIndex - 1,
        plan: history[historyIndex - 1].plan
      });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      spiderSound.playClick();
      set({
        historyIndex: historyIndex + 1,
        plan: history[historyIndex + 1].plan
      });
    }
  },

  restoreVersion: (index) => {
    const entry = get().history[index];
    if (entry) {
      spiderSound.playWebShoot();
      set({
        historyIndex: index,
        plan: entry.plan
      });
    }
  },

  startRender: async () => {
    spiderSound.playWebShoot();
    set({ isRendering: true, renderProgress: 5 });
    for (let p = 15; p <= 100; p += 20) {
      await new Promise((r) => setTimeout(r, 400));
      set({ renderProgress: p });
    }
    await new Promise((r) => setTimeout(r, 500));
    set({ isRendering: false, renderProgress: 0 });
    spiderSound.playSpiderSense();
  }
}));
