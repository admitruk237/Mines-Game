import { useShallow } from 'zustand/react/shallow';
import { useBetStore } from '../model/useBetStore';
import { useBetStatus } from '../model/useBetStatus';
import { Input } from '@/shared/ui/input';

export const BetAmountInput = () => {
  const { betAmount, setBetAmount } = useBetStore(
    useShallow((s) => ({
      betAmount: s.betAmount,
      setBetAmount: s.setBetAmount,
    }))
  );

  const { isAffordable } = useBetStatus();
  const hasError = !isAffordable && betAmount > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setBetAmount(0);
      return;
    }

    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setBetAmount(value);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center px-1">
        <label
          htmlFor="bet-amount"
          className="text-[11px] font-bold uppercase text-slate-500 tracking-wider"
        >
          Bet Amount
        </label>
        {hasError && (
          <span className="text-[10px] font-medium text-red-400 animate-in fade-in slide-in-from-right-1">
            Insufficient balance
          </span>
        )}
      </div>

      <div className="relative group">
        <Input
          id="bet-amount"
          type="number"
          value={betAmount || ''}
          onChange={handleChange}
          aria-invalid={hasError}
          placeholder="0.00"
          className="pr-12"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-bold text-slate-600">
          USD
        </div>
      </div>
    </div>
  );
};
