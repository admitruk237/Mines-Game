import { useGame, useGameId, useStaggeredReveal } from '@/entities/game';
import { GameBoard } from './GameBoard';
import { GameResultOverlay } from './GameResultOverlay';
import { STATUS_LABELS } from '../model/constants';
import { TOTAL_CELLS } from '@/shared/config';

export const CasinoGame = () => {
  const gameId = useGameId();
  const { data: game = null } = useGame(gameId);
  const { hiddenSet, isRevealComplete } = useStaggeredReveal(game);

  return (
    <div className="flex flex-col items-center justify-center w-full lg:min-h-[600px] py-2 lg:py-12">
      <div className="w-full lg:max-w-[500px] relative">
        {game && (
          <div className="mb-4 text-center font-sans text-[12px] font-normal leading-[18px] text-text-status">
            {game.minesCount} {STATUS_LABELS.MINES} · {game.gemsFound ?? 0}{' '}
            {STATUS_LABELS.GEMS_FOUND} · {TOTAL_CELLS - game.minesCount - (game.gemsFound ?? 0)}{' '}
            {STATUS_LABELS.REMAINING}
          </div>
        )}

        <GameBoard game={game} hiddenSet={hiddenSet} />

        <GameResultOverlay game={game} isRevealComplete={isRevealComplete} />
      </div>
    </div>
  );
};
