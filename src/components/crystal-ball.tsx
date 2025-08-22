import type { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "motion/react";
import { memo, useEffect, useMemo, useState } from "react";

const CrystalBall = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        });
        if (mounted) {
          setInit(true);
        }
      } catch (err) {
        console.error("Error initializing particles engine:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const options = useMemo(
    () =>
      ({
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: {
            value: 800,
            density: { enable: true, area: 200 },
          },
          shape: {
            type: ["star", "circle", "character"],
            options: {
              character: [
                {
                  value: "☾",
                  font: "serif",
                  style: "",
                  weight: "400",
                },
                {
                  value: "✦",
                  font: "serif",
                  style: "",
                  weight: "400",
                },
              ],
            },
          },
          color: {
            value: ["#7dd3fc", "#facc15", "#fb923c"],
          },
          opacity: {
            value: 0.7,
            random: { enable: true, minimumValue: 0.3 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
              sync: false,
            },
          },
          size: {
            value: { min: 2, max: 6 },
            animation: { enable: true, speed: 2, minimumValue: 1, sync: false },
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "bounce" },
            attract: { enable: true, rotateX: 300, rotateY: 600 },
          },
        },

        detectRetina: true,
      } as ISourceOptions),
    []
  );

  if (init) {
    return (
      <div className="relative flex w-full justify-center pt-10">
        <Particles
          id="tsparticles"
          options={options}
          className="w-60 h-60 rounded-full overflow-hidden opacity-70"
        />

        <div className="absolute text-amber-100 text-2xl font-bold pointer-events-none select-none h-full flex justify-center top-0 flex-col">
          <motion.span
            animate={{ opacity: [0, 1, 1, 1, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}>
            pondering...
          </motion.span>{" "}
        </div>
      </div>
    );
  }
  return null;
};

export default memo(CrystalBall);
