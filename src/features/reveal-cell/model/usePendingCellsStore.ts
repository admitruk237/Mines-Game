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

export const usePendingCell = () => usePendingCellsStore((s) => s.pendingCell);
export const useSetPending = () => usePendingCellsStore((s) => s.setPending);
export const useClearPending = () => usePendingCellsStore((s) => s.clearPending);
