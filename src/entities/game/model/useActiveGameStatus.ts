import { useShallow } from 'zustand/react/shallow';
import { useActiveGameStore } from './useActiveGameStore';

export const useActiveGameStatus = () =>
  useActiveGameStore(
    useShallow((s) => ({
      gameId: s.gameId,
      isActive: s.gameId !== null,
    }))
  );
