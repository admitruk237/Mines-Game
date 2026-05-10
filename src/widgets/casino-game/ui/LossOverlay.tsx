import { Button, GameModal } from '@/shared/ui';
import { formatCurrency } from '@/shared/lib';

interface Props {
  betAmount: number;
  onReset: () => void;
}

export const LossOverlay = ({ betAmount, onReset }: Props) => {
  return (
    <GameModal onReset={onReset} height="lg:h-[306px] h-auto" variant="loss">
      <span className="text-[40px] lg:text-[48px] leading-tight filter drop-shadow-md">💣</span>

      <div className="flex flex-col gap-1 lg:gap-2">
        <h2 className="text-white text-center font-sans text-[18px] lg:text-[20px] font-bold leading-tight tracking-tight">
          Busted
        </h2>

        <p className="text-text-loss text-center font-mono text-[16px] lg:text-[18px] font-bold leading-tight">
          {formatCurrency(betAmount)} lost
        </p>
      </div>

      <div className="w-full mt-6 flex justify-center">
        <Button
          variant="primary-red"
          size="play"
          onClick={onReset}
          className="w-full max-w-[316px]"
        >
          Try Again
        </Button>
      </div>
    </GameModal>
  );
};
