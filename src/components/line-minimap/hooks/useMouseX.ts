import {
  useMotionValue,
} from "motion/react";

export function useMouseX() {
  const mouseX = useMotionValue<number>(0);

  function onPointerMove(e: React.PointerEvent) {
    // Get the target element and check if we're over the lines area
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    // Calculate the bounds of the lines area (centered)
    const linesWidth = 40 * (1 + 8); // LINE_COUNT * (LINE_WIDTH + LINE_GAP)
    const leftBound = rect.left + (rect.width - linesWidth) / 2;
    const rightBound = leftBound + linesWidth;
    
    // Only set mouseX if we're within the lines area
    if (e.clientX >= leftBound && e.clientX <= rightBound) {
      mouseX.set(e.clientX);
    } else {
      mouseX.set(0); // Reset when outside lines area
    }
  }

  function onPointerLeave() {
    mouseX.set(0);
  }

  return { mouseX, onMouseMove: onPointerMove, onMouseLeave: onPointerLeave };
}
