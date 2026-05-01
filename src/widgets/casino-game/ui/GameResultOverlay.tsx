import { useEffect, useState } from 'react';
import { type Game, GAME_STATUS, useActiveGameStore } from '@/entities/game';
import { RESULT_OVERLAY_DELAY_MS } from '@/shared/config';
import { WinOverlay } from './WinOverlay';
import { LossOverlay } from './LossOverlay';

interface Props {
  game: Game | null;
}

export const GameResultOverlay = ({ game }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const resetGame = useActiveGameStore((s) => s.resetGame);

  const isFinished = game && game.status !== GAME_STATUS.ACTIVE;

  useEffect(() => {
    if (!isFinished) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, RESULT_OVERLAY_DELAY_MS);

    return () => {
      clearTimeout(timer);
      setIsVisible(false);
    };
  }, [isFinished]);

  if (!game || !isVisible) return null;

  if (game.status === GAME_STATUS.WON) {
    return (
      <WinOverlay
        winAmount={game.winAmount ?? 0}
        profit={game.profit ?? 0}
        multiplier={game.cashedOutMultiplier ?? game.currentMultiplier}
        onReset={resetGame}
      />
    );
  }

  return <LossOverlay betAmount={game.betAmount} onReset={resetGame} />;
};
