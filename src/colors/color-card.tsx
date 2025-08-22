// import { useState } from "react";
import { getContrastTextColor } from "@/lib/color-utils";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type ColorCardProps = {
  color: string;
  word: string;
  isFlipped: boolean;
  index: number;
  isReversed: boolean;
};

const ColorCard = ({ color, index, isFlipped }: ColorCardProps) => {
  const textColor = getContrastTextColor(color);

  return (
    <motion.div
      key={color}
      className="flex flex-col items-start w-full text-border-white font-extrabold text-2xl rounded-md relative overflow-hidden justify-around"
      initial={{ x: -60 }}
      animate={{ x: isFlipped ? 0 : -60 }}
      transition={{
        delay: isFlipped ? 0.7 + index * 0.3 : index * 0.3,
        duration: 0.3,
        ease: "easeOut",
      }}
      title={color}>
      <div
        style={{ backgroundColor: color }}
        className={cn(
          "h-14 rounded-b-md w-full z-20 relative flex items-center justify-end pr-4",
          textColor
        )}></div>
    </motion.div>
  );
};

export default ColorCard;
