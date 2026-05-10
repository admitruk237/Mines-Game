import { useSetBetAmount } from '../model/useBetStore';
import { Button } from '@/shared/ui';
import { QUICK_BET_AMOUNTS } from '@/shared/config';
import { soundManager } from '@/shared/lib/sounds/soundManager';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

interface Props {
  disabled?: boolean;
}

export const BetQuickAmounts = ({ disabled }: Props) => {
  const setBetAmount = useSetBetAmount();

  const handleAmountClick = (amount: number) => {
    soundManager.play(SOUND_KEYS.CLICK);
    setBetAmount(amount);
  };

  return (
    <div className="grid grid-cols-4 gap-2 w-full lg:hidden">
      {QUICK_BET_AMOUNTS.map((amount) => (
        <Button
          key={amount}
          variant="secondary-dark"
          size="bet"
          onClick={() => handleAmountClick(amount)}
          disabled={disabled}
          className="w-full text-[10px] h-[30px]"
        >
          ${amount}
        </Button>
      ))}
    </div>
  );
};
