import { useRevealCell } from '@/entities/game/api/mutations';
import { Game } from '@/entities/game/model/types';
import { buildBoardState } from '@/entities/game/lib/buildBoardState';
import { Cell } from '@/entities/cell';

interface Props {
  game: Game | null;
}

export const GameBoard = ({ game }: Props) => {
  const revealMutation = useRevealCell(game?.gameId ?? null);

  // Обчислюємо стан всієї дошки 5x5
  const board = buildBoardState({
    status: game?.status ?? null,
    revealedCells: game?.revealedCells ?? [],
    fullBoard: game?.fullBoard,
    // Показуємо стан завантаження на конкретній клітинці
    pendingCell: revealMutation.isPending ? revealMutation.variables : undefined,
  });

  const handleReveal = (row: number, col: number) => {
    if (!game) return;
    revealMutation.mutate({ row, col });
  };

  return (
    <div className="grid grid-cols-5 gap-2 md:gap-3 w-full max-w-[500px] aspect-square">
      {board.flatMap((row, r) =>
        row.map((state, c) => (
          <Cell
            key={`${r}-${c}`}
            state={state}
            onClick={() => handleReveal(r, c)}
            ariaLabel={`Клітинка ${r + 1}, ${c + 1}`}
          />
        ))
      )}
    </div>
  );
};
