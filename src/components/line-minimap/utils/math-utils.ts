import { DISTANCE_LIMIT } from './constants';

export function transformScale(
  distance: number,
  initialValue: number,
  baseValue: number,
  intensity: number
): number {
  const absDistance = Math.abs(distance);
  
  if (absDistance > DISTANCE_LIMIT) {
    return initialValue;
  }
  
  const normalizedDistance = 1 - absDistance / DISTANCE_LIMIT;
  const scaleFactor = normalizedDistance * normalizedDistance;
  
  // Use intensity parameter for larger scaling effect
  const maxScale = 2; // Adjust this value to impact the intensity of the scale
  return baseValue + intensity * scaleFactor * (maxScale - baseValue) / 100;
}
