export const GameStatus = {
  ACTIVE: 'active',
  WON: 'won',
  LOST: 'lost',
} as const;

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];

export const CellType = {
  GEM: 'gem',
  MINE: 'mine',
} as const;

export type CellType = (typeof CellType)[keyof typeof CellType];

export interface CellPosition {
  row: number;
  col: number;
}

export interface RevealedCell extends CellPosition {
  type: CellType;
}

export interface Game {
  gameId: string;
  minesCount: number;
  betAmount: number;
  currentMultiplier: number;
  nextMultiplier?: number;
  status: GameStatus;
  revealedCells: RevealedCell[];
  gemsFound?: number;
}

export interface CreateGameRequest {
  betAmount: number;
  minesCount: number;
}

export interface RevealRequest {
  row: number;
  col: number;
}

export interface BalanceResponse {
  balance: number;
}

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

export type FullBoard = CellType[][];
