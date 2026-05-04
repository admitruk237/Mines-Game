import { describe, expect, it } from 'vitest';
import { mulCents } from './money';

describe('mulCents', () => {
  it('correctly multiplies simple values', () => {
    expect(mulCents(10, 2)).toBe(20);
    expect(mulCents(5.5, 2)).toBe(11);
    expect(mulCents(1.25, 3)).toBe(3.75);
  });

  it('handles floating point edge cases correctly', () => {
    expect(mulCents(0.1, 3)).toBe(0.3);

    expect(mulCents(2.45, 4)).toBe(9.8);
  });

  it('rounds to the nearest cent', () => {
    expect(mulCents(1.999, 1)).toBe(2);

    expect(mulCents(1.004, 1)).toBe(1);
  });

  it('handles zero values', () => {
    expect(mulCents(0, 5)).toBe(0);
    expect(mulCents(10, 0)).toBe(0);
  });

  it('handles division logic (multiplication by fraction)', () => {
    expect(mulCents(10.55, 0.5)).toBe(5.28);
    expect(mulCents(1, 0.5)).toBe(0.5);
  });

  it('handles very small results', () => {
    expect(mulCents(0.01, 0.1)).toBe(0);
    expect(mulCents(0.01, 0.6)).toBe(0.01);
  });
});
