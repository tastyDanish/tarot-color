import DailyCard from "@/cards/daily-card";
import InstagramShare from "@/cards/instagram-share";
import ShareCard from "@/cards/share-card";
import CrystalBall from "@/components/crystal-ball";
import { useReadingStore } from "@/stores/use-reading-store";
import { AnimatePresence, motion } from "motion/react";

const Single = () => {
  const { reading, isLoading } = useReadingStore();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center pt-4 pb-2">
        <p className="text-amber-100 text-xl">Your reading for today is</p>
      </div>

      <AnimatePresence mode="popLayout">
        {isLoading && (
          <motion.div
            key="fog"
            className="w-full flex relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <CrystalBall />
          </motion.div>
        )}
        {!isLoading && reading && (
          <motion.div
            key="card"
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}>
            <ShareCard reading={reading} />
            <InstagramShare reading={reading} />
            <DailyCard reading={reading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Single;
