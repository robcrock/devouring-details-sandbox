import {
  MotionValue,
  useMotionValueEvent,
} from "motion/react";
import * as React from "react";
import { transformScale } from '../utils/math-utils';
import { DEFAULT_INTENSITY } from '../utils/constants';

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