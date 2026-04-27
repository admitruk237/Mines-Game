import { GameStatus } from '../../game/model/types';

export interface HistoryItem {
  gameId: string;
  betAmount: number;
  minesCount: number;
  status: GameStatus;
  multiplier: number;
  profit: number;
  gemsFound: number;
  createdAt: string;
}

export interface HistoryResponse {
  games: HistoryItem[];
}
