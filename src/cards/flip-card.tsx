import { motion } from "motion/react";
import type { TarotCard } from "./tarot-cards";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CardBorder from "./card-border";
import CardBack from "./card-back";
import { useReadingStore } from "@/stores/use-reading-store";
import { createAccountPush } from "./create-account-push";
import { useUserStore } from "@/stores/user-user-store";

type FlipCardProps = {
  readingId: string;
  card: TarotCard;
  isFlipped: boolean;
  isReversed: boolean;
  isFoil: boolean;
};

const FlipCard = ({
  card,
  isReversed,
  isFoil,
  isFlipped,
  readingId,
}: FlipCardProps) => {
  const [frontLoaded, setFrontLoaded] = useState(false);
  const [backLoaded, setBackLoaded] = useState(false);
  const { id } = useUserStore();

  const { setIsFlipped } = useReadingStore();

  const handleClick = () => {
    setIsFlipped({ flipped: true, userId: id, readingId });
    if (id == null) createAccountPush(1000);
  };

  return (
    <button
      onClick={handleClick}
      className="h-full"
      style={{
        perspective: "1000px",
        WebkitPerspective: "1000px",
        opacity: frontLoaded && backLoaded ? 1 : 0,
      }}>
      <motion.div
        className="relative md:w-[340px] md:h-[600px] w-[300px] h:[480px] pb-16"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
        initial={false}
        animate={{
          rotateY: isFlipped ? 0 : 180,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}>
        <CardBorder
          isFoil={isFoil}
          size="large">
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
    </button>
  );
};

export default FlipCard;
