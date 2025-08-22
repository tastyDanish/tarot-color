import { useAnimation, motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaperTexture from "./paper-texture";
import LittleCard from "./little-card";
import { useReadingStore } from "@/stores/use-reading-store";

const DailyButton = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const { reading } = useReadingStore();

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
    <div className="relative">
      {reading && !reading.flipped && (
        <div className="bg-orange-500 text-xl font-bold px-2 rounded-xl absolute -top-3 -left-4 z-50 text-gray-900 opacity-100">
          NEW
        </div>
      )}
      <button
        onClick={() => navigate("/daily-single")}
        onMouseEnter={() => setHover(true)}
        className="group bg-orange-100 p-4 rounded-2xl max-w-64 text-amber-950 h-70 flex flex-col items-center justify-around shadow-xl hover:shadow-lg transition cursor-pointer relative overflow-hidden"
        onMouseLeave={() => setHover(false)}>
        {/* Decorative Stars */}
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

        <motion.div
          className="pointer-events-none"
          initial={{ y: 0 }}
          animate={shakeControls} // applies shake animation
        >
          <LittleCard rotation="" />
        </motion.div>

        <div className="h-[3px] w-9/10 rounded-xl bg-amber-950 " />
        <div className="flex flex-col w-full items-start text-left">
          <span className="font-extrabold text-xl">DAILY READING</span>
          <span className="font-thin text-sm">
            See what the fates have in store for you today
          </span>
        </div>

        <PaperTexture opacity={80} />
      </button>
    </div>
  );
};

export default DailyButton;
