import { animate, motion } from "motion/react";
import type { TarotCard } from "./tarot-cards";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import CardBorder from "./card-border";
import CardBack from "./card-back";
import { createAccountPush } from "./create-account-push";
import { useUserStore } from "@/stores/user-user-store";
import { getArt } from "@/lib/string-utils";
import { type CardSize, SIZE_CLASSES } from "./types";

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

const FRONT_LOAD_TIMEOUT_MS = 4000;

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
  const art = getArt({ card: card.image, art: alternateArt });

  // Tracks whether the front art is ready to show. Only gates the front
  // <img>'s own opacity now — never the button/card-back visibility.
  const [frontLoaded, setFrontLoaded] = useState(() => {
    if (!art) return false;
    const img = new Image();
    img.src = art;
    return img.complete;
  });
  const [frontErrored, setFrontErrored] = useState(false);
  const { id } = useUserStore();

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

    setFrontLoaded(false);
    setFrontErrored(false);

    const img = new Image();
    img.src = art;

    if (img.complete) {
      setFrontLoaded(true);
      return;
    }

    img.onload = () => setFrontLoaded(true);
    img.onerror = () => {
      // Don't leave the front permanently blank on a failed load —
      // fall back so the flip at least resolves to something.
      setFrontErrored(true);
      setFrontLoaded(true);
    };

    // Belt-and-suspenders: if neither onload nor onerror fires in a
    // reasonable window (flaky network, browser oddities), stop waiting.
    const timeout = setTimeout(
      () => setFrontLoaded(true),
      FRONT_LOAD_TIMEOUT_MS
    );

    return () => {
      clearTimeout(timeout);
      img.onload = null;
      img.onerror = null;
    };
  }, [art]);

  return (
    <button
      onClick={handleClick}
      className="h-fit w-fit flex justify-center"
      style={{
        perspective: "1000px",
        WebkitPerspective: "1000px",
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
          {!frontErrored && (
            <img
              src={art}
              style={{
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                opacity: frontLoaded ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
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
          )}
        </CardBorder>
        <CardBack size={size} />
      </motion.div>
    </button>
  );
};

export default FlipCard;
