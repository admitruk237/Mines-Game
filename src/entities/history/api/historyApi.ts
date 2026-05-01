import { apiFetch } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { HistoryResponse } from '../model/types';

export const historyApi = {
  get: () => apiFetch<HistoryResponse>(ENDPOINTS.HISTORY),
};
