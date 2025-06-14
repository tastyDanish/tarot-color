import { useEffect, useState } from "react";
import useSWR from "swr";
import { type TarotCard, TAROT_CARDS } from "./tarot-cards";
import { getRandomItem, getRandomSubSet } from "@/lib/random-utils";
import { fetchPalette } from "@/lib/fetcher";
import { getNextMidnight } from "@/lib/time-utils";

export type WordColor = {
  word: string;
  color: string;
};

export type Reading = {
  card: TarotCard;
  words: WordColor[];
  expiration: Date;
};

const LOCAL_STORAGE_KEY = "divination-as-a-service";

export const useReading = () => {
  const {
    data: palette,
    error: paletteError,
    isLoading: paletteLoading,
  } = useSWR("random-palette", fetchPalette, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  const [reading, setReading] = useState<Reading | null>(null);
  const [isNewReading, setIsNewReading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      try {
        const saved: Reading = JSON.parse(raw);
        saved.expiration = new Date(saved.expiration);

        if (saved.expiration > new Date()) {
          console.log("WE'RE UPDATING THE READING");
          setIsNewReading(false);
          setReading(saved);
          return;
        }
      } catch {
        // If parsing fails, ignore and create new reading
      }
    }
  }, []);

  useEffect(() => {
    if (!palette || reading) return;

    const card = getRandomItem(TAROT_CARDS);

    const wordsRaw = card.description.split(",").map((w) => w.trim());
    const chosenWords = getRandomSubSet(wordsRaw, 5);

    const words: WordColor[] = chosenWords.map((word, i) => ({
      word,
      color: palette[i % palette.length],
    }));

    const expiration = getNextMidnight();

    const newReading: Reading = { card, words, expiration };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newReading));

    setReading(newReading);
    setIsNewReading(true);
  }, [palette, reading]);

  return {
    reading,
    isNewReading,
    loading: paletteLoading && !reading,
    error: paletteError,
  };
};
