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
  const scrollX = useScrollX(MAX);
  const { mouseX, onPointerMove, onPointerLeave } = useMouseX();

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray1">
      <motion.div
        className="relative"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
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
    <div
      ref={ref}
      className={active ? "bg-gray12" : "bg-gray9"}
      style={{
        width: 1,
        height: active ? LINE_HEIGHT_ACTIVE : LINE_HEIGHT,
        transform: 'none',
      }}
    />
  );
}

function Indicator({ x }: { x: MotionValue<number> }) {
  return (
    <motion.div
      className="flex flex-col bg-orange w-[1px] items-center absolute h-[100vh]!"
      style={{ 
        top: '-32px',
        x,
      }}
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
