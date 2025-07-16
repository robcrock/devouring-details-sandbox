import {
  useSpring,
  MotionValue,
  useMotionValueEvent,
  useMotionValue,
} from "motion/react";
import * as React from "react";

// Constants - exported for use in components
export const LINE_GAP = 8;
export const LINE_WIDTH = 2;
export const LINE_COUNT = 40;
export const LINE_HEIGHT = 24;
export const LINE_HEIGHT_ACTIVE = 32;
export const LINE_STEP = LINE_WIDTH + LINE_GAP;
export const MIN = 0;
export const MAX = LINE_STEP * (LINE_COUNT - 1);
export const SCROLL_SMOOTHING = 0.5;
export const DEFAULT_INTENSITY = 50;
export const DISTANCE_LIMIT = 200;

// Utility functions
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

export function isActive(index: number, count: number): boolean {
  if (index === 0 || index === count - 1) return true;
  const step = count / (Math.floor(count / LINE_GAP) + 1);
  return Math.abs(index % step) < 0.5 || Math.abs((index % step) - step) < 0.5;
}

// Custom hooks
export function useRequestAnimationFrame(callback: () => void): void {
  const requestRef = React.useRef<number | null>(null);

  const animate = React.useCallback(() => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
}

export function useScrollX(max = MAX): MotionValue<number> {
  const scrollX = useMotionValue(0); // Use regular motion value instead of spring
  
  // Keep indicator pinned at left (position 0)
  return scrollX;
}

export function useMouseX() {
  const mouseX = useMotionValue(-1);

  function onPointerMove(e: React.PointerEvent) {
    mouseX.set(e.clientX);
  }

  function onPointerLeave() {
    mouseX.set(-1);
  }

  return { mouseX, onPointerMove, onPointerLeave };
}

interface ProximityOptions {
  ref: React.RefObject<HTMLElement | null>;
  baseValue: number;
  mouseX: MotionValue<number>;
  scrollX: MotionValue<number>;
  centerX: number;
  intensity?: number;
  transformer?: typeof transformScale;
}

export function useProximity(
  value: MotionValue<number>, 
  options: ProximityOptions
): void {
  const {
    ref,
    baseValue,
    mouseX,
    scrollX,
    centerX,
    intensity = DEFAULT_INTENSITY,
    transformer = transformScale,
  } = options;

  const initialValueRef = React.useRef(baseValue);

  React.useEffect(() => {
    initialValueRef.current = baseValue;
  }, [baseValue]);

  // Handle mouse proximity
  useMotionValueEvent(mouseX, "change", (latest) => {
    if (latest === -1) {
      value.set(initialValueRef.current || baseValue);
      return;
    }
    
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const elementCenterX = rect.left + rect.width / 2;
    const distance = latest - elementCenterX;
    const transformedValue = transformer(distance, initialValueRef.current || baseValue, baseValue, intensity);
    
    value.set(transformedValue);
  });

  // Removed scroll proximity handling - indicator stays fixed
}
