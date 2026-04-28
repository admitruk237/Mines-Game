import { useBetStore } from './useBetStore';
import { useBalance } from '@/entities/balance/api/queries';
import { validateBet } from './validateBet';

export const useBetStatus = () => {
  const betAmount = useBetStore((s) => s.betAmount);

  const { data } = useBalance();
  const balance = data?.balance ?? 0;

  const validation = validateBet(betAmount, balance);

  return {
    isAffordable: balance >= betAmount,
    hasValidBet: betAmount > 0,
    isValid: validation.isValid,
    error: validation.error,
  };
};
