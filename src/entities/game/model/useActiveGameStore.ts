import { create } from 'zustand';

interface ActiveGameState {
  gameId: string | null;
  setGameId: (id: string | null) => void;
  resetGame: () => void;
}

export const useActiveGameStore = create<ActiveGameState>((set) => ({
  gameId: null,
  setGameId: (id) => set({ gameId: id }),
  resetGame: () => set({ gameId: null }),
}));

export const useGameId = () => useActiveGameStore((s) => s.gameId);
export const useSetGameId = () => useActiveGameStore((s) => s.setGameId);
export const useResetGame = () => useActiveGameStore((s) => s.resetGame);
