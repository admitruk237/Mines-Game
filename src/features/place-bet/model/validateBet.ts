import { MAX_BET } from '@/shared/config';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateBet = (amount: number, balance: number): ValidationResult => {
  if (amount <= 0) {
    return { isValid: false, error: 'Bet must be greater than 0' };
  }
  if (amount > balance) {
    return { isValid: false, error: 'Insufficient balance' };
  }
  if (amount > MAX_BET) {
    return { isValid: false, error: `Max bet is ${MAX_BET.toLocaleString()}` };
  }
  return { isValid: true };
};
