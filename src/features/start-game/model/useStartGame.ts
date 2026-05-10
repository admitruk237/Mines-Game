import { useQueryClient } from '@tanstack/react-query';
import { useCreateGame, useSetGameId } from '@/entities/game';
import { balanceKeys } from '@/entities/balance';
import { soundManager } from '@/shared/lib/sounds/soundManager';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

export const useStartGame = () => {
  const queryClient = useQueryClient();
  const setGameId = useSetGameId();
  const createGameMutation = useCreateGame();

  const startGame = (betAmount: number, minesCount: number) => {
    createGameMutation.mutate(
      { betAmount, minesCount },
      {
        onSuccess: (data) => {
          soundManager.play(SOUND_KEYS.BET);
          setGameId(data.gameId);

          if (data.balance !== undefined) {
            queryClient.setQueryData(balanceKeys.all, { balance: data.balance });
          }
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
