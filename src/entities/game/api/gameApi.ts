import { ApiError, apiFetch, ENDPOINTS } from '@/shared/api';
import type {
  CashOutResponse,
  CreateGameRequest,
  CreateGameResponse,
  Game,
  RevealRequest,
  RevealResponse,
} from '../model/types';

export const gameApi = {
  create: (data: CreateGameRequest) =>
    apiFetch<CreateGameResponse, CreateGameRequest>(ENDPOINTS.GAMES, {
      method: 'POST',
      body: data,
    }),

  reveal: (gameId: string, data: RevealRequest) =>
    apiFetch<RevealResponse, RevealRequest>(ENDPOINTS.REVEAL(gameId), {
      method: 'POST',
      body: data,
    }),

  cashOut: (gameId: string) =>
    apiFetch<CashOutResponse>(ENDPOINTS.CASHOUT(gameId), {
      method: 'POST',
    }),

  getActive: async () => {
    try {
      return await apiFetch<Game>(ENDPOINTS.ACTIVE_GAME);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  },

  getById: (gameId: string) => apiFetch<Game>(ENDPOINTS.GAME_BY_ID(gameId)),
};
