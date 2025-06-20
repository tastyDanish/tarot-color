// import { useState } from "react";
import { capitalize } from "@/lib/string-utils";
import { getContrastTextColor } from "@/lib/color-utils";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type ColorCardProps = {
  color: string;
  word: string;
  isNew: boolean;
  isVisible: boolean;
  index: number;
  isReversed: boolean;
};

const ColorCard = ({
  color,
  word,
  isVisible,
  isReversed,
  index,
  isNew,
}: ColorCardProps) => {
  const textColor = getContrastTextColor(color);

  return (
    <motion.div
      key={color}
      className="flex flex-col items-start w-full text-border-white font-extrabold text-2xl rounded-md relative overflow-hidden"
      initial={{ x: isNew ? -340 : 0 }}
      animate={{ x: isVisible ? 0 : -340 }}
      transition={{
        delay: 0.7 + index * 0.3,
        duration: 0.5,
        ease: "easeOut",
      }}
      title={color}>
      {isReversed && (
        <div
          style={{ backgroundColor: color }}
          className={cn(
            "h-12 rounded-b-md w-full z-20 relative flex items-center justify-end pr-4",
            textColor
          )}></div>
      )}
      <div className="px-4 text-amber-100 pt-1">
        {capitalize(word?.trim()) ?? "uh oh broken"}
      </div>
      {!isReversed && (
        <div
          style={{ backgroundColor: color }}
          className={cn(
            "h-12 rounded-b-md w-full z-20 relative flex items-center justify-end pr-4",
            textColor
          )}></div>
      )}
    </motion.div>
  );
};

export default ColorCard;
