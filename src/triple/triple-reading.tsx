import FlipCard from "@/cards/flip-card";
import type { ReadingPhase } from "@/cards/readings";
import { capitalize } from "@/lib/string-utils";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";

type TripleReadingProps = {
  phase: ReadingPhase;
};

export const TripleReading = ({ phase }: TripleReadingProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const TASSEL_COUNT = 8;

  const hasModifier =
    phase.drawn.foil || phase.drawn.reversed || phase.drawn.deprived;

  useEffect(() => {
    if (isFlipped) {
      const container = document.getElementById("scroll-container");
      const target = document.getElementById("triple-reading");
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (container && target && !prefersReducedMotion) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const targetBottom = targetRect.bottom - containerRect.top;

        const scrollTo =
          container.scrollTop + targetBottom - container.clientHeight;

        animate(container.scrollTop, scrollTo, {
          duration: 0.7,
          ease: "easeInOut",
          onUpdate: (v) => {
            container.scrollTop = v;
          },
        });
      }
    }
  }, [isFlipped]);

  return (
    <div
      key={phase.title}
      className={`h-fit shrink-0 flex flex-col items-center`}>
      <span className={`text-2xl font-bold`}>{phase.title.toUpperCase()}</span>
      <div className="bg-amber-100/50 w-45 h-0.5 my-2 rounded-md" />

      <div className="h-fit flex justify-center z-10 items-center mt-6 mb-10">
        <div className="absolute flex flex-col items-center translate-y-2 z-0">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: isFlipped ? 0 : 100, opacity: isFlipped ? 1 : 0 }}
            transition={{
              type: "spring",
              damping: 14,
              stiffness: 140,
              delay: 0.6,
            }}
            className="h-58 w-40 border-x border-amber-200/40"
            style={{ backgroundColor: phase.color }}
          />
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: isFlipped ? 0 : -100, opacity: isFlipped ? 1 : 0 }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 180,
              delay: 0.8,
            }}>
            <div
              className="h-40 w-40 border-x border-amber-200/40"
              style={{ backgroundColor: phase.color }}
            />

            {/* bottom tassels */}
            <div className="flex justify-between w-full">
              {Array.from({ length: TASSEL_COUNT }).map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="w-3 h-3 z-10 border-x border-amber-200/40 border-b"
                  style={{ backgroundColor: phase.color }}
                />
              ))}
            </div>
          </motion.div>
        </div>
        <FlipCard
          size="medium"
          borderOverride="large"
          card={phase.drawn.card}
          isFlipped={isFlipped}
          isReversed={phase.drawn.reversed}
          isFoil={phase.drawn.foil}
          isDeprived={phase.drawn.deprived}
          alternateArt={"goblin"}
          setIsFlipped={() => setIsFlipped(true)}
        />
      </div>

      <motion.div
        className="flex flex-col pt-2"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isFlipped ? 1 : 0,
        }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}>
        <span className={cn("text-2xl font-bold whitespace-nowrap")}>
          {phase.drawn.card.name}
        </span>
        <div className={cn("flex gap-2 justify-center h-6")}>
          {!hasModifier && (
            <div className="bg-amber-100/50 w-45 h-0.5 my-2 rounded-md self-center" />
          )}
          {phase.drawn.foil && <div className="text-md">FOIL</div>}
          {phase.drawn.reversed && <div className="text-md">REVERSED</div>}
          {phase.drawn.deprived && <div className="text-md">DEPRIVED</div>}
        </div>
      </motion.div>
      <motion.div
        className={`flex flex-row gap-2 items-center`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isFlipped ? 1 : 0,
        }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.8 }}>
        {phase.words.map((word, wi) => (
          <span
            key={wi}
            className="contents">
            {wi > 0 && <div>•</div>}
            <span>{capitalize(word)}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
