import { useQuery } from '@tanstack/react-query';
import { gameKeys } from '../model/queryKeys';
import { gameApi } from './gameApi';

export const useGame = (gameId: string | null) => {
  return useQuery({
    queryKey: gameKeys.detail(gameId ?? 'none'),
    queryFn: () => {
      if (!gameId) return Promise.reject(new Error('gameId required'));
      return gameApi.getById(gameId);
    },
    enabled: Boolean(gameId),
  });
};
