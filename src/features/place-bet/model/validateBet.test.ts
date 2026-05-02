import { describe, expect, it } from 'vitest';
import { validateBet } from './validateBet';

describe('validateBet', () => {
  it('should return invalid if bet is 0', () => {
    const result = validateBet(0, 1000);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Bet must be greater than 0');
  });

  it('should return invalid if bet is less than 0', () => {
    const result = validateBet(-10, 1000);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Bet must be greater than 0');
  });

  it('should return invalid if bet is greater than balance', () => {
    const result = validateBet(2000, 1000);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Insufficient balance');
  });

  it('should return valid if bet equals balance', () => {
    const result = validateBet(1000, 1000);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return valid if bet is within balance', () => {
    const result = validateBet(50, 1000);
    expect(result.isValid).toBe(true);
  });
});
