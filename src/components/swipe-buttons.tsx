import { type ReactNode, Children, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwipeButtonsProps {
  classnames?: string;
  showProgress?: boolean;
  children: ReactNode;
}

const CARD_SPACING = 220; // keep in sync with the x offset below
const NAV_WIDTH = 310; // how much of the side card's sliver is tappable (~half the spacing)

const SwipeButtons = ({
  children,
  showProgress,
  classnames,
}: SwipeButtonsProps) => {
  const stack = Children.toArray(children);
  const [viewIndex, setViewIndex] = useState<number>(0);

  const handleSwipe = (direction: "left" | "right") => {
    setViewIndex((prev) => {
      if (direction === "left" && prev < stack.length - 1) return prev + 1;
      if (direction === "right" && prev > 0) return prev - 1;
      return prev;
    });
  };

  const canGoPrev = viewIndex > 0;
  const canGoNext = viewIndex < stack.length - 1;

  return (
    <div className="relative w-full max-w-screen mx-auto">
      {/* Progress bar */}
      <div
        className={cn(
          "top-2 left-1/2 -translate-x-1/2 flex gap-1 z-10",
          showProgress ? "absolute" : "hidden"
        )}>
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
      <div
        className={cn("relative flex justify-center items-center", classnames)}>
        {/* Invisible nav targets — sit below the center card's z-index,
            positioned over the visible slivers of the side cards. */}
        <button
          type="button"
          disabled={!canGoPrev}
          aria-label="Previous card"
          className="absolute h-full z-20"
          style={{
            left: `calc(50% - ${CARD_SPACING}px - ${NAV_WIDTH / 2}px)`,
            width: NAV_WIDTH,
          }}
          onClick={() => handleSwipe("right")}
        />

        <button
          type="button"
          disabled={!canGoNext}
          aria-label="Next card"
          className="absolute h-full z-20"
          style={{
            left: `calc(50% + ${CARD_SPACING}px - ${NAV_WIDTH / 2}px)`,
            width: NAV_WIDTH,
          }}
          onClick={() => handleSwipe("left")}
        />

        {stack.map((child, i) => {
          const offset = i - viewIndex;

          const animateTo =
            offset === 0
              ? { scale: 1, x: 0, opacity: 1 }
              : {
                  scale: 0.8,
                  x: offset * CARD_SPACING,
                  opacity: Math.abs(offset) > 1 ? 0 : 0.6,
                };

          return (
            <motion.div
              key={i}
              className={cn(
                "absolute w-fit flex items-center justify-center",
                offset === 0 && "z-40"
              )}
              initial={false}
              animate={animateTo}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag={offset === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
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
