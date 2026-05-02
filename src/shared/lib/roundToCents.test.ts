import { describe, expect, it } from 'vitest';
import { roundToCents } from './roundToCents';

describe('roundToCents', () => {
  it('rounds down third decimal', () => {
    expect(roundToCents(10.567)).toBe(10.56);
  });

  it('does not change already rounded value', () => {
    expect(roundToCents(10.5)).toBe(10.5);
  });

  it('handles zero', () => {
    expect(roundToCents(0)).toBe(0);
  });

  it('handles integer', () => {
    expect(roundToCents(100)).toBe(100);
  });

  it('always floors, never rounds up', () => {
    expect(roundToCents(1.999)).toBe(1.99);
  });

  it('handles result of half-bet correctly', () => {
    expect(roundToCents(75 / 2)).toBe(37.5);

    expect(roundToCents(1 / 2)).toBe(0.5);
  });
});
