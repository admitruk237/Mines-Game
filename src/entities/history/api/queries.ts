import { useQuery } from '@tanstack/react-query';
import { historyKeys } from '../model/queryKeys';
import { historyApi } from './historyApi';

export const useGameHistory = () => {
  return useQuery({
    queryKey: historyKeys.all,
    queryFn: historyApi.get,
  });
};
