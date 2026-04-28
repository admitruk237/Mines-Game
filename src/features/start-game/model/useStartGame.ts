import { useCreateGame } from '@/entities/game/api/mutations';
import { useActiveGameStore } from '@/entities/game/model/useActiveGameStore';

export const useStartGame = () => {
  const { setGameId } = useActiveGameStore();
  const createGameMutation = useCreateGame();

  const startGame = (betAmount: number, minesCount: number) => {
    return createGameMutation.mutate(
      { betAmount, minesCount },
      {
        onSuccess: (data) => {
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
