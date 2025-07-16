import { motion, useSpring, MotionValue } from "motion/react";
import React from "react";
import { useScrollX } from "./hooks/useScrollX";
import { useMouseX } from "./hooks/useMouseX";
import { useProximity } from "./hooks/useProximity";
import { isActive } from "./utils/line-utils";
import {
  LINE_GAP,
  LINE_WIDTH,
  LINE_COUNT,
  LINE_HEIGHT,
  LINE_HEIGHT_ACTIVE,
  LINE_STEP,
  MAX
} from "./utils/constants";

export default function LineMinimap() {
  const { scrollX, containerRef } = useScrollX(MAX);
  const { mouseX, onMouseMove, onMouseLeave } = useMouseX();

  return (
    <div className="relative w-full h-full">
      {/* Scrollable container that's much taller than the screen */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto"
      >
        <div style={{ height: `calc(100vh + ${MAX}px)` }}>
          {/* Fixed position minimap that stays in viewport */}
          <motion.div
            className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            onPointerMove={onMouseMove}
            onPointerLeave={onMouseLeave}
          >
            <div className="flex items-end" style={{ gap: `${LINE_GAP}px` }}>
              {[...Array(LINE_COUNT)].map((_, i) => (
                <Line
                  key={i}
                  index={i}
                  scrollX={scrollX}
                  mouseX={mouseX}
                  active={isActive(i, LINE_COUNT)}
                />
              ))}
            </div>
            <Indicator x={scrollX} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Line({
  active,
  mouseX,
  scrollX,
  index
}: {
  active: boolean;
  mouseX: MotionValue<number>;
  scrollX: MotionValue<number>;
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const scaleY = useSpring(1, { damping: 45, stiffness: 600 });
  const centerX = index * LINE_STEP + LINE_WIDTH / 2;

  useProximity(scaleY, {
    ref,
    baseValue: 1,
    mouseX,
    scrollX,
    centerX,
  });

  return (
    <motion.div
      ref={ref}
      className={active ? "bg-gray12" : "bg-gray9"}
      style={{
        width: LINE_WIDTH,
        height: active ? LINE_HEIGHT_ACTIVE : LINE_HEIGHT,
        scaleY,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    />
  );
}

function Indicator({ x }: { x: MotionValue<number> }) {
  return (
    <motion.div
      className="flex flex-col bg-orange w-[1px] items-center absolute h-[100vh]! -top-8"
      style={{ x }}
    >
      <svg
        width="7"
        height="6"
        viewBox="0 0 7 6"
        fill="none"
        className="-translate-y-3"
      >
        <path
          d="M3.54688 6L0.515786 0.75L6.57796 0.75L3.54688 6Z"
          fill="var(--color-orange)"
        />
      </svg>
    </motion.div>
  );
}
