import { useMotionValue, MotionValue } from "motion/react";
import { MAX } from '../utils/constants';

export function useScrollX(max = MAX): MotionValue<number> {
  const scrollX = useMotionValue(0); // Use regular motion value instead of spring
  
  // Keep indicator pinned at left (position 0)
  return scrollX;
}