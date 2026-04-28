import { useCashOut } from '../model/useCashOut';
import type { Game } from '@/entities/game/model/types';
import { Button } from '@/shared/ui/button';
import { Loader2 } from 'lucide-react';

interface Props {
  game: Game;
}

export const CashOutButton = ({ game }: Props) => {
  const { cashOut, isPending } = useCashOut(game.gameId);

  const canCashOut = (game.gemsFound ?? 0) > 0;
  const winAmount = (game.betAmount * game.currentMultiplier).toFixed(2);

  return (
    <Button
      variant="primary-blue"
      size="play"
      onClick={() => cashOut()}
      disabled={isPending || !canCashOut}
      className="w-full"
    >
      {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : `Cash Out — ${winAmount} USD`}
    </Button>
  );
};
