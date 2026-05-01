import { useCashOut as useCashOutMutation } from '@/entities/game';
import { useSoundContext } from '@/shared/lib/contexts/SoundContext';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

export const useCashOut = (gameId: string | null) => {
  const mutation = useCashOutMutation(gameId);
  const { playSound } = useSoundContext();

  const cashOut = () => {
    if (!gameId) return;
    mutation.mutate(undefined, {
      onSuccess: () => {
        playSound(SOUND_KEYS.CASHOUT);
      },
    });
  };

  return {
    cashOut,
    isPending: mutation.isPending,
  };
};
