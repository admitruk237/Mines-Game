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
  if (amount > 10000) {
    return { isValid: false, error: 'Max bet is 10,000' };
  }
  return { isValid: true };
};
