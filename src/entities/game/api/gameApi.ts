import { ApiError, apiFetch, ENDPOINTS } from '@/shared/api';
import type {
  CashOutResponse,
  CreateGameRequest,
  CreateGameResponse,
  Game,
  RevealRequest,
  RevealResponse,
} from '../model/types';

class GameApiService {
  create(data: CreateGameRequest) {
    return apiFetch<CreateGameResponse, CreateGameRequest>(ENDPOINTS.GAMES, {
      method: 'POST',
      body: data,
    });
  }

  reveal(gameId: string, data: RevealRequest) {
    return apiFetch<RevealResponse, RevealRequest>(ENDPOINTS.REVEAL(gameId), {
      method: 'POST',
      body: data,
    });
  }

  cashOut(gameId: string) {
    return apiFetch<CashOutResponse>(ENDPOINTS.CASHOUT(gameId), {
      method: 'POST',
    });
  }

  async getActive() {
    try {
      return await apiFetch<Game>(ENDPOINTS.ACTIVE_GAME);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  getById(gameId: string) {
    return apiFetch<Game>(ENDPOINTS.GAME_BY_ID(gameId));
  }
}

export const gameApi = new GameApiService();
