import CardTitle from "@/cards/card-title";
import FlipCard from "@/cards/flip-card";
import ShareCard from "@/cards/share-card";
import ColorSwatch from "@/colors/color-swatch";
import ShareButton from "@/share";
import { useReadingStore } from "@/stores/use-reading-store";
import { useUserStore } from "@/stores/user-user-store";
import { motion } from "motion/react";
import { useEffect } from "react";
import SiteIntrouction from "./site-intro";
import DailyCard from "@/cards/daily-card";

const Home = () => {
  const { id: userId, loading: userLoading } = useUserStore();
  const {
    reading,
    isLoading: readingLoading,
    loadReading,
    isFlipped,
  } = useReadingStore();

  // Once user is done loading, load the reading
  useEffect(() => {
    if (!userLoading) {
      loadReading(userId ?? undefined);
    }
  }, [userLoading, userId]);

  if (readingLoading || !reading || isFlipped == null) {
    return (
      <div className="relative flex flex-col w-full  overflow-y-hidden h-full overflow-x-hidden items-center bg-gray-800 pb-10">
        <SiteIntrouction />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full overflow-y-hidden h-full overflow-x-hidden items-center  bg-gray-800 pb-10">
      <SiteIntrouction />

      <ShareCard reading={reading} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <DailyCard
          reading={reading}
          isFlipped={isFlipped}
        />
      </motion.div>
    </div>
  );
};

export default Home;
