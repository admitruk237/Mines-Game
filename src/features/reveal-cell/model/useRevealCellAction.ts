import { useRevealCell } from '@/entities/game/api/mutations';
import { usePendingCellsStore } from './usePendingCellsStore';
import { useSoundContext } from '@/shared/lib/contexts/SoundContext';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';
import { CELL_TYPE } from '@/entities/game/model/types';

export const useRevealCellAction = (gameId: string | null) => {
  const { setPending, clearPending } = usePendingCellsStore();
  const revealMutation = useRevealCell(gameId);
  const { playSound } = useSoundContext();

  const reveal = (row: number, col: number) => {
    if (!gameId || revealMutation.isPending) return;

    setPending(row, col);

    revealMutation.mutate(
      { row, col },
      {
        onSuccess: (response) => {
          if (response.result === CELL_TYPE.GEM) {
            playSound(SOUND_KEYS.REVEAL);
          } else if (response.result === CELL_TYPE.MINE) {
            playSound(SOUND_KEYS.LOSE);
          }
        },
        onSettled: () => {
          clearPending();
        },
      }
    );
  };

  return {
    reveal,
    isPending: revealMutation.isPending,
  };
};
