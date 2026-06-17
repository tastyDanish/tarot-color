export const capitalize = (word: string): string => {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getArt = (
  { card, art }: { card: string | null; art: string | null },
) => {
  if (!card) return undefined;
  if (art) {
    const path = card.replace("cards", art).replace("jpg", "png");
    return path.startsWith("/") ? path : `/${path}`;
  }
  return card.startsWith("/") ? card : `/${card}`;
};
