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
        "relative rounded-2xl  flex flex-col gap-4 h-98 w-30 text-2xl items-start justify-center overflow-hidden md:pl-4 md:-mt-4 -z-10",
        isFlipped ? "opacity-100" : "opacity-0 w-0",
        isReversed ? "-ml-16 translate-x-16" : "-mr-16 -translate-x-16"
      )}>
      {words?.map((word, i) => (
        <motion.div
          key={word.color}
          className="flex flex-col items-start w-full text-border-white font-extrabold text-2xl rounded-md relative overflow-hidden justify-around"
          initial={{ x: -60 * (isReversed ? -1 : 1) }}
          animate={{ x: isFlipped ? 0 : -60 * (isReversed ? -1 : 1) }}
          transition={{
            delay: isFlipped ? 0.7 + i * 0.3 : i * 0.3,
            duration: 0.3,
            ease: "easeOut",
          }}
          title={word.color}>
          <div
            style={{ backgroundColor: word.color }}
            className={cn(
              "h-14 rounded-b-md w-full z-20 relative flex items-center justify-end pr-4"
            )}></div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ColorSwatch;
