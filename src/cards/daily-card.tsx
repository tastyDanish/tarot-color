import ColorSwatch from "@/colors/color-swatch";
import ShareButton from "@/share";
import { type Reading } from "@/stores/use-reading-store";
import { motion } from "motion/react";
import CardTitle from "./card-title";
import FlipCard from "./flip-card";

type DailyCardProps = {
  isFlipped: boolean;
  reading: Reading;
};
const DailyCard = ({ isFlipped, reading }: DailyCardProps) => {
  return (
    <div className="relative flex flex-col items-center opacity-100 w-full">
      <motion.div
        className="flex flex-col items-center z-10"
        initial={{ opacity: isFlipped ? 0 : 1 }}
        animate={{
          opacity: isFlipped ? 0 : 1,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}>
        <div className="flex gap-2 items-center p-2 body-font">
          <p className="text-amber-100"> Your reading for today is</p>
        </div>
        <div className="flex w-full flex-row items-center gap-8 justify-around">
          <CardTitle
            title={reading.card.name}
            isReversed={reading.reversed}
            isFoil={reading.foil ?? false}
          />
          <ShareButton />
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row pt-4 z-10 items-center">
        <div className="bg-gray-800 flex-col justify-center">
          {isFlipped !== undefined && (
            <FlipCard
              isReversed={reading.reversed ?? false}
              isFlipped={isFlipped}
              card={reading.card}
              isFoil={reading.foil ?? false}
            />
          )}
        </div>

        <div
          className="w-[340px] flex flex-col px-4 md:p-0 mt-[420px] md:mt-0"
          style={{ height: isFlipped ? "1px" : "580px" }}>
          <ColorSwatch
            isNew={reading.new}
            isVisible={!isFlipped}
            image={reading?.card.image}
            words={reading?.words}
            isReversed={reading?.reversed ?? false}
          />
        </div>
      </div>
    </div>
  );
};

export default DailyCard;
