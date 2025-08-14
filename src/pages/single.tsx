import DailyCard from "@/cards/daily-card";
import InstagramShareCopy from "@/cards/instagram-share-copy";
import ShareCard from "@/cards/share-card";
import Fog from "@/components/fog";
import { useReadingStore } from "@/stores/use-reading-store";
import { useUserStore } from "@/stores/user-user-store";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

const Single = () => {
  const { id: userId, loading: userLoading } = useUserStore();
  const { reading, isLoading, loadReading } = useReadingStore();

  useEffect(() => {
    if (!userLoading) {
      loadReading(userId ?? undefined);
    }
  }, [userLoading, userId, loadReading]);

  return (
    <div className="w-full flex flex-col">
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
