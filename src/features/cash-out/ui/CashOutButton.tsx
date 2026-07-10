import { useCashOut } from '../model/useCashOut';
import { CASH_OUT_LABELS } from '../model/constants';
import { useGame } from '@/entities/game';
import { Button } from '@/shared/ui';
import { Loader2 } from 'lucide-react';
import { formatCurrency, mulCents } from '@/shared/lib';
import { soundManager } from '@/shared/lib/sounds/soundManager';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

interface Props {
  gameId: string;
}

export const CashOutButton = ({ gameId }: Props) => {
  const { data: game } = useGame(gameId);
  const { cashOut, isPending } = useCashOut(gameId);

  if (!game) return null;

  const canCashOut = (game.gemsFound ?? 0) > 0;
  const winAmount = mulCents(game.betAmount, game.currentMultiplier);

  const handleCashOut = () => {
    soundManager.play(SOUND_KEYS.CLICK);
    cashOut();
  };

  return (
    <Button
      variant="primary-blue"
      size="play"
      onClick={handleCashOut}
      disabled={isPending || !canCashOut}
      className="w-full"
    >
      {isPending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        `${CASH_OUT_LABELS.CASH_OUT}${formatCurrency(winAmount)}`
      )}
    </Button>
  );
};
