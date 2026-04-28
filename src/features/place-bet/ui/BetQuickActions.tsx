import { useShallow } from 'zustand/react/shallow';
import { useBetStore } from '../model/useBetStore';
import { useBalance } from '@/entities/balance/api/queries';
import { Button } from '@/shared/ui/button';
import { roundToCents } from '@/shared/lib/roundToCents';

export const BetQuickActions = () => {
  const { betAmount, setBetAmount } = useBetStore(
    useShallow((s) => ({
      betAmount: s.betAmount,
      setBetAmount: s.setBetAmount,
    }))
  );

  const { data } = useBalance();
  const balance = data?.balance ?? 0;

  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      <Button
        variant="secondary-dark"
        size="bet"
        onClick={() => setBetAmount(roundToCents(betAmount / 2))}
        className="w-full"
      >
        1/2
      </Button>
      <Button
        variant="secondary-dark"
        size="bet"
        onClick={() => setBetAmount(Math.min(balance, roundToCents(betAmount * 2)))}
        className="w-full"
      >
        x2
      </Button>
      <Button
        variant="secondary-dark"
        size="bet"
        onClick={() => setBetAmount(balance)}
        className="w-full"
      >
        Max
      </Button>
    </div>
  );
};
