import "./App.css";
import { useState } from "react";
import ColorSwatch from "./colors/color-swatch";
import FlipCard from "./cards/flip-card";
import CardTitle from "./cards/card-title";
import { useReading } from "./cards/use-reading";
import ShareCard from "./cards/share-card";
import TellerSign from "./header/teller-sign";
import ShareButton from "./share-button";
import { motion } from "motion/react";
import { ToastContainer } from "react-toastify";

function App() {
  const { reading } = useReading();
  const [isFlipped, setIsFlipped] = useState(reading.new);

  if (!reading)
    return (
      <div className="relative flex flex-col gap-2 w-full overflow-y-scroll md:overflow-y-hidden h-full overflow-x-hidden items-center pt-4 md:pt-8 bg-gray-800"></div>
    );

  return (
    <div className="relative flex flex-col gap-2 w-full overflow-y-scroll md:overflow-y-auto h-full overflow-x-hidden items-center  bg-gray-800 pt-4">
      <TellerSign />
      <div className="text-amber-100 text-center w-full px-8 max-w-150 flex text-base flex-col gap-4 pt-2 body-font">
        <p>Welcome, traveler.</p>
        <p>
          Focus your thoughts on a question, turn the card, and read the signs.
        </p>
        <p>
          Each reading reveals not only words, but a unique palette; colors
          drawn from fate itself. Look into the hues and phrases to find your
          answer, insight, or inspiration.
        </p>
      </div>

      <ShareCard reading={reading} />
      <div className="relative flex flex-col items-center opacity-100 w-full">
        <motion.div
          className="flex flex-col items-center z-10"
          initial={{ opacity: reading.new ? 0 : 1 }}
          animate={{
            opacity: !isFlipped ? 1 : 0,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}>
          <div className="flex gap-2 items-center p-2 body-font">
            <p className="text-amber-100"> Your reading for today is</p>
          </div>
          <div className="flex w-full flex-row items-center gap-8 justify-around">
            <CardTitle title={reading.card.name} />
            <ShareButton />
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row pt-4 z-10 items-center">
          <div className="bg-gray-800 flex-col justify-center">
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
              isNew={reading.new}
              isVisible={!isFlipped}
              image={reading?.card.image}
              words={reading?.words}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        limit={1}
        position="top-center"
      />
    </div>
  );
}

export default App;
