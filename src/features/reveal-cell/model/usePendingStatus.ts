import { useShallow } from 'zustand/react/shallow';
import { usePendingCellsStore } from './usePendingCellsStore';

export const usePendingStatus = () =>
  usePendingCellsStore(
    useShallow((s) => ({
      pendingCell: s.pendingCell,
    }))
  );
