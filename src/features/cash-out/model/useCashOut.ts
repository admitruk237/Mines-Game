import { useCashOut as useCashOutMutation } from '@/entities/game/api/mutations';
import { useActiveGameStore } from '@/entities/game/model/useActiveGameStore';
import { RESULT_DISPLAY_DURATION_MS } from '@/shared/config/animations';

export const useCashOut = (gameId: string | null) => {
  const { setGameId } = useActiveGameStore();
  const mutation = useCashOutMutation(gameId);

  const cashOut = () => {
    if (!gameId) return;

    return mutation.mutate(undefined, {
      onSuccess: () => {
        setTimeout(() => {
          setGameId(null);
        }, RESULT_DISPLAY_DURATION_MS);
      },
    });
  };

  return {
    cashOut,
    isPending: mutation.isPending,
  };
};
