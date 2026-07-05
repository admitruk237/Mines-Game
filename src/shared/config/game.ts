export const MAX_BET = 10000;
export const GRID_SIZE = 5;
export const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
export const REQUEST_TIMEOUT_MS = 10000;
export const QUICK_BET_AMOUNTS = [10, 25, 50, 100, 250, 500, 1000, 2500] as const;
export const DEFAULT_BET = 10;

export const CELL_TYPE = {
  GEM: 'gem',
  MINE: 'mine',
} as const;

export type CellType = (typeof CELL_TYPE)[keyof typeof CELL_TYPE];

export const GAME_STATUS = {
  ACTIVE: 'active',
  WON: 'won',
  LOST: 'lost',
} as const;

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
