import { useCashOut as useCashOutMutation } from '@/entities/game';
import { soundManager } from '@/shared/lib/sounds/soundManager';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

export const useCashOut = (gameId: string | null) => {
  const mutation = useCashOutMutation(gameId);

  const cashOut = () => {
    if (!gameId) return;
    mutation.mutate(undefined, {
      onSuccess: () => {
        soundManager.play(SOUND_KEYS.CASHOUT);
      },
    });
  };

  return {
    cashOut,
    isPending: mutation.isPending,
  };
};
