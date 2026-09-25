import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useTripleStore } from "@/stores/use-triple-store";
import PaperTexture from "@/components/paper-texture";

const TripleReminder = () => {
  const navigate = useNavigate();
  const stored = useTripleStore((s) => s.reading);
  const isLoading = useTripleStore((s) => s.isLoading);

  // an expired reading counts as no reading, same rule as TripleButton
  const reading =
    stored && stored.expiration.getTime() > Date.now() ? stored : null;
  const allFlipped = !!reading && reading.flipped.every(Boolean);

  // nothing to remind about: still loading, or they've already revealed everything
  if (isLoading || allFlipped) return null;

  return (
    <motion.button
      onClick={() => navigate("/triple")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
      className="group bg-orange-100 rounded-sm pl-4 pr-3 py-2 text-amber-900 flex items-center gap-2 shadow-xl hover:shadow-lg transition cursor-pointer relative overflow-hidden hover:scale-105 active:scale-95 mb-6 mt-2">
      <span className="font-bold text-sm">Try the NEW Triple Card Spread!</span>
      <PaperTexture opacity={80} />
    </motion.button>
  );
};

export default TripleReminder;
