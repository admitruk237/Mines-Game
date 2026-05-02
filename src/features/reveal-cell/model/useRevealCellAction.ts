import { useCallback } from 'react';
import { CELL_TYPE, useRevealCell } from '@/entities/game';
import { useClearPending, usePendingCellsStore, useSetPending } from '../';
import { soundManager } from '@/shared/lib/sounds/soundManager';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

export const useRevealCellAction = (gameId: string | null) => {
  const setPending = useSetPending();
  const clearPending = useClearPending();
  const revealMutation = useRevealCell(gameId);

  const reveal = useCallback(
    (row: number, col: number) => {
      const isAnyPending = Boolean(usePendingCellsStore.getState().pendingCell);
      if (!gameId || isAnyPending) return;

      setPending(row, col);

      revealMutation.mutate(
        { row, col },
        {
          onSuccess: (response) => {
            if (response.result === CELL_TYPE.GEM) {
              soundManager.play(SOUND_KEYS.REVEAL);
            } else if (response.result === CELL_TYPE.MINE) {
              soundManager.play(SOUND_KEYS.LOSE);
            }
          },
          onSettled: () => {
            clearPending();
          },
        }
      );
    },
    [gameId, setPending, clearPending, revealMutation.mutate]
  );

  return {
    reveal,
    isPending: revealMutation.isPending,
  };
};
