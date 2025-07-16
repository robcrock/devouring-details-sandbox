import { useSpring, useScroll, useMotionValueEvent } from "motion/react";
import { useRef } from "react";
import { MAX } from '../utils/constants';
import { clamp, lerp } from '../../../shared/utils/clamp';
import { useAnimationFrame } from "../../../shared/hooks/useAnimationFrame";

// Controls scroll speed (higher = faster)
// Set to 1 for no smoothing at all
export const SCROLL_SMOOTHING = 0.5;

export function useScrollX(max = MAX) {
  const scrollX = useSpring(0, {
    stiffness: 500,
    damping: 40,
    // Lower mass for faster response
    mass: 0.8,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: containerRef,
  });
  const targetX = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    targetX.current = clamp(latest, 0, max);
  });

  useAnimationFrame(() => {
    const currentX = scrollX.get();
    const smoothX = lerp(currentX, targetX.current, SCROLL_SMOOTHING);
    // Only update if there's a meaningful difference
    if (Math.abs(smoothX - currentX) > 0.01) {
      scrollX.set(smoothX);
    }
  });

  return { scrollX, containerRef };
}
