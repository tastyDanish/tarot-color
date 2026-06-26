import type { TarotCardStats } from "@/stores/use-collection-store";
import CollectionCard from "./collection-card";
import PaperTexture from "@/components/paper-texture";
import { starPath } from "../constellation-stars/star-utils";
import { cn } from "@/lib/utils";

type CardCounterProps = {
  card: TarotCardStats;
  isStar: boolean;
};

const StarStamp = () => {
  const r = 30;
  const path = starPath(r, 0);
  const corePath = starPath(r * 0.4, 0);
  return (
    <svg
      width={r * 2}
      height={r * 2}
      viewBox={`${-r} ${-r} ${r * 2} ${r * 2}`}>
      <path
        d={path}
        fill="none"
        stroke="#431407"
        strokeWidth={4}
        strokeLinecap="square"
        opacity={0.6}
      />
      <path
        d={corePath}
        fill="#431407"
        strokeLinecap="square"
        opacity={0.4}
      />
    </svg>
  );
};

const CardCounter = ({ card, isStar }: CardCounterProps) => {
  const categories = [
    { label: "Seen", value: card.seen },
    { label: "Foil", value: card.foil },
    { label: "Reversed", value: card.reversed },
    { label: "Deprived", value: card.deprived },
  ];
  return (
    <div
      key={card.name}
      className="relative flex h-98 md:h-74 flex-col w-80 md:w-120 bg-orange-100 text-amber-950 rounded-md shadow-md border-amber-950 border-0 p-2 gap-2">
      <div className="border-4 border-amber-950/60 overflow-hidden h-full">
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex flex-row">
            <div className="w-42 flex h-fit justify-center z-10 pt-5 px-3">
              <CollectionCard
                image={card.image}
                name={card.name}
                seen={card.seen > 0}
              />
            </div>
            <div className="flex flex-col items-start pt-3 md:hidden grow">
              {categories.map(({ label, value }) => (
                <div
                  key={label}
                  className={cn(
                    "relative flex items-center justify-center border-amber-950/60 pb-6 pl-6 w-full",
                    label === "Deprived" ? "border-b-0" : "border-b"
                  )}>
                  <span className="font-bold text-4xl text-amber-950/80">
                    {value}
                  </span>
                  <span className="absolute bottom-1 left-1.5 text-sm uppercase tracking-wide opacity-60">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-0 md:h-full w-0.5 bg-amber-950/60" />
          <div className="flex flex-col grow border-2 border-amber-950/60 pl-0 md:m-2 md:ml-0 border-l-0 border-r-0 mt-2">
            <span className="text-xl font-bold border-amber-950/60 border-b md:border-r text-left pl-4 py-1">
              {card.name}
            </span>
            <span className="border-amber-950/60 md:border-b text-center md:border-r md:py-1 py-3">
              {card.words.join(", ")}
            </span>
            <div className="flex-col items-start w-full grow hidden md:flex">
              <div className="grid grid-cols-2 w-full border-t border-amber-950/60 h-full">
                {categories.map(({ label, value }) => (
                  <div
                    key={label}
                    className="relative flex items-center justify-center border-b border-r border-amber-950/60 pb-6 pl-6">
                    <span className="font-bold text-4xl text-amber-950/80">
                      {value}
                    </span>
                    <span className="absolute bottom-1 left-1.5 text-sm uppercase tracking-wide opacity-60">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {isStar && (
              <div className="absolute right-4 bottom-12 md:top-4">
                <StarStamp />
              </div>
            )}
          </div>
        </div>
      </div>

      <PaperTexture
        opacity={80}
        zLevel="z-0"
      />
    </div>
  );
};

export default CardCounter;
