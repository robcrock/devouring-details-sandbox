import { DISTANCE_LIMIT } from './constants';

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(value, min), max);
}

export function transformScale(
  distance: number, 
  initialValue: number, 
  baseValue: number, 
  intensity: number
): number {
  const absDistance = Math.abs(distance);
  
  if (absDistance > DISTANCE_LIMIT) {
    return baseValue;
  }
  
  // More gradual scaling for better visibility
  const normalizedDistance = 1 - absDistance / DISTANCE_LIMIT;
  const scaleFactor = Math.pow(normalizedDistance, 2); // Changed from 3 to 2 for smoother effect
  
  // Reduced maximum scale for more subtle effect
  const maxScale = 3; // Changed from 7 to 3
  const result = baseValue + (maxScale - baseValue) * scaleFactor;
  
  return result;
}