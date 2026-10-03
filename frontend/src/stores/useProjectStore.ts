import { create } from 'zustand';
import {
  Project, Script, Recording, Scene, AlignmentMatch,
  ClipCandidate, RepurposedContentItem, ContentGraph, Asset
} from '../types';
import {
  DEMO_PROJECT, DEMO_PROJECTS_LIST, DEMO_RECORDING, DEMO_SCRIPT,
  DEMO_SCENES, DEMO_ALIGNMENT_MATCHES, DEMO_CLIPS,
  DEMO_REPURPOSED_ITEMS, DEMO_CONTENT_GRAPH, DEMO_ASSETS
} from '../services/seedData';

interface ProjectState {
  projects: Project[];
  activeProject: Project;
  recording: Recording;
  script: Script;
  scenes: Scene[];
  alignmentMatches: AlignmentMatch[];
  selectedAlignmentMatch: AlignmentMatch | null;
  clips: ClipCandidate[];
  selectedClip: ClipCandidate | null;
  repurposedItems: RepurposedContentItem[];
  contentGraph: ContentGraph;
  assets: Asset[];
  isScanningClips: boolean;
  isAligning: boolean;

  // Actions
  addProject: (proj: Project) => void;
  setActiveProject: (proj: Project) => void;
  setSelectedAlignmentMatch: (match: AlignmentMatch | null) => void;
  setSelectedClip: (clip: ClipCandidate | null) => void;
  scanClips: () => Promise<void>;
  realignScript: () => Promise<void>;
  updateScriptSection: (sectionId: string, content: string) => void;
  addRepurposedItem: (item: RepurposedContentItem) => void;
  updateRepurposedItemStatus: (id: string, status: 'draft' | 'scheduled' | 'published') => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: DEMO_PROJECTS_LIST,
  activeProject: DEMO_PROJECT,
  recording: DEMO_RECORDING,
  script: DEMO_SCRIPT,
  scenes: DEMO_SCENES,
  alignmentMatches: DEMO_ALIGNMENT_MATCHES,
  selectedAlignmentMatch: DEMO_ALIGNMENT_MATCHES[0],
  clips: DEMO_CLIPS,
  selectedClip: DEMO_CLIPS[0],
  repurposedItems: DEMO_REPURPOSED_ITEMS,
  contentGraph: DEMO_CONTENT_GRAPH,
  assets: DEMO_ASSETS,
  isScanningClips: false,
  isAligning: false,

  addProject: (proj) => set((state) => ({ projects: [proj, ...state.projects], activeProject: proj })),
  setActiveProject: (proj) => set({ activeProject: proj }),
  setSelectedAlignmentMatch: (match) => set({ selectedAlignmentMatch: match }),
  setSelectedClip: (clip) => set({ selectedClip: clip }),

  scanClips: async () => {
    set({ isScanningClips: true });
    await new Promise((res) => setTimeout(res, 1800));
    set({ isScanningClips: false, clips: DEMO_CLIPS });
  },

  realignScript: async () => {
    set({ isAligning: true });
    await new Promise((res) => setTimeout(res, 1500));
    set({ isAligning: false, alignmentMatches: DEMO_ALIGNMENT_MATCHES });
  },

  updateScriptSection: (sectionId, content) => {
    const script = get().script;
    const updatedSections = script.sections.map((sec) =>
      sec.id === sectionId ? { ...sec, content } : sec
    );
    set({ script: { ...script, sections: updatedSections, updated_at: new Date().toISOString() } });
  },

  addRepurposedItem: (item) => {
    set({ repurposedItems: [item, ...get().repurposedItems] });
  },

  updateRepurposedItemStatus: (id, status) => {
    set({
      repurposedItems: get().repurposedItems.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    });
  }
}));
