import { useQueryClient } from '@tanstack/react-query';
import { useCashOut as useCashOutMutation } from '@/entities/game';
import { balanceKeys } from '@/entities/balance';
import { historyKeys } from '@/entities/history';
import { soundManager } from '@/shared/lib/sounds/soundManager';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

export const useCashOut = (gameId: string | null) => {
  const queryClient = useQueryClient();
  const mutation = useCashOutMutation(gameId);

  const cashOut = () => {
    if (!gameId) return;
    mutation.mutate(undefined, {
      onSuccess: (data) => {
        soundManager.play(SOUND_KEYS.CASHOUT);

        if (data.balance !== undefined) {
          queryClient.setQueryData(balanceKeys.all, { balance: data.balance });
        }
        queryClient.invalidateQueries({ queryKey: historyKeys.all });
      },
    });
  };

  return {
    cashOut,
    isPending: mutation.isPending,
  };
};
