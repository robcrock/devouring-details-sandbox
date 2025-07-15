import {
  useSpring,
  useMotionValueEvent,
  useScroll,
  MotionValue,
  useMotionValue,
} from "motion/react";
import * as React from "react";
import { clamp } from "./clamp";

export const LINE_GAP = 8;
export const LINE_WIDTH = 2;
export const LINE_COUNT = 40;
export const LINE_HEIGHT = 24;
export const LINE_HEIGHT_ACTIVE = 32;

export const LINE_STEP = LINE_WIDTH + LINE_GAP;
export const MIN = 0;
export const MAX = LINE_STEP * (LINE_COUNT - 1);

// Controls scroll speed (higher = faster)
// Set to 1 for no smoothing at all
export const SCROLL_SMOOTHING = 0.5;

// Transformer constants
export const DEFAULT_INTENSITY = 10;
export const DISTANCE_LIMIT = 100;

// Linear interpolation function for smooth transitions
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function transformScale(
  distance: number,
  initialValue: number,
  baseValue: number,
  intensity: number
) {
  if (Math.abs(distance) > DISTANCE_LIMIT) {
    return baseValue;
  }
  // Normalize distance to 0-1 range (1 when close, 0 when far)
  const normalizedDistance = 1 - Math.abs(distance) / DISTANCE_LIMIT;
  // Square for smooth falloff
  const scaleFactor = normalizedDistance * normalizedDistance;
  // Apply intensity to scale factor
  return baseValue + (intensity * scaleFactor * 0.1);
}

export interface ProximityOptions {
  ref: React.RefObject<HTMLElement | null>;
  baseValue: number;
  mouseX: MotionValue<number>;
  scrollX: MotionValue<number>;
  centerX: number;
  intensity?: number;
  reset?: boolean;
  transformer?: (
    distance: number,
    initialValue: number,
    baseValue: number,
    intensity: number
  ) => number;
}

export function useProximity(
  value: MotionValue<number>,
  {
    ref,
    baseValue,
    mouseX,
    scrollX,
    centerX,
    intensity = DEFAULT_INTENSITY,
    reset = true,
    transformer = transformScale,
  }: ProximityOptions
) {
  const initialValueRef = React.useRef<number>(baseValue);

  React.useEffect(() => {
    initialValueRef.current = baseValue;
  }, [baseValue]);

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

  useMotionValueEvent(scrollX, "change", (latest) => {
    const initialValue = initialValueRef.current || baseValue;
    const distance = latest - centerX;
    const targetScale = transformer(
      distance,
      initialValue,
      baseValue,
      intensity
    );

    if (reset) {
      const currentVelocity = Math.abs(scrollX.getVelocity());
      const velocityThreshold = 300;
      const velocityFactor = Math.min(1, currentVelocity / velocityThreshold);
      const lerped = lerp(initialValue, targetScale, velocityFactor);
      value.set(lerped);
    } else {
      value.set(targetScale);
    }
  });
}

export function useScrollX(max: number = MAX) {
  const scrollX = useSpring(0, {
    stiffness: 500,
    damping: 40,
    // Lower mass for faster response
    mass: 0.8,
  });

  const { scrollY } = useScroll();
  const targetX = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    targetX.current = clamp(latest, [0, max]);
  });

  useRequestAnimationFrame(() => {
    const currentX = scrollX.get();
    const smoothX = lerp(currentX, targetX.current, SCROLL_SMOOTHING);
    // Only update if there's a meaningful difference
    if (Math.abs(smoothX - currentX) > 0.01) {
      scrollX.set(smoothX);
    }
  });

  return scrollX;
}

export function useMouseX() {
  const mouseX = useMotionValue<number>(-1);

  function onPointerMove(e: React.PointerEvent) {
    mouseX.set(e.clientX);
  }

  function onPointerLeave() {
    mouseX.set(-1);
  }

  return { mouseX, onMouseMove: onPointerMove, onMouseLeave: onPointerLeave };
}

export function useRequestAnimationFrame(callback: () => void) {
  const requestRef = React.useRef<number | null>(null);

  const animate = () => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function isActive(index: number, count: number): boolean {
  // First and last ticks are always active
  if (index === 0 || index === count - 1) return true;
  // Calculate the step size between active ticks
  const step = count / (Math.floor(count / LINE_GAP) + 1);
  // Check if this index is close to a multiple of the step
  return Math.abs(index % step) < 0.5 || Math.abs((index % step) - step) < 0.5;
}