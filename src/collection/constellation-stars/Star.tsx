import { motion } from "framer-motion";
import type { StarEncoding } from "./types";
import { starPath } from "./star-utils";

interface StarProps {
  cx: number;
  cy: number;
  enc: StarEncoding;
  isHovered: boolean;
  isSelected: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

const ROTATION = 0;

export function Star({
  cx,
  cy,
  enc,
  isHovered,
  isSelected,
  onEnter,
  onLeave,
}: StarProps) {
  const color = `hsl(${enc.hue}, ${enc.saturation}%, 78%)`;
  const glowColor = `hsl(${enc.hue}, ${enc.saturation}%, 90%)`;

  const active = isHovered || isSelected;
  const path = starPath(enc.r, ROTATION);
  const corePath = starPath(enc.r * 0.5, ROTATION);

  return (
    <motion.g
      animate={{ x: cx, y: cy }}
      initial={{ x: cx, y: cy }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ cursor: "pointer" }}>
      {/* selection dashed ring */}
      {isSelected && (
        <motion.circle
          r={enc.r + 7}
          fill="none"
          stroke={glowColor}
          strokeWidth={0.8}
          strokeDasharray="3 3"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.7, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* glow halo */}
      <motion.circle
        r={enc.r + 12}
        fill="none"
        stroke={glowColor}
        strokeWidth={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.35 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* large transparent hitbox */}
      <circle
        r={Math.max(enc.r + 8, 14)}
        fill="transparent"
      />

      <motion.path
        d={path}
        fill={color}
        initial={{ opacity: enc.opacity ?? 0 }}
        animate={{
          opacity: enc.opacity,
          filter: active
            ? `drop-shadow(0 0 ${enc.r}px ${color})`
            : "drop-shadow(0 0 0px transparent)",
        }}
        transition={{ duration: 0.2 }}
      />

      {/* bright core twinkle — also a four-pointed star */}
      <path
        d={corePath}
        fill="white"
        opacity={0.6}
      />
    </motion.g>
  );
}
