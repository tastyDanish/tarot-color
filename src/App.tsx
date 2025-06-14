import "./App.css";
import { domToPng } from "modern-screenshot";
import { useEffect, useState } from "react";
import ColorSwatch from "./colors/color-swatch";
import FlipCard from "./cards/flip-card";
import CardTitle from "./cards/card-title";
import { useReading } from "./cards/use-reading";
import ShareCard from "./cards/share-card";
import TellerSign from "./header/teller-sign";
import ShareButton from "./share-button";
import { motion } from "motion/react";

function App() {
  const { reading, loading, isNewReading } = useReading();
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(isNewReading);
  }, [isNewReading]);

  const handleShare = () => {
    const element = document.getElementById("reading");
    if (!element) return;

    setTimeout(async () => {
      try {
        const dataUrl = await domToPng(element, {
          backgroundColor: "#1f2937", // gray-800
          style: {
            opacity: "100%",
            padding: "10px",
            transform: "scale(1)",
          },
        });

        const blob = await (await fetch(dataUrl)).blob();

        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);

        alert("Screenshot copied to clipboard!");
      } catch (err) {
        console.error("Clipboard error:", err);
        alert("Could not copy. Try saving the image instead.");
      }
    }, 0);
  };

  if (!reading || loading)
    return (
      <div className="relative flex flex-col gap-2 w-full overflow-y-scroll md:overflow-y-hidden h-full overflow-x-hidden items-center pt-4 md:pt-8 bg-gray-800"></div>
    );

  return (
    <div className="relative flex flex-col gap-2 w-full overflow-y-scroll md:overflow-y-auto h-full overflow-x-hidden items-center  bg-gray-800 pt-4">
      <TellerSign />
      <div className="text-amber-100 text-center w-full px-8 max-w-150 flex flex-col gap-4 pt-2">
        <p>Welcome, traveler.</p>
        <p>
          I offer you divination as a service. Focus your thoughts on a
          question, turn the card, and read the signs: Look into the words and
          hues to find your answer or inspiration
        </p>
      </div>

      <ShareCard reading={reading} />
      <div className="relative flex flex-col items-center opacity-100 w-full">
        <motion.div
          className="flex flex-col items-center z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: !isFlipped ? 1 : 0,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}>
          <div className="flex gap-2 items-center p-2 ">
            <p className="text-amber-100"> your reading for today is</p>
          </div>
          <div className="flex w-full flex-row items-center gap-8 justify-around">
            <CardTitle title={reading.card.name} />
            <ShareButton onClick={handleShare} />
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
              isVisible={!isFlipped}
              image={reading?.card.image}
              words={reading?.words}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
