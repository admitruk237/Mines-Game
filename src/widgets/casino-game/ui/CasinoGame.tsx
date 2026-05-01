import { useActiveGameStore, useGame } from '@/entities/game';
import { GameBoard } from './GameBoard';
import { GameResultOverlay } from './GameResultOverlay';
import { TOTAL_CELLS } from '@/shared/config';

export const CasinoGame = () => {
  const gameId = useActiveGameStore((s) => s.gameId);
  const { data: game = null } = useGame(gameId);

  return (
    <div className="flex flex-col items-center justify-center w-full lg:min-h-[600px] py-2 lg:py-12">
      <div className="w-full lg:max-w-[500px] relative">
        {game && (
          <div className="mb-4 text-center font-sans text-[12px] font-normal leading-[18px] text-text-status">
            {game.minesCount} Mines · {game.gemsFound || 0} gems found ·{' '}
            {TOTAL_CELLS - game.minesCount - (game.gemsFound || 0)} remaining
          </div>
        )}

        <GameBoard game={game} />

        <GameResultOverlay game={game} />
      </div>
    </div>
  );
};
