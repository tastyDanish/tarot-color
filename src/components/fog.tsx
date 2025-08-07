import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";

const Fog = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadEmittersPlugin(engine); // ✅ Load emitters here
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () =>
      ({
        fpsLimit: 60,
        fullScreen: false,
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: false },
          },
        },
        particles: {
          number: {
            value: 0, // fully emitter-driven
          },
          color: {
            value: [
              "#3b82f6", // Bright blue (Tailwind blue-500)
              "#8b5cf6", // Vivid purple (Tailwind violet-500)
              "#f97316", // Warm orange (Tailwind orange-400) — subtle pop
              "#a78bfa", // Soft lavender (Tailwind violet-400)
              "#c4b5fd", // Light purple (Tailwind violet-300)
            ],
          },
          shape: {
            type: ["circle", "star", "polygon"],
            options: {
              polygon: {
                sides: 5,
              },
            },
          },
          opacity: {
            value: { min: 0.1, max: 0.7 },
            animation: {
              enable: true,
              speed: 0.4,
              minimumValue: 0,
              startValue: "random",
              destroy: "min",
            },
          },
          size: {
            value: { min: 1, max: 12 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              startValue: "random",
              destroy: "min",
            },
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            outModes: {
              default: "destroy",
            },
            path: {
              enable: true,
              generator: "simplexNoise",
              options: {
                noise: {
                  enable: true,
                  delay: {
                    value: 0,
                  },
                },
              },
            },
          },
        },
        emitters: [
          {
            direction: "none",
            rate: { delay: 0.07, quantity: 5 },
            position: { x: 50, y: 50 },
          },
        ],
      } as ISourceOptions),
    []
  );

  if (init) {
    return (
      <div className="relative w-full h-90 py-10">
        <Particles
          id="tsparticles"
          options={options}
          className="absolute inset-0 w-full h-full z-0"
        />
        {/* radial fade */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(circle at center, rgba(31, 41, 55, 0) 30%, rgba(31, 41, 55, 1) 70%)",
          }}
        />
        {/* top down fade */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: `linear-gradient(to bottom,  rgba(31, 41, 55, 0.9) 10%,  rgba(31, 41, 55, 0) 30%,  rgba(31, 41, 55, 0) 70%,  rgba(31, 41, 55, 0.9) 90%)`,
          }}
        />

        <div
          className="relative z-10 flex items-center justify-center h-full text-amber-100 font-bold text-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(31, 41, 55, 0.6) 40%, rgba(31, 41, 55, 0) 50%)",
          }}>
          pondering...
        </div>
      </div>
    );
  }

  return <></>;
};

export default Fog;
