import { useStartGame } from '../model/useStartGame';
import { START_GAME_LABELS } from '../model/constants';
import { useBetAmount, useBetStatus } from '@/features/place-bet';
import { useMinesCount } from '@/features/select-mines';
import { Button, LoadingOverlay } from '@/shared/ui';
import { useMinimumLoading } from '@/shared/lib';
import { MIN_LOADER_DISPLAY_MS } from '@/shared/config';
import { soundManager } from '@/shared/lib/sounds/soundManager';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

export const StartGameButton = () => {
  const betAmount = useBetAmount();
  const minesCount = useMinesCount();

  const { startGame, isPending } = useStartGame();
  const { isValid } = useBetStatus();

  const showLoader = useMinimumLoading(isPending, MIN_LOADER_DISPLAY_MS);

  const handleStartGame = () => {
    soundManager.play(SOUND_KEYS.CLICK);
    startGame(betAmount, minesCount);
  };

  return (
    <>
      {showLoader && (
        <LoadingOverlay
          title={START_GAME_LABELS.LOADER_TITLE}
          subtitle={START_GAME_LABELS.LOADER_SUBTITLE}
        />
      )}
      <Button
        variant="primary-green"
        size="play"
        onClick={handleStartGame}
        disabled={isPending || !isValid}
        className="w-full"
      >
        {START_GAME_LABELS.PLAY}
      </Button>
    </>
  );
};
