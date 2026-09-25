import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LittleCard from "./little-card";
import PaperTexture from "./paper-texture";
import { useTripleStore } from "@/stores/use-triple-store";

// re-renders on an interval so the countdown stays fresh
const useNow = (intervalMs = 60_000) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
};

const formatCountdown = (ms: number) => {
  const totalMinutes = Math.max(0, Math.floor(ms / 60_000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return "less than a minute";
};

// each card lifts and tilts a little further out on hover
const cardVariants = (x: number, y: number, rotate: number) => ({
  rest: { x: 0, y: 0, rotate: 0 },
  hover: {
    x,
    y,
    rotate,
    transition: { type: "spring" as const, stiffness: 260, damping: 16 },
  },
});

const TripleButton = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const now = useNow();

  const stored = useTripleStore((s) => s.reading);
  const isLoading = useTripleStore((s) => s.isLoading);

  // an expired reading counts as no reading
  const reading = stored && stored.expiration.getTime() > now ? stored : null;
  const allFlipped = !!reading && reading.flipped.every(Boolean);

  const showNew = !isLoading && !allFlipped;

  let subtitle = "larger problems require larger divinations";
  if (!isLoading) {
    if (!reading) subtitle = "Your spread for the week awaits";
    else if (!allFlipped) subtitle = "Your spread is waiting to be revealed";
    else
      subtitle = `Next reading in ${formatCountdown(
        reading.expiration.getTime() - now
      )}`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64">
        {showNew && (
          <div className="absolute -top-3 -left-4 z-50 inline-flex items-center justify-center rounded-full bg-orange-400 px-2.5 pt-1 pb-2 text-lg font-bold uppercase leading-none tracking-wider text-gray-900 shadow-md">
            NEW
          </div>
        )}
        <motion.button
          onClick={() => navigate("/triple")}
          initial="rest"
          animate="rest"
          whileHover={reduceMotion ? undefined : "hover"}
          className="bg-orange-100 w-full p-4 rounded-2xl text-amber-900 flex flex-col h-70 items-center shadow-xl relative overflow-hidden cursor-pointer">
          <div className="flex-1 w-full flex items-center justify-center pointer-events-none">
            <div className="flex -mx-4">
              <motion.div variants={cardVariants(-14, -10, -8)}>
                <LittleCard rotation="-rotate-10 translate-x-8 translate-y-1" />
              </motion.div>
              <motion.div variants={cardVariants(0, -16, 0)}>
                <LittleCard rotation="z-10" />
              </motion.div>
              <motion.div variants={cardVariants(14, -10, 8)}>
                <LittleCard rotation="rotate-10 z-20 -translate-x-8 translate-y-1" />
              </motion.div>
            </div>
          </div>

          <div className="h-0.75 w-9/10 rounded-xl bg-amber-900 mb-3" />

          <div className="flex flex-col w-full items-start text-left h-18 shrink-0">
            <span className="font-bold text-xl">WEEKLY SPREAD</span>
            <span className="text-sm">{subtitle}</span>
          </div>

          <PaperTexture opacity={80} />
        </motion.button>
      </div>
    </div>
  );
};

export default TripleButton;
