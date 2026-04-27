import { useQuery } from '@tanstack/react-query';
import { gameKeys } from '../model/queryKeys';
import { gameApi } from './gameApi';
import { Game } from '../model/types';

export const useGame = (gameId: string | null) => {
  return useQuery({
    queryKey: gameKeys.detail(gameId ?? 'none'),
    queryFn: () => gameApi.getById(gameId!),
    enabled: !!gameId,
  });
};
