import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook for running animations with requestAnimationFrame
 * @param callback Function to run on each frame
 * @param active Whether the animation should be active
 */
export function useAnimationFrame(
  callback: (deltaTime: number) => void,
  active: boolean = true
) {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    
    if (active) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [callback, active]);

  useEffect(() => {
    if (active) {
      requestRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, active]);
}
