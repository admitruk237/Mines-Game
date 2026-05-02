import { useCashOut } from '../model/useCashOut';
import { type Game, useGame } from '@/entities/game';
import { Button } from '@/shared/ui';
import { Loader2 } from 'lucide-react';
import { formatCurrency } from '@/shared/lib';

interface Props {
  gameId: string;
  initialData?: Game | null;
}

export const CashOutButton = ({ gameId, initialData = null }: Props) => {
  const { data: game = initialData } = useGame(gameId);
  const { cashOut, isPending } = useCashOut(gameId);

  if (!game) return null;

  const canCashOut = (game.gemsFound ?? 0) > 0;
  const winAmount = game.betAmount * game.currentMultiplier;

  return (
    <Button
      variant="primary-blue"
      size="play"
      onClick={() => cashOut()}
      disabled={isPending || !canCashOut}
      className="w-full"
    >
      {isPending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        `Cash Out — ${formatCurrency(winAmount)}`
      )}
    </Button>
  );
};
