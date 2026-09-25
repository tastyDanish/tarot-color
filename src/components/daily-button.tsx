import { useAnimation, motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaperTexture from "./paper-texture";
import LittleCard from "./little-card";
import { useReadingStore } from "@/stores/use-reading-store";

const DailyButton = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const reading = useReadingStore((s) => s.reading);

  const shakeControls = useAnimation();

  useEffect(() => {
    if (hover) {
      shakeControls.start({
        y: -5,
        rotate: [0, -2, 2, 0, -2, 0, 2, 0],
        x: [0, -1, 1, 0, -1, 0, 1, 0],
        transition: {
          y: { type: "tween", duration: 0.8 },
          x: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
        },
      });
    } else {
      shakeControls.start({
        y: 0,
        rotate: 0,
        x: 0,
        transition: { type: "tween", duration: 0.8 },
      });
    }
  }, [hover, shakeControls]);

  return (
    <div className="relative w-64">
      {reading && !reading.flipped && (
        <div className="absolute -top-3 -left-4 z-50 inline-flex items-center justify-center rounded-full bg-orange-400 px-2.5 pt-1 pb-2 text-lg font-bold uppercase leading-none tracking-wider text-gray-900 shadow-md">
          NEW
        </div>
      )}
      <button
        onClick={() => navigate("/daily-single")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group bg-orange-100 p-4 rounded-2xl w-full text-amber-900 h-70 flex flex-col items-center shadow-xl hover:shadow-lg transition cursor-pointer relative overflow-hidden">
        {/* Decorative Stars */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute text-2xl -rotate-45 -translate-x-20 -translate-y-24 opacity-70">
            ★
          </div>
          <div className="absolute text-2xl rotate-45 translate-x-20 -translate-y-4 opacity-70">
            ★
          </div>
          <div className="absolute text-xl rotate-45 translate-x-16 -translate-y-20 opacity-70">
            ★
          </div>
          <div className="absolute text-3xl -rotate-45 -translate-x-16 -translate-y-10 opacity-70">
            ★
          </div>
        </div>

        <div className="flex-1 w-full flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ y: 0 }}
            animate={shakeControls}>
            <LittleCard rotation="" />
          </motion.div>
        </div>

        <div className="h-0.75 w-9/10 rounded-xl bg-amber-900 mb-3" />

        <div className="flex flex-col w-full items-start text-left h-18 shrink-0">
          <span className="font-bold text-xl">DAILY FORTUNE</span>
          <span className="text-sm">
            See what the fates have in store for you today
          </span>
        </div>

        <PaperTexture opacity={80} />
      </button>
    </div>
  );
};

export default DailyButton;
