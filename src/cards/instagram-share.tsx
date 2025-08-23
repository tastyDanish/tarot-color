import { cn } from "@/lib/utils";
import CardTitle from "./card-title";
import FoilAnimation from "./foil-animation";
import type { Reading } from "@/stores/use-reading-store";
import StreakCounter from "./streak-counter";

type InstagramShareProps = {
  reading: Reading;
};

const InstagramShare = ({ reading }: InstagramShareProps) => {
  return (
    <div
      id="instagram-reading"
      className="flex flex-col items-center justify-start opacity-0 pointer-events-none fixed top-0 left-0 overflow-hidden"
      style={{
        aspectRatio: "9 / 16",
        width: "400px",
        maxWidth: "fit-content",
      }}>
      <div className="flex flex-col flex-1 w-full h-full px-2 box-border justify-between">
        <div className="flex justify-center gap-4 w-full">
          <CardTitle
            title={reading.card.name}
            isReversed={reading.reversed}
            isFoil={reading.foil}
            isShare
          />
        </div>

        <div
          className={cn(
            "flex z-10 px-2 justify-center w-full",
            reading.reversed ? "flex-row-reverse" : "flex-row"
          )}>
          <div className="relative bg-stone-100 p-3 rounded-xl backface-hidden overflow-hidden shadow-md h-fit z-20">
            <div className="bg-slate-950 p-1 rounded-md">
              <div className="overflow-hidden  flex justify-center items-center rounded-2xl">
                <img
                  src={reading.card.image}
                  draggable={false}
                  className={cn(
                    "[clip-path:inset(2px)] z-10 h-100",
                    reading.reversed === true ? "rotate-180" : ""
                  )}
                  alt={reading.card.name}
                />
              </div>
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: "url('/paper-texture.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "30% 0%",
                }}
              />
              {reading.foil && <FoilAnimation />}
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col p-0 justify-around z-0 ",
              reading.reversed ? "-mr-2" : "-ml-2"
            )}>
            {reading.words?.map((word) => (
              <div
                key={word.color}
                className="flex flex-col items-start w-full text-border-white  font-extrabold  rounded-md relative overflow-hidden"
                title={word.color}>
                <div
                  style={{ backgroundColor: word.color }}
                  className="h-16 rounded-b-md w-20 relative"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-2 pb-2">
          {reading.words.map(({ word, color }) => (
            <div
              key={word}
              className="flex items-center gap-2 text-xl tracking-wide">
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span>{word}</span>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center">
          <StreakCounter count={reading.streak ?? 1} />
        </div>

        <div className="text-sm text-white opacity-70 text-center pt-2 whitespace-nowrap">
          Divined at fortunespalette.com
        </div>
      </div>
    </div>
  );
};

export default InstagramShare;
