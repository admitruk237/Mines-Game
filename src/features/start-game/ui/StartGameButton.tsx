import { useEffect, useState } from 'react';
import { useStartGame } from '../';
import { useBetStatus, useBetStore } from '@/features/place-bet';
import { useMinesStore } from '@/features/select-mines';
import { Button, LoadingOverlay } from '@/shared/ui';
import { MIN_LOADER_DISPLAY_MS } from '@/shared/config';

export const StartGameButton = () => {
  const betAmount = useBetStore((s) => s.betAmount);
  const minesCount = useMinesStore((s) => s.minesCount);

  const { startGame, isPending } = useStartGame();
  const { isValid } = useBetStatus();

  const [isDelaying, setIsDelaying] = useState(false);

  useEffect(() => {
    if (!isPending && isDelaying) {
      const timer = setTimeout(() => {
        setIsDelaying(false);
      }, MIN_LOADER_DISPLAY_MS);
      return () => clearTimeout(timer);
    }
  }, [isPending, isDelaying]);

  const handleStartGame = () => {
    setIsDelaying(true);
    startGame(betAmount, minesCount);
  };

  return (
    <>
      {isDelaying && <LoadingOverlay title="Mines" subtitle="Loading game..." />}
      <Button
        variant="primary-green"
        size="play"
        onClick={handleStartGame}
        disabled={isPending || !isValid}
        className="w-full"
      >
        Play
      </Button>
    </>
  );
};
