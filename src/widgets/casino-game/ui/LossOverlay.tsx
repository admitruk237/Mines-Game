import { Button } from '@/shared/ui/button';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { ResultModal } from './ResultModal';

interface Props {
  betAmount: number;
  onReset: () => void;
}

export const LossOverlay = ({ betAmount, onReset }: Props) => {
  return (
    <ResultModal onReset={onReset} height="h-[306px]" variant="loss">
      <span className="text-[48px] leading-[72px] filter drop-shadow-md">💣</span>

      <h2 className="text-white text-center font-sans text-[20px] font-bold leading-[30px] tracking-[-0.449px]">
        Busted
      </h2>

      <p className="text-text-loss text-center font-mono text-[18px] font-bold leading-[27px]">
        {formatCurrency(betAmount)} lost
      </p>

      <Button variant="primary-red" size="play" onClick={onReset} className="w-[316px]">
        Try Again
      </Button>
    </ResultModal>
  );
};
