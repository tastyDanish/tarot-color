import ColorSwatch from "@/colors/color-swatch";
import { type Reading } from "@/stores/use-reading-store";
import { motion } from "motion/react";
import CardTitle from "./card-title";
import FlipCard from "./flip-card";
import StreakCounter from "./streak-counter";
import ShareButton from "@/share";
import { cn } from "@/lib/utils";
import { useReadingStore } from "@/stores/use-reading-store";
import DailyWords from "./daily-words";
import GoToCollection from "@/collection/go-to-collection";
import { useUserStore } from "@/stores/user-user-store";

type DailyCardProps = {
  reading: Reading;
};
const DailyCard = ({ reading }: DailyCardProps) => {
  const { setIsFlipped } = useReadingStore();
  const { loading, id } = useUserStore();

  return (
    <div
      className="relative flex flex-col items-center opacity-100 w-full justify-between"
      id="daily-reading">
      <motion.div
        className="flex flex-col items-center z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: reading.flipped ? 1 : 0,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}>
        <div
          className="flex w-full flex-row items-center gap-4 md:gap-8 justify-around pb-2 pr-2 md:pr-0"
          id="daily-title">
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
          isReversed={reading.reversed ?? true}
          isFlipped={reading.flipped ?? false}
          card={reading.card}
          isFoil={reading.foil ?? false}
          isDeprived={reading.deprived ?? false}
          alternateArt={reading.alternateArt ?? null}
          setIsFlipped={() =>
            setIsFlipped({ flipped: true, userId: id, readingId: reading.id })
          }
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
          "flex flex-wrap justify-center gap-2 pt-2 pb-4 w-75 pl-1 pr-1",
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
          "flex flex-col gap-2 justify-center pt-2",
          id === null ? "pb-8" : "",
          reading.flipped === false ? "opacity-0" : "opacity-100"
        )}>
        <div className="flex gap-4 items-center w-full justify-center">
          <StreakCounter
            count={reading.streak ?? 1}
            smallText
          />
          <ShareButton />
        </div>
        {!loading && id !== null && <GoToCollection />}
      </motion.div>
    </div>
  );
};

export default DailyCard;
