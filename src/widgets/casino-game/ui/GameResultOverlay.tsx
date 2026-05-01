import { useEffect, useState } from 'react';
import { type Game, GAME_STATUS, useActiveGameStore } from '@/entities/game';
import { RESULT_OVERLAY_DELAY_MS } from '@/shared/config';
import { WinOverlay } from './WinOverlay';
import { LossOverlay } from './LossOverlay';

interface Props {
  game: Game | null;
  isRevealComplete: boolean;
}

export const GameResultOverlay = ({ game, isRevealComplete }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const resetGame = useActiveGameStore((s) => s.resetGame);

  if (!isRevealComplete && isVisible) {
    setIsVisible(false);
  }

  useEffect(() => {
    if (!isRevealComplete) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, RESULT_OVERLAY_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isRevealComplete]);

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
