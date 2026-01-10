import ColorSwatch from "@/colors/color-swatch";
import { type Reading } from "@/stores/use-reading-store";
import { motion } from "motion/react";
import CardTitle from "./card-title";
import FlipCard from "./flip-card";
import StreakCounter from "./streak-counter";
import ShareButton from "@/share";
import { cn } from "@/lib/utils";
import { capitalize } from "@/lib/string-utils";

type DailyCardProps = {
  reading: Reading;
};
const DailyCard = ({ reading }: DailyCardProps) => {
  return (
    <div
      className="relative flex flex-col items-center opacity-100 w-full pb-4"
      id="daily-reading">
      <motion.div
        className="flex flex-col items-center z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: reading.flipped ? 1 : 0,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}>
        <div className="flex w-full flex-row items-center gap-4 md:gap-8 justify-around pr-2 md:pr-0">
          <CardTitle
            title={reading.card.name}
            isReversed={reading.reversed}
            isFoil={reading.foil ?? false}
            isDeprived={reading.deprived ?? false}
          />
        </div>
      </motion.div>

      {reading.flipped !== undefined && (
        <>
          <div
            className={cn(
              "flex z-10 h-100 mt-2 w-full justify-center",
              reading.reversed === true ? "flex-row-reverse" : ""
            )}>
            <FlipCard
              readingId={reading.id}
              isReversed={reading.reversed ?? true}
              isFlipped={reading.flipped}
              card={reading.card}
              isFoil={reading.foil ?? false}
              isDeprived={reading.deprived ?? false}
            />
            <ColorSwatch
              isFlipped={reading.flipped}
              image={reading?.card.image}
              words={reading?.words}
              isReversed={reading?.reversed ?? false}
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: reading.flipped ? 1 : 0,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className={cn(
              "flex w-full flex-wrap justify-center gap-2 pb-2 max-w-100",
              reading.flipped === false ? "opacity-0" : "opacity-100"
            )}>
            {reading.words.map(({ word, color }) => (
              <div className="flex items-center gap-1 text-xl tracking-wide">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span>{capitalize(word)}</span>
              </div>
            ))}
          </motion.div>
        </>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: reading.flipped ? 1 : 0,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className={cn(
          "flex gap-4 items-center py-2",
          reading.flipped === false ? "opacity-0" : "opacity-100"
        )}>
        <StreakCounter
          count={reading.streak ?? 1}
          smallText
        />
        <ShareButton />
      </motion.div>
    </div>
  );
};

export default DailyCard;
