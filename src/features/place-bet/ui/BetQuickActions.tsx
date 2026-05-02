import { useBetState } from '../model/useBetStore';
import { useBalance } from '@/entities/balance';
import { Button } from '@/shared/ui';
import { roundToCents } from '@/shared/lib';

interface Props {
  disabled?: boolean;
}

export const BetQuickActions = ({ disabled }: Props) => {
  const { betAmount, setBetAmount } = useBetState();

  const { data } = useBalance();
  const balance = data?.balance ?? 0;

  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      <Button
        variant="secondary-dark"
        size="bet"
        onClick={() => setBetAmount(roundToCents(betAmount / 2))}
        disabled={disabled}
        className="w-full"
      >
        1/2
      </Button>
      <Button
        variant="secondary-dark"
        size="bet"
        onClick={() => setBetAmount(Math.min(balance, roundToCents(betAmount * 2)))}
        disabled={disabled}
        className="w-full"
      >
        x2
      </Button>
      <Button
        variant="secondary-dark"
        size="bet"
        onClick={() => setBetAmount(balance)}
        disabled={disabled}
        className="w-full"
      >
        Max
      </Button>
    </div>
  );
};
