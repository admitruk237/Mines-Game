import { apiFetch } from '../../../shared/api/client';
import { ENDPOINTS } from '../../../shared/api/endpoints';
import { BalanceResponse } from '../model/types';

export const balanceApi = {
  get: () => apiFetch<BalanceResponse>(ENDPOINTS.BALANCE),
};
