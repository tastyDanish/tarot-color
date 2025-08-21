import type { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useState, useEffect, useMemo, memo } from "react";

const StarryNight = () => {
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
        fpsLimit: 60,
        fullScreen: false,
        background: {
          color: {
            value: "#1f2937",
          },
          image: "linear-gradient(to bottom, #1f2937, #0b0f19)",
        },
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: false },
          },
        },
        particles: {
          number: {
            value: 500, // total number of stars
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: ["#ffffff", "#93c5fd", "#bfdbfe"], // white + faint blues
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: { min: 0.1, max: 0.4 },
            animation: {
              enable: true,
              speed: 0.2,
              minimumValue: 0.1, // never fade to 0
              sync: false,
            },
          },
          size: {
            value: { min: 0.5, max: 2 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.5, // never shrink to 0
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 0.08,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce", // keep them in the canvas
            },
          },
        },
      } as ISourceOptions),
    []
  );

  if (init) {
    return (
      <div
        id="starry-wrapper"
        className="absolute inset-0 w-full h-full pointer-events-none -z-50">
        <Particles
          id="tsparticles-starry-background"
          options={options}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return null;
};

export default memo(StarryNight);
