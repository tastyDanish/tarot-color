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
};

const ColorCard = ({
  color,
  word,
  isVisible,
  index,
  isNew,
}: ColorCardProps) => {
  // const [hovering, setHovering] = useState(false);
  // const [copied, setCopied] = useState(false);

  const textColor = getContrastTextColor(color);

  // const handleCopy = async () => {
  //   try {
  //     await navigator.clipboard.writeText(color);
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 1000);
  //   } catch (err) {
  //     console.error("Failed to copy:", err);
  //   }
  // };

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
      <div className="px-4 text-amber-100">
        {capitalize(word?.trim()) ?? "uh oh broken"}
      </div>

      <div
        // onMouseEnter={() => setHovering(true)}
        // onMouseLeave={() => setHovering(false)}
        // onClick={handleCopy}
        style={{ backgroundColor: color }}
        className={cn(
          "h-12 rounded-b-md w-full z-20 relative flex items-center justify-end pr-4",
          textColor
        )}>
        {/* {hovering ? (copied ? "Copied!" : color.toUpperCase()) : ""} */}
      </div>
    </motion.div>
  );
};

export default ColorCard;
