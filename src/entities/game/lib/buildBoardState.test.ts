import { describe, expect, it } from 'vitest';
import { buildBoardState } from './buildBoardState';
import { CELL_STATE } from '@/entities/cell';
import { CELL_TYPE, GAME_STATUS } from '@/entities/game/model/types';
import { GRID_SIZE } from '@/shared/config/game';

const G = CELL_TYPE.GEM;
const M = CELL_TYPE.MINE;

const allGemsBoard = Array.from({ length: GRID_SIZE }, () => Array<typeof G>(GRID_SIZE).fill(G));

describe('buildBoardState', () => {
  describe('initial state', () => {
    it('returns 5x5 grid', () => {
      const board = buildBoardState({ status: null, revealedCells: [] });
      expect(board).toHaveLength(GRID_SIZE);
      board.forEach((row) => expect(row).toHaveLength(GRID_SIZE));
    });

    it('all cells are INACTIVE when status is null (no game)', () => {
      const board = buildBoardState({ status: null, revealedCells: [] });
      board.forEach((row) => row.forEach((cell) => expect(cell).toBe(CELL_STATE.INACTIVE)));
    });

    it('all cells are INACTIVE when status is won', () => {
      const board = buildBoardState({ status: GAME_STATUS.WON, revealedCells: [] });
      board.forEach((row) => row.forEach((cell) => expect(cell).toBe(CELL_STATE.INACTIVE)));
    });

    it('all cells are HIDDEN when status is active', () => {
      const board = buildBoardState({ status: GAME_STATUS.ACTIVE, revealedCells: [] });
      board.forEach((row) => row.forEach((cell) => expect(cell).toBe(CELL_STATE.HIDDEN)));
    });
  });

  describe('revealedCells', () => {
    it('marks gem at correct coordinates', () => {
      const board = buildBoardState({
        status: GAME_STATUS.ACTIVE,
        revealedCells: [{ row: 1, col: 2, type: CELL_TYPE.GEM }],
      });
      expect(board[1]![2]).toBe(CELL_STATE.GEM);
    });

    it('marks mine at correct coordinates', () => {
      const board = buildBoardState({
        status: GAME_STATUS.ACTIVE,
        revealedCells: [{ row: 3, col: 4, type: CELL_TYPE.MINE }],
      });
      expect(board[3]![4]).toBe(CELL_STATE.MINE);
    });

    it('does not affect other cells', () => {
      const board = buildBoardState({
        status: GAME_STATUS.ACTIVE,
        revealedCells: [{ row: 0, col: 0, type: CELL_TYPE.GEM }],
      });
      expect(board[0]![1]).toBe(CELL_STATE.HIDDEN);
      expect(board[4]![4]).toBe(CELL_STATE.HIDDEN);
    });

    it('handles multiple revealed cells', () => {
      const board = buildBoardState({
        status: GAME_STATUS.ACTIVE,
        revealedCells: [
          { row: 0, col: 0, type: CELL_TYPE.GEM },
          { row: 2, col: 2, type: CELL_TYPE.GEM },
          { row: 4, col: 4, type: CELL_TYPE.GEM },
        ],
      });
      expect(board[0]![0]).toBe(CELL_STATE.GEM);
      expect(board[2]![2]).toBe(CELL_STATE.GEM);
      expect(board[4]![4]).toBe(CELL_STATE.GEM);
      expect(board[1]![1]).toBe(CELL_STATE.HIDDEN);
    });
  });

  describe('fullBoard', () => {
    it('overwrites all cells from fullBoard', () => {
      const fullBoard = [
        [G, G, M, G, G],
        [G, M, G, G, G],
        [G, G, G, M, G],
        [M, G, G, G, G],
        [G, G, G, G, M],
      ];
      const board = buildBoardState({ status: GAME_STATUS.LOST, revealedCells: [], fullBoard });
      expect(board[0]![2]).toBe(CELL_STATE.MINE);
      expect(board[0]![0]).toBe(CELL_STATE.GEM);
      expect(board[4]![4]).toBe(CELL_STATE.MINE);
    });

    it('ignores revealedCells when fullBoard is present', () => {
      const fullBoard = [
        [M, G, G, G, G],
        [G, G, G, G, G],
        [G, G, G, G, G],
        [G, G, G, G, G],
        [G, G, G, G, G],
      ];
      const board = buildBoardState({
        status: GAME_STATUS.LOST,
        revealedCells: [{ row: 0, col: 0, type: CELL_TYPE.GEM }],
        fullBoard,
      });
      expect(board[0]![0]).toBe(CELL_STATE.MINE);
    });
  });

  describe('hitCell', () => {
    it('marks hitCell as MINE_HIT', () => {
      const board = buildBoardState({
        status: GAME_STATUS.LOST,
        revealedCells: [],
        fullBoard: allGemsBoard,
        hitCell: { row: 2, col: 3 },
      });
      expect(board[2]![3]).toBe(CELL_STATE.MINE_HIT);
    });

    it('does not affect other cells', () => {
      const board = buildBoardState({
        status: GAME_STATUS.LOST,
        revealedCells: [],
        fullBoard: allGemsBoard,
        hitCell: { row: 0, col: 0 },
      });
      expect(board[0]![1]).toBe(CELL_STATE.GEM);
      expect(board[4]![4]).toBe(CELL_STATE.GEM);
    });
  });

  describe('pendingCell', () => {
    it('marks pendingCell as LOADING', () => {
      const board = buildBoardState({
        status: GAME_STATUS.ACTIVE,
        revealedCells: [],
        pendingCell: { row: 1, col: 1 },
      });
      expect(board[1]![1]).toBe(CELL_STATE.LOADING);
    });

    it('does not affect surrounding cells', () => {
      const board = buildBoardState({
        status: GAME_STATUS.ACTIVE,
        revealedCells: [],
        pendingCell: { row: 3, col: 3 },
      });
      expect(board[3]![3]).toBe(CELL_STATE.LOADING);
      expect(board[3]![2]).toBe(CELL_STATE.HIDDEN);
    });
  });
});
