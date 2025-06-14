export const rgbToHex = (rgb: number[]): string => {
  return (
    "#" +
    rgb
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
};
