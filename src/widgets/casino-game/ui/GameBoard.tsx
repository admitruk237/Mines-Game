import type { Game } from '@/entities/game/model/types';
import { buildBoardState } from '@/entities/game/lib/buildBoardState';
import { Cell, CellState } from '@/entities/cell';
import { useRevealCellAction } from '@/features/reveal-cell/model/useRevealCellAction';
import { usePendingStatus } from '@/features/reveal-cell/model/usePendingStatus';

interface Props {
  game: Game;
}

export const GameBoard = ({ game }: Props) => {
  const { reveal } = useRevealCellAction(game.gameId);
  const { pendingCell } = usePendingStatus();

  const board = buildBoardState({
    status: game.status,
    revealedCells: game.revealedCells,
    fullBoard: game.fullBoard,
  });

  return (
    <div className="grid grid-cols-5 gap-2 md:gap-3 w-full max-w-[500px] aspect-square">
      {board.flatMap((row, r) =>
        row.map((state, c) => {
          const isCurrentPending = pendingCell?.row === r && pendingCell?.col === c;
          const finalState = isCurrentPending ? CellState.LOADING : state;

          return (
            <Cell
              key={`${r}-${c}`}
              state={finalState}
              onClick={() => reveal(r, c)}
              ariaLabel={`Cell ${r + 1}, ${c + 1}`}
            />
          );
        })
      )}
    </div>
  );
};
