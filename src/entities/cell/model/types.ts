export const CELL_STATE = {
  INACTIVE: 'inactive',
  HIDDEN: 'hidden',
  GEM: 'gem',
  MINE: 'mine',
  MINE_HIT: 'mineHit',
  LOADING: 'loading',
} as const;

export type CellState = (typeof CELL_STATE)[keyof typeof CELL_STATE];
