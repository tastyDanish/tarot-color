import { animate, motion } from "motion/react";
import type { TarotCard } from "./tarot-cards";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import CardBorder from "./card-border";
import CardBack from "./card-back";
import { useReadingStore } from "@/stores/use-reading-store";
import { createAccountPush } from "./create-account-push";
import { useUserStore } from "@/stores/user-user-store";
import { getArt } from "@/lib/string-utils";

type FlipCardProps = {
  readingId: string;
  card: TarotCard;
  isFlipped: boolean;
  isReversed: boolean;
  isFoil: boolean;
  isDeprived: boolean;
  alternateArt: string | null;
};

const FlipCard = ({
  card,
  isReversed,
  isFoil,
  isFlipped,
  readingId,
  isDeprived,
  alternateArt,
}: FlipCardProps) => {
  const [frontLoaded, setFrontLoaded] = useState(false);
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

  useEffect(() => {
    const img = new Image();
    const src = getArt({ card: card.image, art: alternateArt });
    if (!src) return;
    img.src = src;
    if (img.complete) {
      setFrontLoaded(true);
    } else {
      img.onload = () => setFrontLoaded(true);
    }
  }, [card.image, alternateArt]);

  return (
    <button
      onClick={handleClick}
      className="h-fit w-fit"
      style={{
        perspective: "1000px",
        WebkitPerspective: "1000px",
        opacity: frontLoaded ? 1 : 0,
      }}>
      <motion.div
        className={cn(
          "relative w-60 flex shadow-xl",
          isFlipped ? "justify-start" : "justify-end"
        )}
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
            src={getArt({ card: card.image, art: alternateArt })}
            style={{
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
            }}
            draggable={false}
            className={cn(
              "z-10 w-48",
              isReversed ? "rotate-180" : "",
              isDeprived ? "grayscale" : "",
              alternateArt ? "" : "[clip-path:inset(2px)]"
            )}
            alt={card.name}
          />
        </CardBorder>

        <CardBack>
          <img
            src={getArt({ card: card.image, art: alternateArt })}
            draggable={false}
            className={cn(
              "z-10 opacity-0 w-48",
              alternateArt ? "" : "[clip-path:inset(2px)]"
            )}
            alt={card.name}
          />
        </CardBack>
      </motion.div>
    </button>
  );
};

export default FlipCard;
