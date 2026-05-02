import { useSetBetAmount } from '../model/useBetStore';
import { Button } from '@/shared/ui';
import { QUICK_BET_AMOUNTS } from '@/shared/config';

interface Props {
  disabled?: boolean;
}

export const BetQuickAmounts = ({ disabled }: Props) => {
  const setBetAmount = useSetBetAmount();

  return (
    <div className="grid grid-cols-4 gap-2 w-full lg:hidden">
      {QUICK_BET_AMOUNTS.map((amount) => (
        <Button
          key={amount}
          variant="secondary-dark"
          size="bet"
          onClick={() => setBetAmount(amount)}
          disabled={disabled}
          className="w-full text-[10px] h-[30px]"
        >
          ${amount}
        </Button>
      ))}
    </div>
  );
};
