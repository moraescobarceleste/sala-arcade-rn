import { create } from 'zustand';

const INITIAL_TOKENS = 10;

interface ArcadeState {
  favoriteIds: string[];
  tokenBalance: number;
  toggleFavorite: (machineId: string) => void;
  spendTokens: (amount: number) => boolean;
  addTokens: (amount: number) => void;
}

export const useArcadeStore = create<ArcadeState>((set, get) => ({
  favoriteIds: [],
  tokenBalance: INITIAL_TOKENS,
  toggleFavorite: (machineId) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(machineId)
        ? state.favoriteIds.filter((id) => id !== machineId)
        : [...state.favoriteIds, machineId],
    })),
  spendTokens: (amount) => {
    if (get().tokenBalance < amount) {
      return false;
    }
    set((state) => ({ tokenBalance: state.tokenBalance - amount }));
    return true;
  },
  addTokens: (amount) => set((state) => ({ tokenBalance: state.tokenBalance + amount })),
}));
