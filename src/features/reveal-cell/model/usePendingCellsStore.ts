import { create } from 'zustand';

interface PendingCellsState {
  pendingCell: { row: number; col: number } | null;
  setPending: (row: number, col: number) => void;
  clearPending: () => void;
}

export const usePendingCellsStore = create<PendingCellsState>((set) => ({
  pendingCell: null,
  setPending: (row, col) => set({ pendingCell: { row, col } }),
  clearPending: () => set({ pendingCell: null }),
}));
