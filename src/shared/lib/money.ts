export const mulCents = (amount: number, multiplier: number): number =>
  Math.round(Math.round(amount * 100) * multiplier) / 100;
