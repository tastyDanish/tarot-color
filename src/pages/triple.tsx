import { ConditionalSwipe } from "@/components/conditional-swipe";
import { TripleReading } from "@/triple/triple-reading";
import { SpreadPicker } from "@/triple/spread-picker";
import { useTripleStore, type TripleSaved } from "@/stores/use-triple-store";
import { AnimatePresence, motion } from "motion/react";
import { formatExpiryDate } from "@/stores/use-triple-store";

import TripleShare from "@/triple/triple-share";
import ShareButton from "@/share";
import GoToCollection from "@/collection/go-to-collection";
import CrystalBall from "@/components/crystal-ball";
import { useUserStore } from "@/stores/user-user-store";

const TripleDraw = ({ reading }: { reading: TripleSaved }) => {
  const { loading, id } = useUserStore();
  const setPhaseFlipped = useTripleStore((s) => s.setPhaseFlipped);
  const allFlipped = reading.flipped.every(Boolean);

  return (
    <motion.div
      className="relative w-full pt-4 h-fit pb-10 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <div className="flex flex-col items-center pb-6 px-8 text-lg text-center text-slate-300">
        <span>
          Your spread for the week · next draw available at{" "}
          {formatExpiryDate(reading.expiration)}
        </span>
      </div>
      <div
        id="triple-reading"
        className="max-w-screen pb-6 flex justify-center gap-10">
        <ConditionalSwipe classnames="h-138">
          {reading.readingPhases.map((phase, i) => (
            <TripleReading
              key={phase.title}
              phase={phase}
              initialFlipped={reading.flipped[i]}
              onFlip={() => setPhaseFlipped(i)}
            />
          ))}
        </ConditionalSwipe>
      </div>

      <motion.div
        className="w-100 flex flex-col items-center"
        initial={allFlipped ? false : { opacity: 0 }}
        animate={{ opacity: allFlipped ? 1 : 0 }}
        transition={{ duration: 0.8, delay: allFlipped ? 1.2 : 0 }}
        style={{ pointerEvents: allFlipped ? "auto" : "none" }}
        aria-hidden={!allFlipped}>
        <ShareButton />
        {!loading && id !== null && <GoToCollection />}
      </motion.div>

      <TripleShare phases={reading.readingPhases} />
    </motion.div>
  );
};

const Triple = () => {
  const reading = useTripleStore((s) => s.reading);
  const isLoading = useTripleStore((s) => s.isLoading);

  const expired = reading && reading.expiration.getTime() <= Date.now();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="fog"
          className="w-full flex relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}>
          <CrystalBall />
        </motion.div>
      ) : !reading || expired ? (
        <motion.div
          key="picker"
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <SpreadPicker
            onPick={(s) =>
              useTripleStore.getState().startReading(s.name, s.titles)
            }
          />
        </motion.div>
      ) : (
        <TripleDraw
          key="draw"
          reading={reading}
        />
      )}
    </AnimatePresence>
  );
};

export default Triple;
