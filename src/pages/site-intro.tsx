import { motion } from "motion/react";

const SiteIntrouction = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center w-full flex flex-col gap-3 pt-4 pb-2 px-4 md:px-0 body-font">
      <h1 className="font-bold text-orange-50">
        Unfold today's secrets, one card and color at a time.
      </h1>
    </motion.header>
  );
};

export default SiteIntrouction;
