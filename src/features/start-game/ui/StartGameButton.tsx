import { useShallow } from 'zustand/react/shallow';
import { useStartGame } from '../model/useStartGame';
import { useBetStore } from '@/features/place-bet/model/useBetStore';
import { useMinesStore } from '@/features/select-mines/model/useMinesStore';
import { useBetStatus } from '@/features/place-bet/model/useBetStatus';
import { Button } from '@/shared/ui/button';
import { Loader2 } from 'lucide-react';

export const StartGameButton = () => {
  const { betAmount } = useBetStore(
    useShallow((s) => ({
      betAmount: s.betAmount,
    }))
  );
  const { minesCount } = useMinesStore(
    useShallow((s) => ({
      minesCount: s.minesCount,
    }))
  );

  const { startGame, isPending } = useStartGame();
  const { isValid } = useBetStatus();

  return (
    <Button
      variant="primary-green"
      size="play"
      onClick={() => startGame(betAmount, minesCount)}
      disabled={isPending || !isValid}
      className="w-full"
    >
      {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Play'}
    </Button>
  );
};
