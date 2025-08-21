import { type ReactNode, Children, useState } from "react";
import { motion } from "framer-motion";

interface SwipeButtonsProps {
  children: ReactNode;
}

const SwipeButtons = ({ children }: SwipeButtonsProps) => {
  const stack = Children.toArray(children);
  const [viewIndex, setViewIndex] = useState<number>(0);

  const handleSwipe = (direction: "left" | "right") => {
    setViewIndex((prev) => {
      if (direction === "left" && prev < stack.length - 1) return prev + 1;
      if (direction === "right" && prev > 0) return prev - 1;
      return prev;
    });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {stack.map((_, i) => (
          <div
            key={i}
            className={`h-1 w-6 rounded ${
              i === viewIndex ? "bg-amber-400" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Card track */}
      <div className="relative flex justify-center items-center h-80">
        {stack.map((child, i) => {
          // how far this card is from the current index
          const offset = i - viewIndex;

          // position / scaling for left (-1), center (0), right (+1), others hidden
          let style = {
            zIndex: 0,
            scale: 0.8,
            x: offset * 200, // spacing between cards
            opacity: Math.abs(offset) > 1 ? 0 : 0.6,
          };

          if (offset === 0) {
            style = { zIndex: 1, scale: 1, x: 0, opacity: 1 };
          }

          return (
            <motion.div
              key={i}
              className="absolute w-3/4 flex items-center justify-center"
              animate={style}
              transition={{ duration: 0.2 }}
              drag={offset === 0 ? "x" : false} // only allow dragging current card
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100) handleSwipe("left");
                else if (info.offset.x > 100) handleSwipe("right");
              }}>
              {child}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SwipeButtons;
