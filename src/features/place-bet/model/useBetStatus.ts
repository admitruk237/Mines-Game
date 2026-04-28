import { useShallow } from 'zustand/react/shallow';
import { useBetStore } from './useBetStore';
import { useBalance } from '@/entities/balance/api/queries';

export const useBetStatus = () => {
  const { betAmount } = useBetStore(
    useShallow((s) => ({
      betAmount: s.betAmount,
    }))
  );

  const { data } = useBalance();
  const balance = data?.balance ?? 0;

  return {
    isAffordable: balance >= betAmount,
    hasValidBet: betAmount > 0,
    isValid: betAmount > 0 && balance >= betAmount,
  };
};
