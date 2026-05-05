import { create } from 'zustand';
import instrumentsData from '../mocks/instruments.json';
import achievementsData from '../mocks/achievements.json';

export interface Instrument {
  id: string;
  name: string;
  category: string;
  origin: string;
  description: string;
  history: string;
  interactionType: string;
  gestures: string[];
  modelPath: string;
  audioPath: string;
  illustration?: string;
  difficulty: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  instrumentId?: string;
  unlocked: boolean;
}

interface AppState {
  instruments: Instrument[];
  achievements: Achievement[];
  discoveredInstrumentIds: string[];
  unlockInstrument: (id: string) => void;
  unlockAchievement: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  instruments: instrumentsData,
  achievements: achievementsData,
  // For the prototype, we unlock the core 3 instruments
  discoveredInstrumentIds: ['kompang', 'serunai', 'sape'],
  
  unlockInstrument: (id) => set((state) => {
    if (state.discoveredInstrumentIds.includes(id)) return state;
    return { discoveredInstrumentIds: [...state.discoveredInstrumentIds, id] };
  }),
  
  unlockAchievement: (id) => set((state) => ({
    achievements: state.achievements.map(ach => 
      ach.id === id ? { ...ach, unlocked: true } : ach
    )
  }))
}));
