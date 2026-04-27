import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gameKeys } from '../model/queryKeys';
import { Game, GameStatus, RevealRequest } from '../model/types';
import { gameApi } from './gameApi';

export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gameApi.create,
    onSuccess: (newGame) => {
      queryClient.setQueryData(gameKeys.detail(newGame.gameId), newGame);

      if (newGame.balance !== undefined) {
        queryClient.setQueryData(['balance'], { balance: newGame.balance });
      }

      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });
};

export const useRevealCell = (gameId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RevealRequest) => {
      if (!gameId) throw new Error('Game ID is required');
      return gameApi.reveal(gameId, data);
    },
    onSuccess: (response) => {
      if (!gameId) return;

      queryClient.setQueryData<Game>(gameKeys.detail(gameId), (oldGame) => {
        if (!oldGame) return undefined;

        if (response.result === 'gem') {
          return {
            ...oldGame,
            status: response.status,
            currentMultiplier: response.currentMultiplier,
            nextMultiplier: response.nextMultiplier,
            gemsFound: response.gemsFound,
            revealedCells: response.revealedCells,
          };
        }

        return {
          ...oldGame,
          status: response.status,
          revealedCells: [...oldGame.revealedCells, response.revealedCell],
          fullBoard: response.fullBoard,
        };
      });

      if (response.status === GameStatus.LOST) {
        queryClient.invalidateQueries({ queryKey: ['balance'] });
        queryClient.invalidateQueries({ queryKey: ['history'] });
      }
    },
  });
};

export const useCashOut = (gameId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!gameId) throw new Error('Game ID is required');
      return gameApi.cashOut(gameId);
    },
    onSuccess: (response) => {
      if (!gameId) return;

      queryClient.setQueryData<Game>(gameKeys.detail(gameId), (oldGame) => {
        if (!oldGame) return undefined;
        return {
          ...oldGame,
          status: response.status,
          fullBoard: response.fullBoard,
        };
      });

      queryClient.invalidateQueries({ queryKey: ['balance'] });
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
};
