export const CellState = {
  INACTIVE: 'inactive',
  HIDDEN: 'hidden',
  GEM: 'gem',
  MINE: 'mine',
  MINE_HIT: 'mineHit',
  LOADING: 'loading',
} as const;

export type CellState = (typeof CellState)[keyof typeof CellState];
