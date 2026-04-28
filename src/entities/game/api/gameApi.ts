import { apiFetch } from '../../../shared/api/client';
import { ENDPOINTS } from '../../../shared/api/endpoints';
import {
  Game,
  CreateGameRequest,
  CreateGameResponse,
  RevealRequest,
  RevealResponse,
  CashOutResponse,
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

  getById: (gameId: string) => apiFetch<Game>(ENDPOINTS.GAME_BY_ID(gameId)),
};
