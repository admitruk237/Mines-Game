import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useActiveGameStore } from './useActiveGameStore';
import { gameKeys } from './queryKeys';
import { gameApi } from '../api/gameApi';

export const useRestoreSession = () => {
  const setGameId = useActiveGameStore((s) => s.setGameId);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: gameKeys.active(),
    queryFn: gameApi.getActive,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    if (data?.gameId) {
      queryClient.setQueryData(gameKeys.detail(data.gameId), data);
      setGameId(data.gameId);
    }
  }, [data, queryClient, setGameId]);
};
