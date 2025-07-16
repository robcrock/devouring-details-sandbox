import { useMotionValue, MotionValue } from "motion/react";
import * as React from "react";

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