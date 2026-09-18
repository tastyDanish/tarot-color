import ColorSwatch from "@/colors/color-swatch";
import { type Reading } from "@/stores/use-reading-store";
import { motion } from "motion/react";
import CardTitle from "./card-title";
import FlipCard from "./flip-card";
import StreakCounter from "./streak-counter";
import ShareButton from "@/share";
import { cn } from "@/lib/utils";
import DailyWords from "./daily-words";

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
        <div className="flex w-full flex-row items-center gap-4 md:gap-8 justify-around pb-2 pr-2 md:pr-0">
          <CardTitle
            title={reading.card.name}
            isReversed={reading.reversed}
            isFoil={reading.foil ?? false}
            isDeprived={reading.deprived ?? false}
          />
        </div>
      </motion.div>

      <div
        className={cn(
          "flex z-10 h-100 mt-2 justify-center",
          reading.reversed === true ? "flex-row-reverse" : "",
          reading.flipped === undefined ? "invisible" : ""
        )}>
        <FlipCard
          readingId={reading.id}
          isReversed={reading.reversed ?? true}
          isFlipped={reading.flipped ?? false}
          card={reading.card}
          isFoil={reading.foil ?? false}
          isDeprived={reading.deprived ?? false}
          alternateArt={reading.alternateArt ?? null}
        />
        <ColorSwatch
          isFlipped={reading.flipped ?? false}
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
          "flex flex-wrap justify-center gap-2 pt-4 pb-2 w-75 pl-1 pr-1",
          reading.flipped === false ? "opacity-0" : "opacity-100"
        )}>
        <DailyWords words={reading.words.map((w) => w.word)} />
      </motion.div>
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
