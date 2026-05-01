import { CELL_STATE, type CellState } from '@/entities/cell';
import {
  CELL_TYPE,
  type CellPosition,
  type FullBoard,
  type GameStatus,
  type RevealedCell,
} from '../model/types';

import { GRID_SIZE } from '@/shared/config/game';

interface Params {
  status: GameStatus | null;
  revealedCells: RevealedCell[];
  fullBoard?: FullBoard;
  hitCell?: CellPosition;
  pendingCell?: CellPosition;
}

const CELL_TYPE_TO_STATE = {
  [CELL_TYPE.GEM]: CELL_STATE.GEM,
  [CELL_TYPE.MINE]: CELL_STATE.MINE,
} as const;

export const buildBoardState = ({
  revealedCells,
  fullBoard,
  hitCell,
  pendingCell,
}: Params): CellState[][] => {
  const initial = CELL_STATE.HIDDEN;

  const board: CellState[][] = Array.from({ length: GRID_SIZE }, () =>
    Array<CellState>(GRID_SIZE).fill(initial)
  );

  if (fullBoard) {
    fullBoard.forEach((row, r) =>
      row.forEach((type, c) => {
        board[r][c] = CELL_TYPE_TO_STATE[type];
      })
    );
  }

  revealedCells.forEach(({ row, col, type }) => {
    board[row][col] = CELL_TYPE_TO_STATE[type];
  });

  if (hitCell) board[hitCell.row][hitCell.col] = CELL_STATE.MINE_HIT;

  if (pendingCell) board[pendingCell.row][pendingCell.col] = CELL_STATE.LOADING;

  return board;
};
