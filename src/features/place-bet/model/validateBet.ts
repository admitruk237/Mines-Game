import { MAX_BET, VALIDATION_ERRORS } from './constants';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateBet = (amount: number, balance: number): ValidationResult => {
  if (amount <= 0) {
    return { isValid: false, error: VALIDATION_ERRORS.MIN_BET };
  }
  if (amount > balance) {
    return { isValid: false, error: VALIDATION_ERRORS.INSUFFICIENT_BALANCE };
  }
  if (amount > MAX_BET) {
    return { isValid: false, error: VALIDATION_ERRORS.MAX_BET };
  }
  return { isValid: true };
};
