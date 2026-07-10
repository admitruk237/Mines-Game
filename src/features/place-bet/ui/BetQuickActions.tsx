import { useBetState } from '../model/useBetStore';
import { BET_LABELS, MAX_BET } from '../model/constants';
import { useBalance } from '@/entities/balance';
import { Button } from '@/shared/ui';
import { mulCents } from '@/shared/lib';
import { soundManager } from '@/shared/lib/sounds/soundManager';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

interface Props {
  disabled?: boolean;
}

export const BetQuickActions = ({ disabled }: Props) => {
  const { betAmount, setBetAmount } = useBetState();

  const { data } = useBalance();
  const balance = data?.balance ?? 0;

  const handleHalf = () => {
    soundManager.play(SOUND_KEYS.CLICK);
    setBetAmount(mulCents(betAmount, 0.5));
  };

  const handleDouble = () => {
    soundManager.play(SOUND_KEYS.CLICK);
    setBetAmount(Math.min(balance, MAX_BET, mulCents(betAmount, 2)));
  };

  const handleMax = () => {
    soundManager.play(SOUND_KEYS.CLICK);
    setBetAmount(Math.min(balance, MAX_BET));
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      <Button
        variant="secondary-dark"
        size="bet"
        onClick={handleHalf}
        disabled={disabled}
        className="w-full"
      >
        {BET_LABELS.HALF}
      </Button>
      <Button
        variant="secondary-dark"
        size="bet"
        onClick={handleDouble}
        disabled={disabled}
        className="w-full"
      >
        {BET_LABELS.DOUBLE}
      </Button>
      <Button
        variant="secondary-dark"
        size="bet"
        onClick={handleMax}
        disabled={disabled}
        className="w-full"
      >
        {BET_LABELS.MAX}
      </Button>
    </div>
  );
};
