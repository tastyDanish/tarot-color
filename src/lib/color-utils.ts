export const rgbToHex = (rgb: number[]): string => {
  return (
    "#" +
    rgb
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
};

export const getContrastTextColor = (hex: string): string => {
  const cleanHex = hex.replace("#", "");

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "text-slate-800" : "text-amber-100";
};

const isWhite = ({ r, g, b }: { r: number; g: number; b: number }) =>
  r > 220 && g > 220 && b > 220;

const isBlack = ({ r, g, b }: { r: number; g: number; b: number }) =>
  r < 35 && g < 35 && b < 35;

export const groupColors = (
  rgbList: { r: number; g: number; b: number }[],
  tolerance = 32,
): string => {
  const filtered = rgbList.filter((c) => !isWhite(c) && !isBlack(c));
  const buckets: Record<
    string,
    { r: number; g: number; b: number; count: number }
  > = {};

  for (const { r, g, b } of filtered) {
    const key = `${Math.round(r / tolerance)}_${Math.round(g / tolerance)}_${
      Math.round(b / tolerance)
    }`;
    if (!buckets[key]) {
      buckets[key] = { r: 0, g: 0, b: 0, count: 0 };
    }
    buckets[key].r += r;
    buckets[key].g += g;
    buckets[key].b += b;
    buckets[key].count += 1;
  }

  if (Object.values(buckets).length === 0) {
    // fallback to white if no valid colors
    return "#FFFFFF";
  }

  const dominant = Object.values(buckets).reduce((a, b) =>
    a.count > b.count ? a : b
  );

  const avgR = Math.round(dominant.r / dominant.count);
  const avgG = Math.round(dominant.g / dominant.count);
  const avgB = Math.round(dominant.b / dominant.count);

  return rgbToHex([avgR, avgG, avgB]);
};
