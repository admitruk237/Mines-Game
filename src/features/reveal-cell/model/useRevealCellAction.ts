import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CELL_TYPE, GAME_STATUS, useRevealCell } from '@/entities/game';
import { setBalanceCache } from '@/entities/balance';
import { historyKeys } from '@/entities/history';
import { useClearPending, usePendingCellsStore, useSetPending } from './usePendingCellsStore';
import { soundManager } from '@/shared/lib/sounds/soundManager';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

export const useRevealCellAction = (gameId: string | null) => {
  const queryClient = useQueryClient();
  const setPending = useSetPending();
  const clearPending = useClearPending();
  const revealMutation = useRevealCell(gameId);

  const reveal = useCallback(
    (row: number, col: number) => {
      const isAnyPending = Boolean(usePendingCellsStore.getState().pendingCell);
      if (!gameId || isAnyPending) return;

      soundManager.play(SOUND_KEYS.CLICK);
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

            if (response.status === GAME_STATUS.LOST) {
              setBalanceCache(queryClient, response.balance);
              queryClient.invalidateQueries({ queryKey: historyKeys.all });
            }
          },
          onSettled: () => {
            clearPending();
          },
        }
      );
    },
    [gameId, setPending, clearPending, revealMutation.mutate, queryClient]
  );

  return {
    reveal,
    isPending: revealMutation.isPending,
  };
};
