import type { Game } from '@/entities/game/model/types';
import { buildBoardState } from '@/entities/game/lib/buildBoardState';
import { Cell, CellState } from '@/entities/cell';
import { useRevealCellAction } from '@/features/reveal-cell/model/useRevealCellAction';
import { usePendingCellsStore } from '@/features/reveal-cell/model/usePendingCellsStore';

interface Props {
  game: Game | null;
}

export const GameBoard = ({ game }: Props) => {
  const { reveal } = useRevealCellAction(game?.gameId ?? null);

  const pendingCell = usePendingCellsStore((s) => s.pendingCell);

  const board = buildBoardState({
    status: game?.status ?? null,
    revealedCells: game?.revealedCells ?? [],
    fullBoard: game?.fullBoard,
  });

  return (
    <div className="grid grid-cols-5 gap-2 md:gap-3 w-full aspect-square transition-opacity duration-500">
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
