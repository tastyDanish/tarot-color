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
    <div className="relative flex flex-col gap-2 w-full overflow-y-scroll md:overflow-y-auto h-full overflow-x-hidden items-center pt-4 md:pt-8 bg-gray-800">
      <CardTitle
        title={card.name}
        isVisible={!isFlipped}
      />

      <div className="flex flex-col md:flex-row pt-4 z-10">
        <div className="bg-gray-800 flex justify-center">
          <FlipCard
            handleClick={setIsFlipped}
            isFlipped={isFlipped}
            card={card}
          />
        </div>

        <div
          className="w-[340px] flex flex-col px-4 md:p-0 mt-[440px] md:mt-0"
          style={{ height: isFlipped ? "1px" : "580px" }}>
          <ColorSwatch
            isVisible={!isFlipped}
            image={card.image}
            words={chosenWords}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
