import * as React from "react";

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