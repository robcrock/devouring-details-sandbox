import { LINE_GAP } from './constants';

export function isActive(index: number, count: number): boolean {
  if (index === 0 || index === count - 1) return true;
  const step = count / (Math.floor(count / LINE_GAP) + 1);
  return Math.abs(index % step) < 0.5 || Math.abs((index % step) - step) < 0.5;
}