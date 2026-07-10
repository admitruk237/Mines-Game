import { useMemo } from 'react';
import type { Game } from '@/entities/game';
import { Cell, CELL_STATE, type CellState } from '@/entities/cell';
import { usePendingCell, useRevealCellAction } from '@/features/reveal-cell';
import { buildBoardState } from '../lib/buildBoardState';

interface Props {
  game: Game | null;
  hiddenSet: Set<string>;
}

export const GameBoard = ({ game, hiddenSet }: Props) => {
  const { reveal } = useRevealCellAction(game?.gameId ?? null);

  const pendingCell = usePendingCell();

  const board = useMemo(
    () =>
      buildBoardState({
        status: game?.status ?? null,
        revealedCells: game?.revealedCells ?? [],
        fullBoard: game?.fullBoard,
      }),
    [game?.status, game?.revealedCells, game?.fullBoard]
  );

  return (
    <div className="grid grid-cols-5 gap-2 md:gap-3 w-full aspect-square transition-opacity duration-500">
      {board.flatMap((row: CellState[], r: number) =>
        row.map((state: CellState, c: number) => {
          const key = `${r}-${c}`;
          const isCurrentPending = pendingCell?.row === r && pendingCell?.col === c;

          let finalState = hiddenSet.has(key) ? CELL_STATE.INACTIVE : state;
          if (isCurrentPending) finalState = CELL_STATE.LOADING;

          return (
            <Cell
              key={key}
              state={finalState}
              row={r}
              col={c}
              onReveal={reveal}
              ariaLabel={`Cell ${r + 1}, ${c + 1}`}
            />
          );
        })
      )}
    </div>
  );
};
