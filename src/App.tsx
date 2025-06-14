import "./App.css";
import { useEffect, useState } from "react";
import ColorSwatch from "./colors/color-swatch";
import FlipCard from "./cards/flip-card";
import CardTitle from "./cards/card-title";
import { useReading } from "./cards/use-reading";

function App() {
  const { reading, loading, isNewReading } = useReading();
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(isNewReading);
  }, [isNewReading]);

  if (!reading || loading)
    return (
      <div className="relative flex flex-col gap-2 w-full overflow-y-scroll md:overflow-y-auto h-full overflow-x-hidden items-center pt-4 md:pt-8 bg-gray-800"></div>
    );

  return (
    <div className="relative flex flex-col gap-2 w-full overflow-y-scroll md:overflow-y-auto h-full overflow-x-hidden items-center pt-4 md:pt-8 bg-gray-800">
      <CardTitle
        title={reading.card.name}
        isVisible={!isFlipped}
      />

      <div className="flex flex-col md:flex-row pt-4 z-10">
        <div className="bg-gray-800 flex justify-center">
          <FlipCard
            handleClick={setIsFlipped}
            isFlipped={isFlipped}
            card={reading.card}
          />
        </div>

        <div
          className="w-[340px] flex flex-col px-4 md:p-0 mt-[460px] md:mt-0"
          style={{ height: isFlipped ? "1px" : "580px" }}>
          <ColorSwatch
            isVisible={!isFlipped}
            image={reading?.card.image}
            words={reading?.words}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
