import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

let idCounter = 0;
type Sparkle = {
  id: number;
  left: string;
  top: string;
  rotate: number;
};

const FoilAnimation = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: idCounter++ % 1000,
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        rotate: Math.random() * 360,
      };

      setSparkles((prev) => [...prev, newSparkle]);

      // Remove it after animation
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 1200);
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <motion.div
        className="absolute -top-1/2 left-[-50%] w-3/4 h-[150%] bg-gradient-to-r from-amber-200/0 via-amber-200/80 to-amber-200/0 blur-sm opacity-40 rotate-[25deg] pointer-events-none z-20"
        animate={{ x: ["-200%", "300%"] }}
        transition={{
          repeatDelay: 2,
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      />
      {/* Sparkles */}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{
              opacity: 0,
              scale: 0.3,
              y: 10,
              rotate: sparkle.rotate,
            }}
            animate={{ opacity: 1, scale: 1.5, y: -10 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute text-white text-lg pointer-events-none z-20"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              transform: `rotate(${sparkle.rotate}deg)`,
            }}>
            ✨
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default FoilAnimation;
