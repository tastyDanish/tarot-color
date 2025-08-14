import { cn } from "@/lib/utils";
import CardTitle from "./card-title";
import FoilAnimation from "./foil-animation";
import type { Reading } from "@/stores/use-reading-store";
import StreakCounter from "./streak-counter";
import PaperTexture from "@/components/paper-texture";

type InstagramShareProps = {
  reading: Reading;
};

const InstagramShareCopy = ({ reading }: InstagramShareProps) => {
  return (
    <div
      id="instagram-reading"
      className="flex flex-col items-center justify-start opacity-0 pointer-events-none fixed top-0 left-0 overflow-hidden p-2"
      style={{
        aspectRatio: "9 / 16",
        width: "450px",
        maxWidth: "100%",
      }}>
      <div className="flex flex-col flex-1 w-full h-full box-border justify-around">
        <div className="flex justify-center gap-4 w-full">
          <CardTitle
            title={reading.card.name}
            isReversed={reading.reversed}
            isFoil={reading.foil}
            isShare
          />
        </div>

        <div className="flex flex-row px-2 items-center w-full justify-center relative">
          <div className="flex items-center flex-col w-full absolute">
            <div className="relative bg-orange-100 p-3 w-9/10 shadow-md h-[350px] overflow-hidden rounded-xl">
              <div className="relative h-full overflow-hidden">
                {[
                  "-top-5 -left-5",
                  "-top-5 -right-5",
                  "-bottom-5 -left-5",
                  "-bottom-5 -right-5",
                ].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute h-10 w-10 bg-orange-100 rounded-full ${pos} border-amber-950 border-4`}
                  />
                ))}
                <div className="h-full w-full border-amber-950 border-4"></div>
              </div>
              <PaperTexture opacity={80} />
            </div>
          </div>
          <div className="bg-gray-800 flex justify-center gap-4 z-20">
            <div className="relative h-[450px] w-[260px]">
              <div className="absolute bg-stone-100 p-3 rounded-xl backface-hidden overflow-hidden shadow-2xl">
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
        </div>
        <div className="flex flex-col gap-2">
          {reading.words?.map((word) => (
            <div
              key={word.color}
              className="rounded-md relative flex justify-center items-center"
              style={{ backgroundColor: word.color }}>
              <div className="w-fit text-xl font-bold bg-gray-800 px-4 min-w-[200px]">
                {word.word}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full px-4 flex justify-center">
          <StreakCounter count={reading.streak ?? 1} />
        </div>

        <div className="text-sm text-white opacity-70 text-center whitespace-nowrap">
          Daily fortune divined at fortunespalette.com
        </div>
      </div>
    </div>
  );
};

export default InstagramShareCopy;
