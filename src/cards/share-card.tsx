import { cn } from "@/lib/utils";
import CardTitle from "./card-title";
import { capitalize } from "@/lib/string-utils";
import FoilAnimation from "./foil-animation";
import type { Reading } from "@/stores/use-reading-store";
import StreakCounter from "./streak-counter";
import PaperTexture from "@/components/paper-texture";

type ShareCardProps = {
  reading: Reading;
};

const ShareCard = ({ reading }: ShareCardProps) => {
  return (
    <div
      id="reading"
      className="flex flex-col items-center opacity-0 pointer-events-none fixed top-0 left-0 pt-8 rounded-4xl">
      <div className="flex justify-center gap-4 w-full">
        <CardTitle
          title={reading.card.name}
          isReversed={reading.reversed}
          isFoil={reading.foil}
          isShare
        />
        <StreakCounter count={reading.streak ?? 1} />
      </div>

      <div className="flex flex-row pt-4 z-10 px-8">
        <div className=" flex justify-center gap-4">
          <div className="relative h-[580px] w-[340px]">
            <div className="absolute bg-stone-100 p-4 rounded-xl backface-hidden overflow-hidden shadow-md">
              <div className="bg-slate-950 p-1 rounded-md">
                <div className="overflow-hidden  flex justify-center items-center rounded-2xl">
                  <img
                    src={reading.card.image}
                    draggable={false}
                    className={cn(
                      "[clip-path:inset(2px)] z-10",
                      reading.reversed === true ? "rotate-180" : ""
                    )}
                    alt={reading.card.name}
                  />
                </div>
              </div>
              <PaperTexture opacity={40} />
              {reading.foil && <FoilAnimation />}
            </div>
          </div>
        </div>

        <div className="w-[340px] flex flex-col p-0  h-[580px]">
          <div className="relative flex flex-col gap-4 h-full w-full text-2xl items-start justify-center overflow-hidden pl-4 -mt-4">
            {reading.words?.map((word) => (
              <div
                key={word.color}
                className="flex flex-col items-start w-full text-border-white  font-extrabold text2xl rounded-md relative overflow-hidden"
                title={word.color}>
                {reading.reversed && (
                  <div
                    style={{ backgroundColor: word.color }}
                    className="h-12 rounded-b-md w-full z-20 relative"
                  />
                )}
                <div className="px-4  text-amber-100 whitespace-nowrap">
                  {capitalize(word.word?.trim()) ?? "uh oh broken"}
                </div>
                {!reading.reversed && (
                  <div
                    style={{ backgroundColor: word.color }}
                    className="h-12 rounded-b-md w-full z-20 relative"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-sm text-white opacity-70 text-center pt-2 whitespace-nowrap">
        Divined at fortunespalette.com
      </div>
    </div>
  );
};

export default ShareCard;
