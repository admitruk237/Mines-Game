import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameBoard } from './GameBoard';
import { CELL_TYPE, type Game, GAME_STATUS } from '@/entities/game/model/types';

const reveal = vi.fn();

vi.mock('@/features/reveal-cell', () => ({
  useRevealCellAction: () => ({ reveal, isPending: false }),
  usePendingCell: () => null,
}));

// Real Cell only allows clicks in the HIDDEN state (see entities/cell/ui/Cell.tsx
// CLICKABLE_STATES). Mocked here to isolate GameBoard's own state computation from
// the unrelated entities/game <-> entities/cell barrel import cycle.
vi.mock('@/entities/cell', () => ({
  CELL_STATE: {
    INACTIVE: 'inactive',
    HIDDEN: 'hidden',
    GEM: 'gem',
    MINE: 'mine',
    MINE_HIT: 'mineHit',
    LOADING: 'loading',
  },
  Cell: ({
    state,
    row,
    col,
    onReveal,
    ariaLabel,
  }: {
    state: string;
    row: number;
    col: number;
    onReveal: (row: number, col: number) => void;
    ariaLabel: string;
  }) => {
    const isClickable = state === 'hidden';
    return (
      <button
        type="button"
        disabled={!isClickable}
        aria-label={ariaLabel}
        onClick={() => isClickable && onReveal(row, col)}
      >
        {state}
      </button>
    );
  },
}));

const G = CELL_TYPE.GEM;
const M = CELL_TYPE.MINE;

describe('GameBoard', () => {
  it('does not let the player reveal a cell that is still mid loss-animation', async () => {
    const user = userEvent.setup();

    const game: Game = {
      gameId: 'game-1',
      minesCount: 1,
      betAmount: 1,
      currentMultiplier: 1,
      status: GAME_STATUS.LOST,
      revealedCells: [{ row: 0, col: 0, type: CELL_TYPE.MINE }],
      fullBoard: [
        [M, G, G, G, G],
        [G, G, G, G, G],
        [G, G, G, G, G],
        [G, G, G, G, G],
        [G, G, G, G, G],
      ],
    };

    const hiddenSet = new Set(['4-4']);

    render(<GameBoard game={game} hiddenSet={hiddenSet} />);

    const cell = screen.getByRole('button', { name: 'Cell 5, 5' });

    expect(cell).toBeDisabled();

    await user.click(cell);

    expect(reveal).not.toHaveBeenCalled();
  });

  it('still lets the player reveal a HIDDEN cell during an active game', async () => {
    const user = userEvent.setup();

    const game: Game = {
      gameId: 'game-1',
      minesCount: 1,
      betAmount: 1,
      currentMultiplier: 1,
      status: GAME_STATUS.ACTIVE,
      revealedCells: [],
    };

    render(<GameBoard game={game} hiddenSet={new Set()} />);

    const cell = screen.getByRole('button', { name: 'Cell 1, 1' });

    expect(cell).not.toBeDisabled();

    await user.click(cell);

    expect(reveal).toHaveBeenCalledWith(0, 0);
  });
});
