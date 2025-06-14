import CardTitle from "./card-title";
import type { Reading } from "./use-reading";
import { capitalize } from "@/lib/string-utils";

type ShareCardProps = {
  reading: Reading;
};

const ShareCard = ({ reading }: ShareCardProps) => {
  return (
    <div
      id="reading"
      className="flex flex-col items-center opacity-0 pointer-events-none fixed top-0 left-0 py-4 px-8 rounded-2xl">
      <CardTitle
        title={reading.card.name}
        isShare
      />

      <div className="flex flex-row pt-4 z-10">
        <div className="bg-gray-800 flex justify-center gap-4">
          <div
            className="relative h-[580px] w-[340px]"
            style={{
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
            }}>
            <div
              className="absolute bg-stone-100 p-4 rounded-xl backface-hidden overflow-hidden shadow-md"
              style={{
                WebkitBackfaceVisibility: "hidden",
                WebkitPerspective: 0,
              }}>
              <div className="bg-slate-950 p-1 rounded-md">
                <div className="overflow-hidden  flex justify-center items-center rounded-2xl">
                  <img
                    src={reading.card.image}
                    className="[clip-path:inset(2px)] z-10"
                    alt={reading.card.name}
                  />
                </div>
              </div>
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: "url('/paper-texture.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "30% 0%",
                }}
              />
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
                <div className="px-4  text-amber-100">
                  {capitalize(word.word?.trim()) ?? "uh oh broken"}
                </div>
                <div
                  style={{ backgroundColor: word.color }}
                  className="h-12 rounded-b-md w-full z-20 relative"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
