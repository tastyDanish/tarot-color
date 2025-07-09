import CardBorder from "@/cards/card-border";
import { useCollectionStore } from "@/stores/use-collection-store";
import { motion } from "motion/react";
import { useState } from "react";

const Aura = () => {
  const [cardLoaded, setCardLoaded] = useState(false);
  const [auraLoaded, setAuraLoaded] = useState(false);

  const { mostCommonCard, auraColor } = useCollectionStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: cardLoaded && auraLoaded ? 1 : 0 }}>
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-center">Your Aura</h1>
      </header>
      <div className="flex w-full justify-center gap-4 items-end">
        <div className="flex flex-col">
          <div className="w-[140px] h-[240px] overflow-hidden flex-shrink-0 relative">
            <CardBorder size="medium">
              <img
                src={mostCommonCard?.image}
                draggable={false}
                className="[clip-path:inset(2px)] z-10"
                alt={`your card ${mostCommonCard?.name}`}
                onLoad={() => setCardLoaded(true)}
              />
            </CardBorder>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-[140px] h-[240px] overflow-hidden flex-shrink-0 relative">
            <CardBorder size="medium">
              <div style={{ backgroundColor: auraColor ?? "#000000" }}>
                <img
                  src={mostCommonCard?.image}
                  draggable={false}
                  className="[clip-path:inset(2px)] z-10 opacity-0"
                  alt=""
                  aria-hidden
                  onLoad={() => setAuraLoaded(true)}
                />
              </div>
            </CardBorder>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Aura;
