import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

interface BetState {
  betAmount: number;
  setBetAmount: (amount: number) => void;
}

export const useBetStore = create<BetState>()(
  persist(
    (set) => ({
      betAmount: 10.0,
      setBetAmount: (amount) => set({ betAmount: amount }),
    }),
    { name: 'mines-bet-storage' }
  )
);

export const useBetAmount = () => useBetStore((s) => s.betAmount);
export const useSetBetAmount = () => useBetStore((s) => s.setBetAmount);
export const useBetState = () =>
  useBetStore(useShallow((s) => ({ betAmount: s.betAmount, setBetAmount: s.setBetAmount })));
