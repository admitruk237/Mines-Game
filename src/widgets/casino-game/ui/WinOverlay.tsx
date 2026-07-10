import { Button, GameModal } from '@/shared/ui';
import { formatCurrency } from '@/shared/lib';
import { RESULT_LABELS } from '../model/constants';

interface Props {
  winAmount: number;
  profit: number;
  multiplier: number;
  onReset: () => void;
}

export const WinOverlay = ({ winAmount, profit, multiplier, onReset }: Props) => {
  return (
    <GameModal onReset={onReset} height="lg:h-[383px] h-auto" variant="win">
      <span className="text-[48px] lg:text-[60px] leading-tight filter drop-shadow-md">💎</span>

      <div className="flex flex-col gap-1 lg:gap-2">
        <h2 className="text-white text-center font-sans text-[18px] lg:text-[20px] font-bold leading-tight tracking-tight">
          {RESULT_LABELS.WIN_TITLE}
        </h2>

        <p className="text-text-win text-center font-mono text-[28px] lg:text-[32px] font-bold leading-tight">
          {multiplier.toFixed(2)}×
        </p>

        <p className="text-white text-center font-mono text-[16px] lg:text-[18px] font-bold leading-tight">
          {formatCurrency(winAmount)}
        </p>

        <p className="text-text-win text-center font-mono text-[12px] lg:text-[14px] font-normal leading-tight">
          +{formatCurrency(profit)} {RESULT_LABELS.PROFIT_SUFFIX}
        </p>
      </div>

      <div className="w-full mt-6 flex justify-center">
        <Button
          variant="primary-green"
          size="play"
          onClick={onReset}
          className="w-full max-w-[316px]"
        >
          {RESULT_LABELS.PLAY_AGAIN}
        </Button>
      </div>
    </GameModal>
  );
};
