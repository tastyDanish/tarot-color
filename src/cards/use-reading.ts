import { useState } from "react";
import { type TarotCard, TAROT_CARDS } from "./tarot-cards";
import {
  getRandomItem,
  getRandomSubSet,
  shuffleArray,
} from "@/lib/random-utils";
import { getNextMidnight } from "@/lib/time-utils";
import { generatePalette } from "@/colors/random-palettes";
import { PALETTES } from "@/colors/palettes";

export type WordColor = {
  word: string;
  color: string;
};

export type Reading = {
  card: TarotCard;
  words: WordColor[];
  expiration: Date;
  new: boolean;
  reversed?: boolean;
  foil?: boolean;
};

const LOCAL_STORAGE_KEY = "divination-as-a-service";

const getReading = () => {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (raw) {
    try {
      const saved: Reading = JSON.parse(raw);
      saved.expiration = new Date(saved.expiration);
      saved.reversed = saved.reversed ?? false; // default to false if missing

      if (saved.expiration > new Date()) {
        return { ...saved, new: false };
      }
    } catch {
      // If parsing fails, ignore and create new reading
    }
  }

  const card = getRandomItem(TAROT_CARDS);
  const reverseChance = Math.random();
  const reversed = reverseChance <= 0.12 ? true : false;

  const foil = Math.random() <= 0.5;

  const chance = Math.random();
  const palette =
    chance > 0.2 ? generatePalette() : shuffleArray(getRandomItem(PALETTES));

  const wordsRaw = reversed
    ? card.reversed.split(",").map((w) => w.trim())
    : card.description.split(",").map((w) => w.trim());
  const chosenWords = getRandomSubSet(wordsRaw, 5);

  const words: WordColor[] = chosenWords.map((word, i) => ({
    word,
    color: palette[i % palette.length],
  }));

  const expiration = getNextMidnight();

  const newReading: Reading = {
    card,
    words,
    expiration,
    new: true,
    reversed,
    foil,
  };

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newReading));

  return newReading;
};

export const useReading = () => {
  const [reading, _] = useState<Reading>(getReading());

  return {
    reading,
  };
};
