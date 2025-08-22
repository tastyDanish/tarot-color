import { motion } from "motion/react";
import ColorCard from "./color-card";
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
        "relative rounded-2xl -translate-x-16 flex flex-col gap-4 h-98 w-30 text-2xl items-start justify-center overflow-hidden md:pl-4 md:-mt-4 -z-10 -mr-16",
        isFlipped ? "opacity-100" : "opacity-0"
      )}>
      {words?.map((word, i) => (
        <ColorCard
          key={word.color}
          word={word.word}
          color={word.color}
          index={i}
          isFlipped={isFlipped}
          isReversed={isReversed}
        />
      ))}
    </motion.div>
  );
};

export default ColorSwatch;
