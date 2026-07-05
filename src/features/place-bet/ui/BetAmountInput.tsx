import { type ChangeEvent, useState } from 'react';
import { useBetState } from '../model/useBetStore';
import { useBetStatus } from '../model/useBetStatus';
import { Input } from '@/shared/ui';

interface Props {
  disabled?: boolean;
}

export const BetAmountInput = ({ disabled }: Props) => {
  const { betAmount, setBetAmount } = useBetState();
  const [raw, setRaw] = useState(String(betAmount));
  const [prevBetAmount, setPrevBetAmount] = useState(betAmount);

  if (betAmount !== prevBetAmount) {
    setPrevBetAmount(betAmount);
    setRaw(String(betAmount));
  }

  const { error, isValid } = useBetStatus();
  const hasError = !isValid && (betAmount > 0 || raw !== '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextRaw = e.target.value;
    setRaw(nextRaw);

    if (nextRaw === '') {
      setBetAmount(0);
      return;
    }

    const value = parseFloat(nextRaw);
    if (Number.isFinite(value)) {
      setBetAmount(value);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label
          htmlFor="bet-amount"
          className="text-[12px] uppercase text-text-muted tracking-wider"
        >
          Bet Amount
        </label>
        {hasError && (
          <span className="text-[10px] font-medium text-text-loss animate-in fade-in slide-in-from-right-1">
            {error}
          </span>
        )}
      </div>

      <div className="relative group">
        <Input
          id="bet-amount"
          type="number"
          value={raw}
          onChange={handleChange}
          aria-invalid={hasError}
          disabled={disabled}
          placeholder="0.00"
          className="px-4"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-md  text-text-muted">$</div>
      </div>
    </div>
  );
};
