import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gameKeys } from '../model/queryKeys';
import { CELL_TYPE, type Game, GAME_STATUS, type RevealRequest } from '../model/types';
import { gameApi } from './gameApi';
import { balanceKeys } from '@/entities/balance';
import { historyKeys } from '@/entities/history';

export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gameApi.create,
    onSuccess: (newGame) => {
      queryClient.setQueryData(gameKeys.detail(newGame.gameId), newGame);

      if (newGame.balance !== undefined) {
        queryClient.setQueryData(balanceKeys.all, { balance: newGame.balance });
      }
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

        if (response.result === CELL_TYPE.GEM) {
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
          winAmount: 0,
          profit: -oldGame.betAmount,
        };
      });

      if (response.status === GAME_STATUS.LOST) {
        if (response.balance !== undefined) {
          queryClient.setQueryData(balanceKeys.all, { balance: response.balance });
        }
        queryClient.invalidateQueries({ queryKey: historyKeys.all });
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
          winAmount: response.winAmount,
          profit: response.profit,
          cashedOutMultiplier: response.cashedOutMultiplier,
        };
      });

      if (response.balance !== undefined) {
        queryClient.setQueryData(balanceKeys.all, { balance: response.balance });
      }
      queryClient.invalidateQueries({ queryKey: historyKeys.all });
    },
  });
};
