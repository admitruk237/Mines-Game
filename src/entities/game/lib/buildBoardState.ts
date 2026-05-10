import { CELL_STATE, type CellState } from '@/entities/cell';
import {
  CELL_TYPE,
  type CellPosition,
  type FullBoard,
  GAME_STATUS,
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
  status,
  revealedCells,
  fullBoard,
  hitCell,
  pendingCell,
}: Params): CellState[][] => {
  const initial: CellState =
    status === GAME_STATUS.ACTIVE ? CELL_STATE.HIDDEN : CELL_STATE.INACTIVE;

  const board: CellState[][] = Array.from({ length: GRID_SIZE }, () =>
    Array<CellState>(GRID_SIZE).fill(initial)
  );

  if (fullBoard) {
    fullBoard.forEach((row, r) =>
      row.forEach((type, c) => {
        const boardRow = board[r];
        if (boardRow) boardRow[c] = CELL_TYPE_TO_STATE[type];
      })
    );
  } else {
    revealedCells.forEach(({ row, col, type }) => {
      const boardRow = board[row];
      if (boardRow) boardRow[col] = CELL_TYPE_TO_STATE[type];
    });
  }

  if (hitCell) {
    const boardRow = board[hitCell.row];
    if (boardRow) boardRow[hitCell.col] = CELL_STATE.MINE_HIT;
  }

  if (pendingCell) {
    const boardRow = board[pendingCell.row];
    if (boardRow) boardRow[pendingCell.col] = CELL_STATE.LOADING;
  }

  return board;
};
