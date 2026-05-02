import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

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

export const useMinesCount = () => useMinesStore((s) => s.minesCount);
export const useMinesState = () =>
  useMinesStore(useShallow((s) => ({ minesCount: s.minesCount, setMinesCount: s.setMinesCount })));
