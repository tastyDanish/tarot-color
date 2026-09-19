import { animate, motion } from "motion/react";
import type { TarotCard } from "./tarot-cards";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import CardBorder from "./card-border";
import CardBack from "./card-back";
import { createAccountPush } from "./create-account-push";
import { useUserStore } from "@/stores/user-user-store";
import { getArt } from "@/lib/string-utils";

type CardSize = "medium" | "large";

type FlipCardProps = {
  card: TarotCard;
  isFlipped: boolean;
  isReversed: boolean;
  isFoil: boolean;
  isDeprived: boolean;
  alternateArt: string | null;
  setIsFlipped: () => void;
  size?: CardSize;
  borderOverride?: CardSize;
};

const SIZE_CLASSES: Record<CardSize, string> = {
  large: "h-90 w-50",
  medium: "h-80 w-45",
};

const FlipCard = ({
  card,
  isReversed,
  isFoil,
  isFlipped,
  isDeprived,
  alternateArt,
  setIsFlipped,
  size = "large",
  borderOverride,
}: FlipCardProps) => {
  const [frontLoaded, setFrontLoaded] = useState(false);
  const { id } = useUserStore();

  const art = getArt({ card: card.image, art: alternateArt });

  useEffect(() => {
    if (!isFlipped) return;

    const container = document.getElementById("scroll-container");
    const target = document.getElementById("daily-title");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!container || !target || prefersReducedMotion) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const targetTop = targetRect.top - containerRect.top + container.scrollTop;

    const maxScroll = container.scrollHeight - container.clientHeight;
    const scrollTo = Math.min(targetTop, maxScroll);

    const controls = animate(container.scrollTop, scrollTo, {
      duration: 0.7,
      ease: "easeInOut",
      onUpdate: (v) => {
        container.scrollTop = v;
      },
    });

    return () => controls.stop();
  }, [isFlipped]);

  const handleClick = () => {
    setIsFlipped();
    if (id == null) createAccountPush(1000);
  };

  useEffect(() => {
    if (!art) return;
    const img = new Image();
    img.src = art;
    if (img.complete) {
      setFrontLoaded(true);
    } else {
      img.onload = () => setFrontLoaded(true);
    }
  }, [art]);

  return (
    <button
      onClick={handleClick}
      className="h-fit w-fit flex justify-center"
      style={{
        perspective: "1000px",
        WebkitPerspective: "1000px",
        opacity: frontLoaded ? 1 : 0,
      }}>
      <motion.div
        className={cn("relative flex shadow-xl justify-center")}
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
          isReversed={isReversed}
          isFoil={isFoil}
          size={borderOverride ? borderOverride : size}>
          <img
            src={art}
            style={{
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
            }}
            draggable={false}
            className={cn(
              SIZE_CLASSES[size],
              "z-50",
              isReversed ? "rotate-180" : "",
              isDeprived ? "grayscale" : "",
              alternateArt ? "" : "[clip-path:inset(2px)]"
            )}
            alt={card.name}
          />
        </CardBorder>
        <CardBack size={size} />
      </motion.div>
    </button>
  );
};

export default FlipCard;
