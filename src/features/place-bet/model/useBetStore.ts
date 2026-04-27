import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
