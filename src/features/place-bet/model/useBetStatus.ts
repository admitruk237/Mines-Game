import { useBetAmount } from './useBetStore';
import { useBalance } from '@/entities/balance';
import { validateBet } from './validateBet';

export const useBetStatus = () => {
  const betAmount = useBetAmount();

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
