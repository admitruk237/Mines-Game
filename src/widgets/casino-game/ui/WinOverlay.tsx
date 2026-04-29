import { Button } from '@/shared/ui/button';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { ResultModal } from './ResultModal';

interface Props {
  winAmount: number;
  profit: number;
  multiplier: number;
  onReset: () => void;
}

export const WinOverlay = ({ winAmount, profit, multiplier, onReset }: Props) => {
  return (
    <ResultModal onReset={onReset} height="h-[383px]" variant="win">
      <span className="text-[60px] leading-[60px] filter drop-shadow-md">💎</span>

      <h2 className="text-white text-center font-sans text-[20px] font-bold leading-[30px] tracking-[-0.449px]">
        Cashed Out!
      </h2>

      <p className="text-text-win text-center font-mono text-[32px] font-bold leading-[48px]">
        {multiplier.toFixed(2)}×
      </p>

      <p className="text-white text-center font-mono text-[18px] font-bold leading-[27px]">
        {formatCurrency(winAmount)}
      </p>

      <p className="text-text-win text-center font-mono text-[14px] font-normal leading-[21px]">
        +{formatCurrency(profit)} profit
      </p>

      <Button variant="primary-green" size="play" onClick={onReset} className="w-[316px]">
        Play Again
      </Button>
    </ResultModal>
  );
};
