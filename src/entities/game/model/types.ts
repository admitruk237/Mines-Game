export const GAME_STATUS = {
  ACTIVE: 'active',
  WON: 'won',
  LOST: 'lost',
} as const;

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

export const CELL_TYPE = {
  GEM: 'gem',
  MINE: 'mine',
} as const;

export type CellType = (typeof CELL_TYPE)[keyof typeof CELL_TYPE];

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
  fullBoard?: FullBoard;
  winAmount?: number;
  profit?: number;
  cashedOutMultiplier?: number;
}

export interface CreateGameResponse extends Game {
  balance: number;
}

export interface CreateGameRequest {
  betAmount: number;
  minesCount: number;
}

export interface RevealRequest {
  row: number;
  col: number;
}

export type FullBoard = CellType[][];

export interface RevealGemResponse {
  result: 'gem';
  status: typeof GAME_STATUS.ACTIVE;
  currentMultiplier: number;
  revealedCells: RevealedCell[];
  gemsFound: number;
  nextMultiplier: number;
}

export interface RevealMineResponse {
  result: 'mine';
  status: typeof GAME_STATUS.LOST;
  revealedCell: RevealedCell;
  fullBoard: FullBoard;
  balance: number;
}

export type RevealResponse = RevealGemResponse | RevealMineResponse;

export interface CashOutResponse {
  status: GameStatus;
  cashedOutMultiplier: number;
  winAmount: number;
  profit: number;
  fullBoard: FullBoard;
  balance: number;
}
