import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { DEFAULT_BET } from './constants';

interface BetState {
  betAmount: number;
  setBetAmount: (amount: number) => void;
}

export const useBetStore = create<BetState>()(
  persist(
    (set) => ({
      betAmount: DEFAULT_BET,
      setBetAmount: (amount) => set({ betAmount: amount }),
    }),
    {
      name: 'mines-bet-storage',
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          return { betAmount: DEFAULT_BET };
        }

        const state = persistedState as Partial<BetState>;
        if (typeof state?.betAmount !== 'number') {
          return { betAmount: DEFAULT_BET };
        }

        return state as BetState;
      },
      partialize: (state) => ({ betAmount: state.betAmount }),
    }
  )
);

export const useBetAmount = () => useBetStore((s) => s.betAmount);
export const useSetBetAmount = () => useBetStore((s) => s.setBetAmount);
export const useBetState = () =>
  useBetStore(useShallow((s) => ({ betAmount: s.betAmount, setBetAmount: s.setBetAmount })));
