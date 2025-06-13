import { useState } from "react";
import { TAROT_CARDS, type TarotCard } from "./tarot-cards";
import { getRandomItem } from "../lib/random-utils";

export const UseTarotCards = () => {
  const [card, setCard] = useState<TarotCard>(getRandomItem(TAROT_CARDS));

  const randomizeCard = () => {
    setCard(getRandomItem(TAROT_CARDS));
  };

  return { card, randomizeCard };
};
