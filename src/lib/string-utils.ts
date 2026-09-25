export const capitalize = (word: string): string => {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getArt = (
  { card, art }: { card: string | null; art: string | null },
) => {
  if (!card) return undefined;

  const filename = card
    .replace(/^\/?cards\//, "")
    .replace(/\.jpg$/, ".png");

  const deck = art || "classic";
  const sourcePath = `/${deck}/${filename}`;

  return `/.netlify/images?url=${encodeURIComponent(sourcePath)}&fm=webp&q=80`;
};
