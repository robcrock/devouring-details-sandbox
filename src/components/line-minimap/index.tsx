import { motion, useSpring, MotionValue, useMotionValue } from "motion/react";
import React from "react";
import { useScrollX } from "./hooks/useScrollX";
// useMouseX is no longer needed as we handle mouse events directly
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
  const linesContainerRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue<number>(0);

  function onMouseMove(e: React.PointerEvent) {
    // Check if we're hovering over the lines container with both X and Y bounds
    if (linesContainerRef.current) {
      const rect = linesContainerRef.current.getBoundingClientRect();
      
      // Add vertical bounds checking - only trigger when mouse is within reasonable vertical distance
      const verticalPadding = 50; // pixels above and below the lines
      const isOverLines = e.clientX >= rect.left &&
                         e.clientX <= rect.right &&
                         e.clientY >= rect.top - verticalPadding &&
                         e.clientY <= rect.bottom + verticalPadding;
      
      if (isOverLines) {
        mouseX.set(e.clientX);
      } else {
        mouseX.set(0);
      }
    }
  }

  function onMouseLeave() {
    mouseX.set(0);
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray1 via-gray1 to-gray2/20">
      {/* Scrollable container - handles both scroll and mouse events */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto"
        onPointerMove={onMouseMove}
        onPointerLeave={onMouseLeave}
      >
        <div style={{ height: `calc(100vh + ${MAX}px)` }} />
      </div>
      
      {/* Visual elements container - positioned over scrollable area but doesn't block events */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-orange/5 via-transparent to-orange/5 blur-3xl -inset-x-20 -inset-y-10"></div>
            
            {/* Lines container - individual lines handle their own pointer events */}
            <div
              ref={linesContainerRef}
              className="relative z-10 flex items-end"
              style={{ gap: `${LINE_GAP}px` }}
            >
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
            
            {/* Indicator */}
            <Indicator x={scrollX} />
          </div>
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
  const opacity = useSpring(0.6, { damping: 45, stiffness: 600 });
  const centerX = index * LINE_STEP + LINE_WIDTH / 2;

  useProximity(scaleY, {
    ref,
    baseValue: 1,
    mouseX,
    scrollX,
    centerX,
  });

  useProximity(opacity, {
    ref,
    baseValue: 0.6,
    mouseX,
    scrollX,
    centerX,
    transformer: (distance, initialValue, baseValue) => {
      const absDistance = Math.abs(distance);
      const maxDistance = 150;
      const factor = Math.max(0, 1 - absDistance / maxDistance);
      return baseValue + (1 - baseValue) * factor;
    }
  });

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-full transition-colors duration-300 ${
        active 
          ? 'bg-gradient-to-t from-orange to-orange/80 shadow-lg shadow-orange/20' 
          : 'bg-gradient-to-t from-gray12 to-gray10'
      }`}
      style={{
        width: LINE_WIDTH,
        height: active ? LINE_HEIGHT_ACTIVE : LINE_HEIGHT,
        scaleY,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{
        scale: active ? 1.05 : 1.1,
        transition: { duration: 0.2 }
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
      {/* Main indicator line */}
      <div className="w-px bg-gradient-to-b from-orange via-orange/80 to-transparent"></div>
      
      {/* Arrow head */}
      <motion.div
        className="absolute rotate-180 -top-3"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="9"
          height="8"
          viewBox="0 0 9 8"
          fill="none"
          className="drop-shadow-lg"
        >
          <path
            d="M4.5 0L8.39711 6.75H0.602886L4.5 0Z"
            fill="var(--color-orange)"
          />
        </svg>
      </motion.div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 w-px h-full opacity-50 bg-orange blur-sm"></div>
    </motion.div>
  );
}
