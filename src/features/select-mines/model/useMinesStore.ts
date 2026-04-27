import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MinesState {
  minesCount: number;
  setMinesCount: (count: number) => void;
}

export const useMinesStore = create<MinesState>()(
  persist(
    (set) => ({
      minesCount: 3,
      setMinesCount: (count) => set({ minesCount: count }),
    }),
    { name: 'mines-count-storage' }
  )
);
