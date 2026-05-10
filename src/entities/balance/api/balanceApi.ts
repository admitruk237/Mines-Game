import { apiFetch } from '@/shared/api/client';
import type { BalanceResponse } from '../model/types';
import { ENDPOINTS } from '@/shared/api/endpoints';

export const balanceApi = {
  get: () => apiFetch<BalanceResponse>(ENDPOINTS.BALANCE),
};
