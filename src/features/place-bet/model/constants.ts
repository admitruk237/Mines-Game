export const MAX_BET = 10000;
export const DEFAULT_BET = 10;
export const QUICK_BET_AMOUNTS = [10, 25, 50, 100, 250, 500, 1000, 2500] as const;

export const BET_LABELS = {
  AMOUNT: 'Bet Amount',
  PLACEHOLDER: '0.00',
  HALF: '1/2',
  DOUBLE: 'x2',
  MAX: 'Max',
} as const;

export const VALIDATION_ERRORS = {
  MIN_BET: 'Bet must be greater than 0',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  MAX_BET: `Max bet is ${MAX_BET.toLocaleString()}`,
} as const;
