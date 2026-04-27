import { useQuery } from '@tanstack/react-query';
import { balanceKeys } from '../model/queryKeys';
import { balanceApi } from './balanceApi';

export const useBalance = () => {
  return useQuery({
    queryKey: balanceKeys.all,
    queryFn: balanceApi.get,
  });
};
