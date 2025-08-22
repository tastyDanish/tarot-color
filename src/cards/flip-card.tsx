import { animate, motion } from "motion/react";
import type { TarotCard } from "./tarot-cards";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (isFlipped) {
      const container = document.getElementById("scroll-container");
      const target = document.getElementById("daily-reading");
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (container && target && !prefersReducedMotion) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const targetBottom = targetRect.bottom - containerRect.top;

        const scrollTo = targetBottom - container.clientHeight;

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

  const handleClick = () => {
    setIsFlipped({ flipped: true, userId: id, readingId });
    if (id == null) createAccountPush(1000);
  };

  return (
    <button
      onClick={handleClick}
      className="h-fit"
      style={{
        perspective: "1000px",
        WebkitPerspective: "1000px",
        opacity: frontLoaded && backLoaded ? 1 : 0,
      }}>
      <motion.div
        className="relative w-60 flex justify-end shadow-xl"
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
              "[clip-path:inset(2px)] z-10 h-90",
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
