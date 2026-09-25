import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CardSize } from "./types";

type Sparkle = { id: number; left: number; top: number; rotate: number };

type SparkleConfig = {
  interval: number;
  max: number;
  fontSize: number;
  drift: number;
  blur: string;
};

const CONFIG: Record<
  CardSize,
  {
    interval: number;
    max: number;
    fontSize: number;
    drift: number;
    blur: string;
  }
> = {
  small: { interval: 400, max: 6, fontSize: 12, drift: 4, blur: "blur-[1px]" },
  medium: {
    interval: 250,
    max: 12,
    fontSize: 16,
    drift: 7,
    blur: "blur-[2px]",
  },
  large: { interval: 100, max: 24, fontSize: 20, drift: 10, blur: "blur-sm" },
} as Record<CardSize, SparkleConfig>;

type FoilAnimationProps = {
  size?: CardSize;
  staticGradient?: boolean;
};

const FoilAnimation = ({
  size = "large",
  staticGradient = false,
}: FoilAnimationProps) => {
  const { interval, max, fontSize, drift, blur } = CONFIG[size];
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [staticLeft] = useState(() => 12.5 + (Math.random() * 2 - 1) * 80);
  const idRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSparkles((prev) =>
        prev.length >= max
          ? prev
          : [
              ...prev,
              {
                id: idRef.current++,
                left: 8 + Math.random() * 84,
                top: 8 + Math.random() * 84,
                rotate: Math.random() * 360,
              },
            ]
      );
    }, interval);
    return () => clearInterval(timer);
  }, [interval, max]);

  const remove = (id: number) =>
    setSparkles((prev) => prev.filter((s) => s.id !== id));

  const gradientBase = `absolute -top-1/2 w-3/4 h-[200%] bg-linear-to-r from-amber-300/0 via-amber-300/80 to-amber-200/0 ${blur} opacity-40 rotate-25 pointer-events-none z-50 will-change-transform`;

  return (
    <>
      {staticGradient ? (
        <div
          className={gradientBase}
          style={{ left: `${staticLeft}%` }}
        />
      ) : (
        <motion.div
          className={`absolute -top-1/2 left-[-50%] w-3/4 h-[150%] bg-linear-to-r from-amber-300/0 via-amber-300/80 to-amber-200/0 ${blur} opacity-40 rotate-25 pointer-events-none z-50 will-change-transform`}
          animate={{ x: ["-200%", "300%"] }}
          transition={{
            repeatDelay: 2,
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      )}

      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${s.left}%`, top: `${s.top}%` }}>
          <motion.span
            className="block leading-none will-change-transform"
            style={{ fontSize }}
            initial={{ opacity: 0, scale: 0.3, y: drift, rotate: s.rotate }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.3, 1.2, 0.5],
              y: -drift,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            onAnimationComplete={() => remove(s.id)}>
            ✨
          </motion.span>
        </span>
      ))}
    </>
  );
};

export default FoilAnimation;
