import { useRevealCell } from '@/entities/game/api/mutations';
import { usePendingCellsStore } from './usePendingCellsStore';

export const useRevealCellAction = (gameId: string | null) => {
  const { setPending, clearPending } = usePendingCellsStore();
  const revealMutation = useRevealCell(gameId);

  const reveal = (row: number, col: number) => {
    if (!gameId || revealMutation.isPending) return;

    setPending(row, col);

    revealMutation.mutate(
      { row, col },
      {
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
