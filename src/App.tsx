import "./App.css";
import { UseTarotCards } from "./cards/use-tarot-cards";
import { useMemo, useState } from "react";
import ColorSwatch from "./colors/color-swatch";
import FlipCard from "./cards/flip-card";
import { getRandomSubSet } from "./lib/random-utils";
import CardTitle from "./cards/card-title";

function App() {
  const { card } = UseTarotCards();
  const [isFlipped, setIsFlipped] = useState(true);

  const chosenWords = useMemo(
    () => getRandomSubSet(card.description.split(", "), 5),
    [card.description]
  );

  return (
    <div className="relative flex flex-col gap-2  w-full overflow-y-scroll md:overflow-y-auto h-full overflow-x-hidden items-center md:pt-14">
      <CardTitle title={card.name} />

      <div className="flex flex-col md:flex-row h-full">
        <FlipCard
          handleClick={setIsFlipped}
          isFlipped={isFlipped}
          card={card}
        />

        <div className="w-full md:w-60 flex flex-col text-amber-100 overflow-show md:pt-6">
          {!isFlipped && <ColorSwatch words={chosenWords} />}
        </div>
      </div>
    </div>
  );
}

export default App;
