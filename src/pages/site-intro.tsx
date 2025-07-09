import { motion } from "motion/react";

const SiteIntrouction = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-amber-100 text-center w-full px-8 max-w-150 flex text-base flex-col gap-4 pt-2 body-font">
      <p>Welcome, traveler.</p>
      <p>
        Focus your thoughts on a question, turn the card, and read the signs.
      </p>
      <p>
        Each reading reveals not only words, but a unique palette; colors drawn
        from fate itself. Look into the hues and phrases to find your answer,
        insight, or inspiration.
      </p>
    </motion.div>
  );
};

export default SiteIntrouction;
