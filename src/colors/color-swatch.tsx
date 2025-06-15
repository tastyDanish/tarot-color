import type { WordColor } from "@/cards/use-reading";
import { motion } from "motion/react";
import ColorCard from "./color-card";

type ColorSwatchProps = {
  words: WordColor[];
  image: string;
  isVisible: boolean;
  isNew: boolean;
};

const ColorSwatch = ({ words, isVisible, isNew }: ColorSwatchProps) => {
  return (
    <motion.div className="relative flex flex-col gap-4 h-full w-full text-2xl items-start justify-center overflow-hidden md:pl-4 md:-mt-4">
      {words?.map((word, i) => (
        <ColorCard
          key={word.color}
          word={word.word}
          color={word.color}
          index={i}
          isNew={isNew}
          isVisible={isVisible}
        />
      ))}
    </motion.div>
  );
};

export default ColorSwatch;
