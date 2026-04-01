import { motion } from "motion/react";
import type { WordColor } from "@/stores/use-reading-store";
import { cn } from "@/lib/utils";

type ColorSwatchProps = {
  words: WordColor[];
  image: string;
  isFlipped: boolean;
  isReversed: boolean;
};

const ColorSwatch = ({ words, isFlipped, isReversed }: ColorSwatchProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isFlipped ? 1 : 0 }}
      transition={{ delay: 0.7 }}
      className={cn(
        "relative flex flex-col gap-4 h-98 text-2xl items-start justify-center overflow-hidden md:pl-0 md:-mt-4 -z-10 transition-all",
        isFlipped ? "w-14" : "w-0 opacity-0"
      )}>
      {words?.map((word, i) => (
        <motion.div
          key={word.color}
          className={cn(
            "flex flex-col items-start w-full text-border-white font-extrabold text-2xl relative overflow-hidden justify-around"
          )}
          initial={{ x: -120 * (isReversed ? -1 : 1) }}
          animate={{ x: isFlipped ? 0 : -120 * (isReversed ? -1 : 1) }}
          transition={{
            delay: isFlipped ? 0.7 + i * 0.3 : i * 0.3,
            duration: 0.3,
            ease: "easeOut",
          }}
          title={word.color}>
          <div
            style={{ backgroundColor: word.color }}
            className={cn(
              "h-14 w-full rounded-md z-20 relative flex items-center justify-end pr-4",
              isReversed ? "rounded-r-none" : "rounded-l-none"
            )}></div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ColorSwatch;
