import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetGameId } from './useActiveGameStore';
import { gameKeys } from './queryKeys';
import { gameApi } from '../api/gameApi';

export const useRestoreSession = () => {
  const setGameId = useSetGameId();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: gameKeys.active(),
    queryFn: gameApi.getActive,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data, isPending } = query;

  useEffect(() => {
    if (data?.gameId) {
      queryClient.setQueryData(gameKeys.detail(data.gameId), data);
      setGameId(data.gameId);
    }
  }, [data, queryClient, setGameId]);

  return { isPending };
};
