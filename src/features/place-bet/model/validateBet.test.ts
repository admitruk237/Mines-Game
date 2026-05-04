import { describe, expect, it } from 'vitest';
import { validateBet } from './validateBet';
import { MAX_BET } from '@/shared/config';

describe('validateBet', () => {
  const balance = 50000;

  it('validates a correct bet', () => {
    expect(validateBet(100, balance)).toEqual({ isValid: true });
  });

  it('rejects zero or negative bets', () => {
    expect(validateBet(0, balance).isValid).toBe(false);
    expect(validateBet(-10, balance).isValid).toBe(false);
  });

  it('rejects bets exceeding balance', () => {
    const result = validateBet(balance + 1, balance);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Insufficient balance');
  });

  it('rejects bets exceeding MAX_BET', () => {
    const result = validateBet(MAX_BET + 1, balance);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain(`Max bet is ${MAX_BET.toLocaleString()}`);
  });

  it('accepts a bet equal to balance if within MAX_BET', () => {
    const smallBalance = 100;
    expect(validateBet(smallBalance, smallBalance)).toEqual({ isValid: true });
  });

  it('accepts a bet equal to MAX_BET if within balance', () => {
    expect(validateBet(MAX_BET, balance)).toEqual({ isValid: true });
  });
});
