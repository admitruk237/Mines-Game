import { CellState } from '@/entities/cell';
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
  [CELL_TYPE.GEM]: CellState.GEM,
  [CELL_TYPE.MINE]: CellState.MINE,
} as const;

export const buildBoardState = ({
  revealedCells,
  fullBoard,
  hitCell,
  pendingCell,
}: Params): CellState[][] => {
  const initial = CellState.HIDDEN;

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

  if (hitCell) board[hitCell.row][hitCell.col] = CellState.MINE_HIT;

  if (pendingCell) board[pendingCell.row][pendingCell.col] = CellState.LOADING;

  return board;
};
