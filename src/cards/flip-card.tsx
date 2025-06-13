import { motion } from "motion/react";
import type { TarotCard } from "./tarot-cards";

type FlipCardProps = {
  card: TarotCard;
  isFlipped: boolean;
  handleClick: (isFlipped: boolean) => void;
};

const textureStyle = {
  backgroundImage: "url('/paper-texture.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "30% 0%",
};

const FlipCard = ({ card, handleClick, isFlipped }: FlipCardProps) => {
  return (
    <div
      onClick={() => handleClick(false)}
      className="h-full"
      style={{ perspective: "1000px" }}>
      <motion.div
        className="relative md:w-[340px] md:h-[580px] w-[300px] h:[400px]"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}>
        <motion.div className="absolute bg-stone-100 p-4 rounded-xl backface-hidden overflow-hidden shadow-md">
          <div className="bg-slate-950 p-1 rounded-md">
            <div className="overflow-hidden  flex justify-center items-center rounded-2xl">
              <img
                src={card.image}
                className="[clip-path:inset(2px)] z-10"
                alt={card.name}
              />
            </div>
          </div>
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={textureStyle}
          />
        </motion.div>
        <motion.div
          className="absolute backface-hidden bg-stone-200 p-4 justify-center items-center rounded-xl overflow-hidden shadow-md"
          style={{ transform: "rotateY(180deg)" }}>
          <div className="bg-stone-800 p-1 rounded-xl">
            <div className="relative overflow-hidden  flex justify-center items-center rounded-xl bg-stone-800">
              <div className="absolute bg-amber-400 h-full w-1" />
              <div className="absolute bg-amber-400 h-30 w-30 rounded-full transform-x-30" />
              <div className="absolute border-amber-400 border-4 h-40 w-40 rounded-full" />
              <div className="absolute border-amber-400 border-4 h-50 w-50 rounded-full" />

              <img
                src={card.image}
                className="[clip-path:inset(2px)] z-10 opacity-0"
                alt={card.name}
              />
            </div>
          </div>

          <div
            className="absolute inset-0 opacity-80 pointer-events-none mix-blend-multiply"
            style={textureStyle}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
