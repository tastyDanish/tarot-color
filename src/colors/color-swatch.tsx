import type { WordColor } from "@/cards/use-reading";
import { capitalize } from "@/lib/string-utils";
import { motion } from "motion/react";

type ColorSwatchProps = {
  words: WordColor[];
  image: string;
  isVisible: boolean;
};

const ColorSwatch = ({ words, isVisible }: ColorSwatchProps) => {
  return (
    <motion.div className=" relative flex flex-col gap-4 h-full w-full text-2xl items-start justify-center overflow-hidden md:pl-4 md:-mt-4">
      {words?.map((word, i) => (
        <motion.div
          key={word.color}
          className="flex flex-col items-start w-full text-border-white  font-extrabold text2xl rounded-md relative overflow-hidden"
          initial={{
            x: -340,
          }}
          animate={{ x: isVisible ? 0 : -340 }}
          transition={{
            delay: 0.7 + i * 0.3,
            duration: 0.5,
            ease: "easeOut",
          }}
          title={word.color}>
          <div className="px-4  text-amber-100">
            {capitalize(word.word?.trim()) ?? "uh oh broken"}
          </div>
          <div
            style={{ backgroundColor: word.color }}
            className="h-12 rounded-b-md w-full z-20 relative"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ColorSwatch;
