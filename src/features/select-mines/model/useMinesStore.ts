import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { DEFAULT_MINES_COUNT } from './constants';

interface MinesState {
  minesCount: number;
  setMinesCount: (count: number) => void;
}

type PersistedMines = Pick<MinesState, 'minesCount'>;

export const useMinesStore = create<MinesState>()(
  persist(
    (set) => ({
      minesCount: DEFAULT_MINES_COUNT,
      setMinesCount: (count) => set({ minesCount: count }),
    }),
    {
      name: 'mines-count-storage',
      version: 1,
      partialize: (s): PersistedMines => ({ minesCount: s.minesCount }),
    }
  )
);

export const useMinesCount = () => useMinesStore((s) => s.minesCount);
export const useMinesState = () =>
  useMinesStore(useShallow((s) => ({ minesCount: s.minesCount, setMinesCount: s.setMinesCount })));
