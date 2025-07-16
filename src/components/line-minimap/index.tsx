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
    <div className="relative w-full h-full bg-gradient-to-br from-gray1 via-gray1 to-gray2/20">
      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto"
      >
        <div style={{ height: `calc(100vh + ${MAX}px)` }}>
          {/* Fixed position minimap */}
          <motion.div
            className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            onPointerMove={onMouseMove}
            onPointerLeave={onMouseLeave}
          >
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange/5 via-transparent to-orange/5 blur-3xl -inset-x-20 -inset-y-10"></div>
              
              {/* Lines container */}
              <div 
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
              
              {/* Progress dots */}
              <ProgressDots scrollX={scrollX} />
            </div>
          </motion.div>
          
          {/* Instructions overlay */}
          <Instructions />
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
          : 'bg-gradient-to-t from-gray9 to-gray7 hover:from-gray8 hover:to-gray6'
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
      className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
      style={{ x }}
    >
      {/* Main indicator line */}
      <div className="w-px h-full bg-gradient-to-b from-orange via-orange/80 to-transparent"></div>
      
      {/* Arrow head */}
      <motion.div
        className="absolute -top-2"
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

function ProgressDots({ scrollX }: { scrollX: MotionValue<number> }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollX.on("change", (latest) => {
      setProgress(latest / MAX);
    });
    return unsubscribe;
  }, [scrollX]);

  return (
    <div className="absolute left-0 right-0 flex justify-center -bottom-12">
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            animate={{
              scale: progress >= (i / 4) ? [1, 1.5, 1] : 1,
              backgroundColor: progress >= (i / 4) ? 'var(--color-orange)' : 'var(--color-gray6)'
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

function Instructions() {
  return (
    <motion.div 
      className="fixed z-20 -translate-x-1/2 bottom-8 left-1/2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="px-6 py-4 border shadow-xl bg-gray2/80 backdrop-blur-md rounded-2xl border-gray3/50">
        <p className="text-sm text-center text-gray11">
          <span className="font-medium text-orange">Scroll</span> to explore • 
          <span className="font-medium text-orange"> Hover</span> to interact
        </p>
      </div>
    </motion.div>
  );
}
