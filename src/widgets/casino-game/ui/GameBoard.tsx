import { buildBoardState, type Game } from '@/entities/game';
import { Cell, CELL_STATE, type CellState } from '@/entities/cell';
import { usePendingCellsStore, useRevealCellAction } from '@/features/reveal-cell';

interface Props {
  game: Game | null;
  hiddenSet: Set<string>;
}

export const GameBoard = ({ game, hiddenSet }: Props) => {
  const { reveal } = useRevealCellAction(game?.gameId ?? null);

  const pendingCell = usePendingCellsStore((s) => s.pendingCell);

  const board = buildBoardState({
    status: game?.status ?? null,
    revealedCells: game?.revealedCells ?? [],
    fullBoard: game?.fullBoard,
  });

  return (
    <div className="grid grid-cols-5 gap-2 md:gap-3 w-full aspect-square transition-opacity duration-500">
      {board.flatMap((row: CellState[], r: number) =>
        row.map((state: CellState, c: number) => {
          const key = `${r}-${c}`;
          const isCurrentPending = pendingCell?.row === r && pendingCell?.col === c;

          let finalState = hiddenSet.has(key) ? CELL_STATE.HIDDEN : state;
          if (isCurrentPending) finalState = CELL_STATE.LOADING;

          return (
            <Cell
              key={key}
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
