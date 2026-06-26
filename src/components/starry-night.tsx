import type { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { useSkyStore } from "@/stores/use-sky-store";
import { SKY_STEP } from "@/collection/constellation-stars/star-spinner";

const options: ISourceOptions = {
  fpsLimit: 60,
  fullScreen: false,
  size: {
    width: "250vw",
    height: "100vh",
  },
  background: {
    color: { value: "#1f2937" },
    image: "linear-gradient(to bottom, #1f2937, #0b0f19)",
  },
  interactivity: {
    events: {
      onClick: { enable: false },
      onHover: { enable: false },
    },
  },
  particles: {
    number: { value: 500, density: { enable: true } },
    color: { value: ["#ffffff", "#93c5fd", "#bfdbfe"] },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: { enable: true, speed: 0.2, sync: false },
    },
    size: {
      value: { min: 0.5, max: 2 },
      animation: { enable: true, speed: 0.5, sync: false },
    },
    move: {
      enable: true,
      speed: 0.08,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
    },
  },
};

// Completely isolated — no store, no changing props, never re-renders after mount
const StaticParticles = memo(
  () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
      let mounted = true;
      (async () => {
        try {
          await initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          });
          if (mounted) setInit(true);
        } catch (err) {
          console.error("Error initializing particles engine:", err);
        }
      })();
      return () => {
        mounted = false;
      };
    }, []);

    if (!init) return null;

    return (
      <Particles
        id="tsparticles-starry-background"
        options={options}
        className="absolute inset-0 w-full h-full"
      />
    );
  },
  () => true
); // second arg = always bail on re-render

// Outer shell reads the store and animates — StaticParticles is never touched
const StarryNight = () => {
  const { skyOffset } = useSkyStore();

  const MAX_OFFSET = Math.abs(SKY_STEP) * 5; // e.g. 260 * 5 = 1300px

  return (
    <div className="absolute inset-0 pointer-events-none -z-50 overflow-hidden">
      <motion.div
        className="absolute top-0 bottom-0"
        style={{
          left: -MAX_OFFSET,
          width: `calc(100% + ${MAX_OFFSET * 2}px)`,
        }}
        animate={{ x: skyOffset * 0.8 }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.9,
        }}>
        <StaticParticles />
      </motion.div>
    </div>
  );
};

export default StarryNight;
