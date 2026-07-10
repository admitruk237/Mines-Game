import type { QueryClient } from '@tanstack/react-query';
import { balanceKeys } from './queryKeys';

export const setBalanceCache = (qc: QueryClient, balance: number | undefined) => {
  if (balance !== undefined) qc.setQueryData(balanceKeys.all, { balance });
};
