import { motion } from "motion/react";
import type { TarotCard } from "./tarot-cards";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CardBorder from "./card-border";
import CardBack from "./card-back";
import { useReadingStore } from "@/stores/use-reading-store";

type FlipCardProps = {
  card: TarotCard;
  isFlipped: boolean;
  isReversed: boolean;
  isFoil: boolean;
};

const FlipCard = ({ card, isReversed, isFoil }: FlipCardProps) => {
  const [frontLoaded, setFrontLoaded] = useState(false);
  const [backLoaded, setBackLoaded] = useState(false);

  const { isFlipped, setIsFlipped } = useReadingStore();

  return (
    <div
      onClick={() => setIsFlipped(false)}
      className="h-full"
      style={{
        perspective: "1000px",
        WebkitPerspective: "1000px",
        opacity: frontLoaded && backLoaded ? 1 : 0,
      }}>
      <motion.div
        className="relative md:w-[340px] md:h-[580px] w-[300px] h:[400px]"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
        initial={false}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}>
        <CardBorder isFoil={isFoil}>
          <img
            src={card.image}
            draggable={false}
            className={cn(
              "[clip-path:inset(2px)] z-10",
              isReversed ? "rotate-180" : ""
            )}
            alt={card.name}
            onLoad={() => setFrontLoaded(true)}
          />
        </CardBorder>

        <CardBack>
          <img
            src={card.image}
            draggable={false}
            className="[clip-path:inset(2px)] z-10 opacity-0"
            alt={card.name}
            onLoad={() => setBackLoaded(true)}
          />
        </CardBack>
      </motion.div>
    </div>
  );
};

export default FlipCard;
