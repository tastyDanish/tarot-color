import chroma from "chroma-js";
import { getRandomItem, shuffleArray } from "@/lib/random-utils";
import { PALETTES } from "./palettes";

export const LIGHT_ANCHORS = [
  "#ffffff",
  "#f8f9fa",
  "#f0f0f0",
  "#eaeaea",
  "#fdf6e3",
];

function getHue(color: string): number {
  return chroma(color).hsl()[0] || 0;
}

function randomSaturation(): number {
  return 0.5 + Math.random() * 0.3;
}

function jitterHue(hue: number, range = 10): number {
  return (hue + (Math.random() * 2 - 1) * range + 360) % 360;
}

function jitterLightness(base: number, range = 0.1): number {
  return Math.min(1, Math.max(0, base + (Math.random() * 2 - 1) * range));
}

function jitterSaturation(base: number, range = 0.1): number {
  return Math.min(1, Math.max(0, base + (Math.random() * 2 - 1) * range));
}

export const generatePalette = (): string[] => {
  const paletteType = getRandomItem(["mono", "duo", "tri", "quad", "five"]);
  const lightAnchor = getRandomItem(LIGHT_ANCHORS);
  const baseColor = getRandomItem(getRandomItem(PALETTES));
  const baseHue = getHue(baseColor);

  if (paletteType === "mono") {
    return Array.from({ length: 5 }).map((_, i) => {
      const t = i / 4;
      const sat = randomSaturation() * (1 - t) + t * 0.3;
      const light = 0.4 + 0.6 * t;
      return chroma.hsl(baseHue, sat, light).hex();
    });
  }

  if (paletteType === "duo") {
    const hueShift = Math.random() * 60 + 150;
    const secondHue = (baseHue + hueShift) % 360;

    const colors = Array.from({ length: 5 }).map((_, i) => {
      const t = i / 4;
      let hue, sat, light;
      if (t < 0.5) {
        hue = jitterHue(baseHue);
        sat = jitterSaturation(randomSaturation());
        light = jitterLightness(0.4 + 0.6 * (t / 0.5));
      } else {
        hue = jitterHue(secondHue);
        sat = jitterSaturation(randomSaturation() * (1 - (t - 0.5) / 0.5));
        light = jitterLightness(0.7 + 0.3 * ((t - 0.5) / 0.5));
      }
      return chroma.hsl(hue, sat, light).hex();
    });

    return shuffleArray(colors);
  }

  if (paletteType === "tri") {
    const angle = getRandomItem([90, 110, 120, 130, 150]);
    const base = jitterHue(baseHue);
    const second = jitterHue((base + angle) % 360);
    const third = jitterHue((base + (360 - angle)) % 360);

    const triColors = [
      chroma.hsl(base, randomSaturation(), jitterLightness(0.5)).hex(),
      chroma.hsl(second, randomSaturation(), jitterLightness(0.5)).hex(),
      chroma.hsl(third, randomSaturation(), jitterLightness(0.5)).hex(),
    ];

    const colors = chroma
      .scale([...triColors, lightAnchor])
      .mode("lab")
      .colors(5);

    return shuffleArray(colors);
  }

  if (paletteType === "quad") {
    const quadColors = [
      chroma.hsl(jitterHue(baseHue), randomSaturation(), jitterLightness(0.5)),
      chroma.hsl(
        jitterHue((baseHue + 60) % 360),
        randomSaturation(),
        jitterLightness(0.5)
      ),
      chroma.hsl(
        jitterHue((baseHue + 180) % 360),
        randomSaturation(),
        jitterLightness(0.5)
      ),
      chroma.hsl(
        jitterHue((baseHue + 240) % 360),
        randomSaturation(),
        jitterLightness(0.5)
      ),
    ];

    const colors = chroma
      .scale([...quadColors.map((c) => c.hex()), lightAnchor])
      .mode("lab")
      .colors(5);

    return shuffleArray(colors);
  }

  if (paletteType === "five") {
    const startHue = Math.random() * 360;
    const hueStep = 360 / 5;

    return Array.from({ length: 5 }).map((_, i) => {
      const hue = (startHue + i * hueStep) % 360;
      const sat = 0.5 + 0.3 * Math.sin(i);
      const light = 0.4 + 0.2 * Math.cos(i);
      return chroma.hsl(hue, sat, light).hex();
    });
  }

  // fallback
  return chroma.scale([baseColor, lightAnchor]).mode("lab").colors(5);
};
