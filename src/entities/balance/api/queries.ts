import { useQuery } from '@tanstack/react-query';
import { balanceKeys } from '@/entities/balance/model/queryKeys';
import { balanceApi } from './balanceApi';

export const useBalance = () => {
  return useQuery({
    queryKey: balanceKeys.all,
    queryFn: balanceApi.get,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
