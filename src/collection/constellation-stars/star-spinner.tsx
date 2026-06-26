import { useCollectionStore, VALID_SUITS } from "@/stores/use-collection-store";
import GetReadings from "../get-readings";
import TheFatesView from "./the-fates-view";
import CardLoader from "../card-loader";
import { hashStr } from "./strategies";
import { getStarSet } from "./utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSkyStore } from "@/stores/use-sky-store";

export const SKY_STEP = -260;

const variants = {
  enter: (dir: number) => {
    if (dir === 0) return { x: 0, opacity: 1 }; // first mount — just appear
    return { x: dir > 0 ? "100vw" : "-100vw", opacity: 0.4 };
  },
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100vw" : "100vw", opacity: 0.4 }),
};

const stellarTitles = new Map<string, string>([
  ["total", "The Divine Culmination"],
  ["Cups", "The Cups"],
  ["Swords", "The Swords"],
  ["Pentacles", "The Pentacles"],
  ["Wands", "The Wands"],
  ["Major", "The Major Arcana"],
]);

const StarSpinner = () => {
  const id = GetReadings();
  const { cards, allCards } = useCollectionStore();
  const { setSkyOffset, skyIndex, setSkyIndex } = useSkyStore();
  const [direction, setDirection] = useState(0);

  if (!id || !allCards) return null;

  const seenCards = allCards.filter((c) => c.seen > 0);

  const panels = [
    <div className="flex flex-col items-center">
      <span className="text-lg">{stellarTitles.get("total")}</span>
      <TheFatesView
        key="all"
        cards={getStarSet(seenCards, hashStr(id + "all-cards"))}
        id={id}
      />
    </div>,
    ...VALID_SUITS.map((suit) => {
      const collection = cards?.get(suit);
      return collection ? (
        <div className="flex flex-col items-center">
          <span className="text-lg">{stellarTitles.get(suit)}</span>
          {(() => {
            const seenSuitCards = collection.cards.filter((c) => c.seen > 0);
            return seenSuitCards.length === 0 ? (
              <div className="h-70 flex flex-col justify-center items-center">
                <span>Divine more to see your constellation</span>
              </div>
            ) : (
              <TheFatesView
                key={suit}
                cards={getStarSet(seenSuitCards, hashStr(id + suit))}
                id={id}
              />
            );
          })()}
        </div>
      ) : (
        <CardLoader key={suit} />
      );
    }),
  ];

  const total = panels.length;

  const paginate = (dir: number) => {
    const next = skyIndex + dir;
    if (next < 0 || next >= total) return; // hard stop, no wrap
    setDirection(dir);
    setSkyIndex(next);
    setSkyOffset(next * SKY_STEP);
  };

  return (
    // This wrapper must NOT have overflow:hidden — we want the panel to fly in from the screen edge
    // The parent page/layout should have overflow-x:hidden to clip it at the viewport
    <div className="relative w-full text-slate-300">
      {/* Arrows — inside the container, flanking the content */}
      <button
        onClick={() => paginate(-1)}
        disabled={skyIndex === 0}
        aria-label="Previous"
        className="absolute -left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-14 rounded-full border border-slate-600/60 bg-slate-900/50 backdrop-blur-md text-slate-400 hover:text-white hover:border-slate-400 transition-colors group disabled:opacity-20 disabled:pointer-events-none">
        <svg
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          className="group-hover:scale-110 transition-transform">
          <path
            d="M10 2L2 10L10 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={() => paginate(1)}
        disabled={skyIndex === total - 1}
        aria-label="Next"
        className="absolute -right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-14 rounded-full border border-slate-600/60 bg-slate-900/50 backdrop-blur-md text-slate-400 hover:text-white hover:border-slate-400 transition-colors group disabled:opacity-20 disabled:pointer-events-none">
        <svg
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          className="group-hover:scale-110 transition-transform">
          <path
            d="M2 2L10 10L2 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Panel — slides from true screen edge */}
      <AnimatePresence
        mode="wait"
        custom={direction}>
        <motion.div
          key={skyIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "tween",
            duration: 0.4,
            ease: [0.05, 0.02, 0.5, 0.95],
          }}
          className="w-full">
          {panels[skyIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4 pb-2">
        {panels.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const dir = i > skyIndex ? 1 : -1;
              setDirection(dir);
              setSkyIndex(i);
              setSkyOffset(i * SKY_STEP);
            }}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === skyIndex
                ? "w-5 bg-slate-300"
                : "w-1.5 bg-slate-600 hover:bg-slate-500"
            }`}
            aria-label={`Go to panel ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default StarSpinner;
