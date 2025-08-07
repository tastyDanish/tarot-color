import ShareCard from "@/cards/share-card";
import { useReadingStore } from "@/stores/use-reading-store";
import { useUserStore } from "@/stores/user-user-store";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import SiteIntrouction from "./site-intro";
import DailyCard from "@/cards/daily-card";
import Fog from "@/components/fog";

const Home = () => {
  const { id: userId } = useUserStore();
  const { reading, isLoading, loadReading, isFlipped } = useReadingStore();

  const lastUserId = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (userId !== null && lastUserId.current !== userId) {
      loadReading(userId ?? undefined);
      lastUserId.current = userId;
    }
  }, [userId, loadReading]);

  return (
    <div className="relative flex flex-col w-full overflow-y-hidden h-full overflow-x-hidden items-center  bg-gray-800 pb-10">
      <SiteIntrouction />
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
            transition={{ duration: 2 }}>
            <ShareCard reading={reading} />
            <DailyCard
              reading={reading}
              isFlipped={isFlipped ?? true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
