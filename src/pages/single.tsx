import DailyCard from "@/cards/daily-card";
import InstagramShareCopy from "@/cards/instagram-share-copy";
import ShareCard from "@/cards/share-card";
import Fog from "@/components/fog";
import { useReadingStore } from "@/stores/use-reading-store";
import { AnimatePresence, motion } from "motion/react";

const Single = () => {
  const { reading, isLoading } = useReadingStore();

  return (
    <div className="w-full flex flex-col">
      <p className="text-amber-100 py-4 text-xl"> Your reading for today is</p>
      <AnimatePresence mode="popLayout">
        {isLoading && (
          <motion.div
            key="fog"
            className="w-full flex relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <Fog />
          </motion.div>
        )}
        {!isLoading && reading && (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}>
            <ShareCard reading={reading} />
            <InstagramShareCopy reading={reading} />
            <DailyCard reading={reading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Single;
