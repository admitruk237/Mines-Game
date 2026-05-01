import { useShallow } from 'zustand/react/shallow';
import { useBetStore } from '../model/useBetStore';
import { Button } from '@/shared/ui';

interface Props {
  disabled?: boolean;
}

const QUICK_AMOUNTS = [10, 25, 50, 100, 250, 500, 1000, 2500];

export const BetQuickAmounts = ({ disabled }: Props) => {
  const { setBetAmount } = useBetStore(
    useShallow((s) => ({
      setBetAmount: s.setBetAmount,
    }))
  );

  return (
    <div className="grid grid-cols-4 gap-2 w-full lg:hidden">
      {QUICK_AMOUNTS.map((amount) => (
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
