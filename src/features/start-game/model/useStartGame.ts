import { useActiveGameStore, useCreateGame } from '@/entities/game';

import { useSoundContext } from '@/shared/lib/contexts/SoundContext';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

export const useStartGame = () => {
  const { setGameId } = useActiveGameStore();
  const createGameMutation = useCreateGame();
  const { playSound } = useSoundContext();

  const startGame = (betAmount: number, minesCount: number) => {
    createGameMutation.mutate(
      { betAmount, minesCount },
      {
        onSuccess: (data) => {
          playSound(SOUND_KEYS.BET);
          setGameId(data.gameId);
        },
      }
    );
  };

  return {
    startGame,
    isPending: createGameMutation.isPending,
    error: createGameMutation.error,
  };
};
